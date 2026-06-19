import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
  genre: string;
  listId: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, nom, prenom, telephone, genre, listId }: ContactRequest = await req.json();

    // Format phone number to international format (France +33)
    let formattedPhone = telephone.replace(/[\s()-]/g, "").trim();
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "+33" + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+33" + formattedPhone;
    }

    console.log("Adding contact to Brevo:", { email, nom, prenom, telephone: formattedPhone, listId });

    if (!BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not configured");
    }

    // Validate required fields
    if (!email || !nom || !prenom) {
      throw new Error("Missing required fields: email, nom, prenom");
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes: {
          NOM: nom.toUpperCase().trim(),
          PRENOM: prenom.trim(),
          SMS: formattedPhone,
          GENRE: genre,
        },
        listIds: [listId],
        updateEnabled: true, // Update existing contact if email already exists
      }),
    });

    const responseText = await brevoResponse.text();
    console.log("Brevo API response status:", brevoResponse.status);
    console.log("Brevo API response:", responseText);

    if (!brevoResponse.ok) {
      // Check if contact already exists (duplicate)
      if (brevoResponse.status === 400 && responseText.includes("duplicate")) {
        console.log("Contact already exists, updating...");
        return new Response(
          JSON.stringify({ success: true, message: "Contact updated" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      throw new Error(`Brevo API error: ${brevoResponse.status} - ${responseText}`);
    }

    const data = responseText ? JSON.parse(responseText) : {};

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error adding contact to Brevo:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

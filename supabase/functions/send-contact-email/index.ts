import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received contact form submission");
    
    const { name, email, subject, message }: ContactEmailRequest = await req.json();
    
    console.log("Sending email via Brevo to luciani.association@gmail.com");

    // Send email via Brevo API
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: name,
          email: email,
        },
        to: [
          {
            email: "luciani.association@gmail.com",
            name: "Association Luciani",
          },
        ],
        replyTo: {
          name: name,
          email: email,
        },
        subject: `[Contact] ${subject}`,
        htmlContent: `
          <html>
            <body>
              <h2>Nouveau message de contact</h2>
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Sujet:</strong> ${subject}</p>
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </body>
          </html>
        `,
        textContent: `
          Nouveau message de contact
          
          Nom: ${name}
          Email: ${email}
          Sujet: ${subject}
          
          Message:
          ${message}
        `,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.text();
      console.error("Brevo API error:", errorData);
      throw new Error(`Brevo API error: ${brevoResponse.status} - ${errorData}`);
    }

    const brevoData = await brevoResponse.json();
    console.log("Email sent successfully via Brevo:", brevoData);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email envoyé avec succès",
        messageId: brevoData.messageId 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error("Veuillez accepter la politique de confidentialité");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: `${formData.prenom} ${formData.nom}`,
          email: formData.email,
          subject: formData.sujet,
          message: `Téléphone: ${formData.telephone || 'Non renseigné'}\n\n${formData.message}`,
        },
      });

      if (error) {
        console.error('Error sending email:', error);
        toast.error("Erreur lors de l'envoi du message", {
          description: "Veuillez réessayer plus tard.",
        });
        return;
      }

      console.log('Email sent successfully:', data);
      
      toast.success("Message envoyé avec succès", {
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      // Reset form
      setFormData({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
        consent: false,
      });
    } catch (err) {
      console.error('Error:', err);
      toast.error("Erreur lors de l'envoi du message", {
        description: "Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <Send className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins'] text-primary">
            Contactez-nous
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une question ? Un projet de formation ? Nous sommes à votre écoute
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-['Poppins'] text-primary">
                    Envoyez-nous un message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom *</Label>
                        <Input
                          id="prenom"
                          required
                          value={formData.prenom}
                          onChange={(e) =>
                            setFormData({ ...formData, prenom: e.target.value })
                          }
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom *</Label>
                        <Input
                          id="nom"
                          required
                          value={formData.nom}
                          onChange={(e) =>
                            setFormData({ ...formData, nom: e.target.value })
                          }
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) =>
                          setFormData({ ...formData, telephone: e.target.value })
                        }
                        placeholder="+33 6 XX XX XX XX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sujet">Sujet *</Label>
                      <Select
                        required
                        value={formData.sujet}
                        onValueChange={(value) =>
                          setFormData({ ...formData, sujet: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inscription">
                            Inscription à un cours
                          </SelectItem>
                          <SelectItem value="formation">
                            Formation premiers secours
                          </SelectItem>
                          <SelectItem value="entreprise">
                            Devis entreprise
                          </SelectItem>
                          <SelectItem value="adhesion">
                            Adhésion à l'association
                          </SelectItem>
                          <SelectItem value="autre">Autre question</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Décrivez votre demande..."
                        rows={6}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, consent: checked as boolean })
                        }
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                        J'accepte que mes données soient traitées conformément à
                        la{" "}
                        <a
                          href="/politique-confidentialite"
                          className="text-accent underline"
                        >
                          politique de confidentialité
                        </a>{" "}
                        *
                      </Label>
                    </div>

                    <Button 
                      type="submit" 
                      variant="cta" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 flex flex-col justify-center">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-['Poppins'] text-primary">
                    Nos coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                    <h3 className="font-semibold text-primary mb-1">Adresse</h3>
                    <p className="text-muted-foreground">
                      87 Avenue Archimède
                      <br />
                      Pôle Epsilon 3, Bât B, 2ème étage
                      <br />
                      83700 Saint-Raphaël
                    </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Email</h3>
                      <a
                        href="mailto:luciani.association@gmail.com"
                        className="text-accent hover:underline"
                      >
                        luciani.association@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl font-['Poppins'] text-primary">
                    Lieux de nos activités
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-primary">
                      Clinique Cardio-Vasculaire Raphaëloise
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lieu principal pour Pilates, Yoga et Circuit training
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Plage du Débarquement</p>
                    <p className="text-sm text-muted-foreground">
                      Cardio Renfo en plein air (mercredis)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

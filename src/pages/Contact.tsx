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
import { ArrowRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { CRENEAUX, semaineType } from "@/config/planning";
import { supabase } from "@/integrations/supabase/client";
import PageHero from "@/components/PageHero";

/** Lieux des cours, tirés du planning de l'application (orthographe harmonisée). */
const LIEUX = Object.entries(
  semaineType(CRENEAUX)
    .flatMap(({ creneaux }) => creneaux)
    .reduce<Record<string, Set<string>>>((lieux, creneau) => {
      if (!creneau.location) return lieux;
      const lieu = creneau.location.replace("Cardio Vasculaire", "Cardio-Vasculaire");
      (lieux[lieu] ??= new Set()).add(creneau.activity.name);
      return lieux;
    }, {}),
).map(([lieu, activites]) => ({ lieu, activites: [...activites] }));

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
      <PageHero
        ton="rouge"
        surtitre="Contact"
        titre="Contactez-nous"
        texte="Une question ? Un projet de formation ? Nous sommes à votre écoute"
      />

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Form */}
            <div>
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
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
                          className="text-accent-texte underline"
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
            <div className="space-y-6">
              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    Nos coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
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
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=87+avenue+Archim%C3%A8de%2C+83700+Saint-Rapha%C3%ABl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-texte hover:underline underline-offset-4"
                    >
                      Voir l'itinéraire
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Téléphone</h3>
                      <a
                        href="tel:+33630196986"
                        className="text-muted-foreground hover:underline"
                      >
                        06 30 19 69 86
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent-texte" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Email</h3>
                      <a
                        href="mailto:luciani.association@gmail.com"
                        className="text-accent-texte hover:underline"
                      >
                        luciani.association@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">
                    Lieux de nos activités
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {LIEUX.map(({ lieu, activites }) => (
                    <div key={lieu}>
                      <p className="font-semibold text-primary">{lieu}</p>
                      <p className="text-sm text-muted-foreground">{activites.join(", ")}</p>
                    </div>
                  ))}
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

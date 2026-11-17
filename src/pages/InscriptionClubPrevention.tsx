import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";

const InscriptionClubPrevention = () => {
  const [formData, setFormData] = useState({
    genre: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.genre) {
      newErrors.genre = "Veuillez sélectionner votre genre";
    }
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.telephone.replace(/\s/g, ""))) {
      newErrors.telephone = "Veuillez entrer un numéro de téléphone valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      window.location.href = "https://buy.stripe.com/aFaaEPatPfrSe4oca3aEE01";
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const benefits = [
    "4 webinaires dans l'année",
    "1 newsletter d'actualités de prévention cardiovasculaire validée toutes les 2 semaines",
    "2 conférences gratuites dans l'année",
    "2 sessions de formations aux gestes de premier secours",
    "Un accès à la communauté WhatsApp engagée pour votre santé",
  ];

  return (
    <main className="min-h-screen bg-background">
      <PageHero
        ton="marine"
        surtitre="Club Prévention"
        titre="Rejoignez le Club Prévention"
        texte="Remplissez le formulaire ci-dessous pour accéder à nos webinaires, conférences et contenus exclusifs sur la prévention cardiovasculaire."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Ce qui vous attend */}
            <div className="order-2 lg:order-1 lg:sticky lg:top-28">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary">Ce qui vous attend</h2>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-tight tabular-nums text-primary">99 €</span>
                <span className="text-muted-foreground">/ an</span>
              </p>
              <ul className="mt-6 divide-y divide-border rounded-2xl border border-border">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 p-4">
                    <CheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-texte" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-jaune pl-4 text-muted-foreground">
                Vous êtes à 1 clic de vous rendre acteur de votre santé. Rejoignez notre communauté engagée pour la
                prévention cardiovasculaire.
              </p>
            </div>

            {/* Form */}
            <div className="order-1 lg:order-2">
              <Card className="overflow-hidden rounded-2xl bg-card border-border shadow-[var(--card-shadow-hover)]">
                <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                  <CardTitle className="text-xl md:text-2xl text-center">
                    Inscription au Club Prévention
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Genre */}
                    <div className="space-y-3">
                      <Label className="text-foreground font-medium">
                        Genre <span className="text-accent-texte">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.genre}
                        onValueChange={(value) => handleChange("genre", value)}
                        className="flex flex-wrap gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="femme" id="femme" />
                          <Label htmlFor="femme" className="cursor-pointer">
                            Femme
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="homme" id="homme" />
                          <Label htmlFor="homme" className="cursor-pointer">
                            Homme
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="neutre" id="neutre" />
                          <Label htmlFor="neutre" className="cursor-pointer">
                            Neutre
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors.genre && (
                        <p className="text-sm text-destructive">{errors.genre}</p>
                      )}
                    </div>

                    {/* Nom */}
                    <div className="space-y-2">
                      <Label htmlFor="nom" className="text-foreground font-medium">
                        Nom <span className="text-accent-texte">*</span>
                      </Label>
                      <Input
                        id="nom"
                        type="text"
                        value={formData.nom}
                        onChange={(e) => handleChange("nom", e.target.value)}
                        placeholder="Votre nom"
                        className={errors.nom ? "border-destructive" : ""}
                      />
                      {errors.nom && (
                        <p className="text-sm text-destructive">{errors.nom}</p>
                      )}
                    </div>

                    {/* Prénom */}
                    <div className="space-y-2">
                      <Label htmlFor="prenom" className="text-foreground font-medium">
                        Prénom <span className="text-accent-texte">*</span>
                      </Label>
                      <Input
                        id="prenom"
                        type="text"
                        value={formData.prenom}
                        onChange={(e) => handleChange("prenom", e.target.value)}
                        placeholder="Votre prénom"
                        className={errors.prenom ? "border-destructive" : ""}
                      />
                      {errors.prenom && (
                        <p className="text-sm text-destructive">{errors.prenom}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email <span className="text-accent-texte">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="votre@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    {/* Téléphone */}
                    <div className="space-y-2">
                      <Label htmlFor="telephone" className="text-foreground font-medium">
                        Téléphone <span className="text-accent-texte">*</span>
                      </Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => handleChange("telephone", e.target.value)}
                        placeholder="06 12 34 56 78"
                        className={errors.telephone ? "border-destructive" : ""}
                      />
                      {errors.telephone && (
                        <p className="text-sm text-destructive">{errors.telephone}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="w-full text-lg"
                    >
                      Je rejoins le Club Prévention
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      En cliquant sur ce bouton, vous serez redirigé vers notre
                      plateforme de paiement sécurisée.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InscriptionClubPrevention;

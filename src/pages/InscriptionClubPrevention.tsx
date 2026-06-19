import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CheckCircle } from "lucide-react";

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
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--accent-gold))]/10 text-[hsl(var(--accent-gold))] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Club Prévention
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Rejoignez le{" "}
              <span className="text-[hsl(var(--accent-gold))]">Club Prévention</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous pour accéder à nos webinaires,
              conférences et contenus exclusifs sur la prévention cardiovasculaire.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Benefits */}
            <div className="order-2 lg:order-1">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-foreground">
                    Ce qui vous attend
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[hsl(var(--accent-gold))] mt-0.5 flex-shrink-0" />
                      <p className="text-foreground">{benefit}</p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-border/50 mt-6">
                    <p className="text-sm text-muted-foreground">
                      Vous êtes à 1 clic de vous rendre acteur de votre santé.
                      <br />
                      Rejoignez notre communauté engagée pour la prévention cardiovasculaire.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="order-1 lg:order-2">
              <Card className="bg-card border-border shadow-xl">
                <CardHeader className="bg-[hsl(var(--accent-gold))] text-white rounded-t-lg">
                  <CardTitle className="text-xl md:text-2xl text-center">
                    Inscription au Club Prévention
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Genre */}
                    <div className="space-y-3">
                      <Label className="text-foreground font-medium">
                        Genre <span className="text-[hsl(var(--accent-gold))]">*</span>
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
                        Nom <span className="text-[hsl(var(--accent-gold))]">*</span>
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
                        Prénom <span className="text-[hsl(var(--accent-gold))]">*</span>
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
                        Email <span className="text-[hsl(var(--accent-gold))]">*</span>
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
                        Téléphone <span className="text-[hsl(var(--accent-gold))]">*</span>
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
                      className="w-full bg-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold))]/90 text-white text-lg py-6"
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

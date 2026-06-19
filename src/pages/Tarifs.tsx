import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Heart, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const Tarifs = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const clubPrevention = [
    "4 webinaires thématiques par an",
    "2 conférences gratuites sur la santé cardiovasculaire",
    "1 newsletter mensuelle (actus médicales vérifiées)",
    "2 sessions de formation aux gestes de premiers secours",
    "Accès à une communauté WhatsApp pour échanger",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins'] text-primary">
            Tarifs & Adhésions
          </h1>
        </div>
      </section>

      {/* Section test gratuit */}
      <section className="py-12 mb-8 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-4 border-white bg-white hover:shadow-2xl transition-all duration-300">
              <CardContent className="py-10 px-4 sm:px-8 text-center">
                <div className="bg-red-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-red-600 mb-6 font-['Poppins']">
                  ENVIE DE TESTER PENDANT 1 MOIS GRATUITEMENT ?
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8">
                  Découvrez tous nos cours et le Club Prévention sans engagement
                </p>
                <div className="flex justify-center px-4">
                  <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg px-4 sm:px-8 py-4 sm:py-6 h-auto font-bold w-full sm:w-auto max-w-md mx-auto">
                    <a href="https://app.association-luciani.com/register?planId=ae932234-ac5e-4ee9-b190-5864b063fb05" className="text-center block">
                      Essai gratuit
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 2 : Adhésions Sport & Santé */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Poppins']">
              Adhérer au programme Sport & Santé
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4">
              Le Club Prévention est inclus dans toutes les adhésions
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className={`text-base md:text-lg font-semibold transition-colors ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
                Annuel
              </span>
              <Switch
                checked={!isAnnual}
                onCheckedChange={(checked) => setIsAnnual(!checked)}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-base md:text-lg font-semibold transition-colors ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>
                Mensuel
              </span>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Adhésion Découverte - 1 cours */}
            <Card className="relative overflow-hidden border-2 hover:border-[#ff914d] hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 bg-gradient-to-br from-[#ff914d]/5 to-background flex flex-col">
              <CardHeader className="text-center pb-4 md:pb-8">
                <div className="bg-[#ff914d]/10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#ff914d]" />
                </div>
                <div className="mb-2">
                  <p className="text-sm md:text-lg text-muted-foreground mb-1">Adhésion</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-primary font-['Poppins']">
                    Découverte
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">Pour débuter en douceur</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col px-4 md:px-6">
                <div className="flex-1 mb-4 md:mb-6">
                  <div className="bg-[#ff914d]/10 rounded-lg p-4 md:p-6 text-center mb-4 md:mb-6">
                    <p className="text-3xl md:text-5xl font-bold text-[#ff914d] mb-2 md:mb-3">
                      1 cours / semaine
                    </p>
                    <p className="text-sm md:text-lg text-muted-foreground mb-1 md:mb-2">
                      à moins de 3 euros par cours
                    </p>
                    <p className="text-2xl md:text-3xl font-semibold text-primary">
                      {isAnnual ? '149€ / an' : '15€ / mois'}
                    </p>
                  </div>

                  <div className="text-center mb-3 md:mb-4">
                    <p className="text-xs md:text-sm font-semibold text-primary">
                      ✓ Club Prévention inclus
                    </p>
                  </div>
                </div>

                <Button asChild variant="default" size="lg" className="w-full bg-[#ff914d] hover:bg-[#ff914d]/90 text-white text-sm md:text-base py-4 md:py-6">
                  <a href={isAnnual ? "https://app.association-luciani.com/register?planId=56aa4743-8ce2-4f8a-88d0-51528d36e7d2" : "https://app.association-luciani.com/register?planId=1f87af7e-7787-4b17-ba4b-f6e785542776"}>
                    S'inscrire
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Adhésion Standard */}
            <Card className="relative overflow-hidden border-2 border-[hsl(var(--accent-gold))] shadow-lg hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 flex flex-col">
              <div className="absolute top-0 right-0">
                <div className="bg-[hsl(var(--accent-gold))] text-[hsl(var(--accent-gold-foreground))] px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  POPULAIRE
                </div>
              </div>
              <CardHeader className="text-center pb-4 md:pb-8">
                <div className="bg-[hsl(var(--accent-gold))]/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Star className="w-6 h-6 md:w-8 md:h-8 text-[hsl(var(--accent-gold))]" />
                </div>
                <div className="mb-2">
                  <p className="text-sm md:text-lg text-muted-foreground mb-1">Adhésion</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-primary font-['Poppins']">
                    Standard
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">Pour découvrir nos activités</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col px-4 md:px-6">
                <div className="flex-1 mb-4 md:mb-6">
                  <div className="bg-gradient-to-br from-[hsl(var(--accent-gold))]/20 to-[hsl(var(--accent-gold))]/5 rounded-lg p-4 md:p-6 text-center mb-4 md:mb-6 border-2 border-[hsl(var(--accent-gold))]/30">
                    <p className="text-3xl md:text-5xl font-bold text-[hsl(var(--accent-gold-foreground))] mb-2 md:mb-3">
                      2 cours / semaine
                    </p>
                    <p className="text-sm md:text-lg text-muted-foreground mb-1 md:mb-2">
                      à moins de 2 euros par cours
                    </p>
                    <p className="text-2xl md:text-3xl font-semibold text-primary">
                      {isAnnual ? '199€ / an' : '19€ / mois'}
                    </p>
                  </div>

                  <div className="text-center mb-3 md:mb-4">
                    <p className="text-xs md:text-sm font-semibold text-primary">
                      ✓ Club Prévention inclus
                    </p>
                  </div>
                </div>

                <Button asChild variant="cta" size="lg" className="w-full text-sm md:text-base py-4 md:py-6">
                  <a href={isAnnual ? "https://app.association-luciani.com/register?planId=d67d313a-2000-4ed1-8cae-20fa56eaca7f" : "https://app.association-luciani.com/register?planId=5c7f7657-96fc-4aef-86e5-5ceb4e022d3b"}>
                    S'inscrire
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Adhésion Illimitée */}
            <Card className="relative overflow-hidden border-2 hover:border-accent hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 bg-gradient-to-br from-accent/5 to-background flex flex-col">
              <CardHeader className="text-center pb-4 md:pb-8">
                <div className="bg-accent/10 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <div className="mb-2">
                  <p className="text-sm md:text-lg text-muted-foreground mb-1">Adhésion</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-primary font-['Poppins']">
                    Illimitée
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground">Pour les plus motivés</p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col px-4 md:px-6">
                <div className="flex-1 mb-4 md:mb-6">
                  <div className="bg-accent/10 rounded-lg p-4 md:p-6 text-center mb-4 md:mb-6">
                    <p className="text-3xl md:text-5xl font-bold text-accent mb-2 md:mb-3">
                      Cours illimités
                    </p>
                    <p className="text-sm md:text-lg text-muted-foreground mb-1 md:mb-2">
                      à moins de 1 euro par cours
                    </p>
                    <p className="text-2xl md:text-3xl font-semibold text-primary">
                      {isAnnual ? '219€ / an' : '22€ / mois'}
                    </p>
                  </div>

                  <div className="text-center mb-3 md:mb-4">
                    <p className="text-xs md:text-sm font-semibold text-primary">
                      ✓ Club Prévention inclus
                    </p>
                  </div>
                </div>

                <Button asChild variant="outline" size="lg" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground text-sm md:text-base py-4 md:py-6">
                  <a href={isAnnual ? "https://app.association-luciani.com/register?planId=699b4c98-1dff-4459-a888-20fc277c14c7" : "https://app.association-luciani.com/register?planId=9a1e070c-7129-48b5-b63b-cbca731e197c"}>
                    S'inscrire
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programme de Parrainage */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-background hover:shadow-lg transition-all duration-300">
              <CardContent className="py-8 px-6">
                <div className="text-center mb-8">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-3 font-['Poppins']">
                    Programme de Parrainage
                  </h3>
                  <p className="text-base text-muted-foreground">
                    Parrainez vos proches et bénéficiez de récompenses exceptionnelles
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    (<strong>valable 3 mois après votre inscription</strong>)
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* 1 Filleul */}
                  <Card className="border-2 border-accent/20 hover:border-accent transition-all duration-300">
                    <CardHeader className="text-center pb-3">
                      <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Heart className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-accent">1 Filleul</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground text-sm mb-3">
                        Parrainez 1 ami qui devient adhérent payant
                      </p>
                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                        <p className="font-bold text-primary text-lg">Carte cadeau</p>
                        <p className="font-bold text-accent text-xl">30€</p>
                        <p className="text-muted-foreground text-sm">chez Décathlon</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        (hors offre 1 mois offert)
                      </p>
                    </CardContent>
                  </Card>

                  {/* 2 Filleuls */}
                  <Card className="border-2 border-accent hover:shadow-lg transition-all duration-300 bg-accent/5">
                    <CardHeader className="text-center pb-3">
                      <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Star className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-accent">2 Filleuls</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground text-sm mb-3">
                        Parrainez 2 amis qui deviennent adhérents payants
                      </p>
                      <div className="bg-accent/20 rounded-lg p-4 border-2 border-accent/30">
                        <p className="font-bold text-primary text-lg">Carte cadeau</p>
                        <p className="font-bold text-accent text-2xl">60€</p>
                        <p className="text-muted-foreground text-sm">chez Décathlon</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        (hors offre 1 mois offert)
                      </p>
                    </CardContent>
                  </Card>

                  {/* 3 Filleuls */}
                  <Card className="border-2 border-primary hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/10 to-accent/5">
                    <CardHeader className="text-center pb-3">
                      <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-primary">3 Filleuls</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground text-sm mb-3">
                        Parrainez 3 amis qui deviennent adhérents payants
                      </p>
                      <div className="bg-primary/20 rounded-lg p-4 border-2 border-primary/30">
                        <p className="font-bold text-primary text-2xl mb-1">Adhésion</p>
                        <p className="font-bold text-accent text-2xl">REMBOURSÉE</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        (hors offre 1 mois offert)
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Pour bénéficier du parrainage, contactez-nous avec les coordonnées de vos filleuls
                  </p>
                  <Button asChild variant="outline" size="default" className="mt-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    <Link to="/contact">
                      Nous contacter
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3 : Club Prévention seul */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 hover:border-secondary hover:shadow-lg transition-all duration-300">
              <CardContent className="py-8">
                <div className="text-center mb-6">
                  <Sparkles className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-primary mb-6 font-['Poppins']">
                    Rejoindre le Club Prévention
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Sans adhésion Sport & Santé
                  </p>
                  <div className="bg-secondary/10 rounded-lg p-6 inline-block mb-6 border-2 border-secondary/30">
                    <p className="text-5xl font-bold text-secondary">
                      99€ / an
                    </p>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-3 mb-8">
                    {clubPrevention.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Button asChild variant="default" size="lg" className="bg-secondary hover:bg-secondary/90">
                      <Link to="/inscription-club-prevention">
                        Je rejoins le Club
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="max-w-2xl mx-auto mt-16">
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 via-background to-secondary/5 hover:shadow-2xl transition-all duration-300">
              <CardContent className="py-5 px-4 text-center">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 font-['Poppins']">
                  Pas encore convaincu ?
                </h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
                  <strong className="text-primary">TESTEZ</strong> tous les services de l'association pendant 1 mois : programme sport & santé en illimité + Club Prévention inclus
                </p>
                <Button asChild size="default" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2">
                  <Link to="/essai-gratuit">
                    TESTER 1 MOIS
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 4 : Formations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 hover:border-accent hover:shadow-lg transition-all duration-300">
              <CardContent className="py-8 text-center">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-primary mb-4 font-['Poppins']">
                  Formations aux gestes qui sauvent
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Formations sur devis pour le grand public, associations, entreprises et établissements scolaires
                </p>
                <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link to="/contact">
                    Demander un devis
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 1 : Don libre */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-dashed hover:border-secondary hover:shadow-lg transition-all duration-300">
              <CardContent className="py-8 text-center">
                <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-primary mb-4 font-['Poppins']">
                  Don libre
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Soutenez l'association dans ses actions, sans adhésion
                </p>
                <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <a href="https://www.helloasso.com/associations/association-luciani/paiements/site-association-luciani-don-libre" target="_blank" rel="noopener noreferrer">
                    Faire un don
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Tarifs;

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, Sparkles } from "lucide-react";

const TRIAL_REGISTRATION_URL = "https://app.association-luciani.com/register?planId=ae932234-ac5e-4ee9-b190-5864b063fb05";

const benefits = [
  "Accès illimité à tous les cours pendant 1 mois",
  "Découverte du programme Sport & Santé et du Club Prévention",
];

const EssaiGratuit = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                <Heart className="w-4 h-4" />
                Mois d'essai gratuit
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Testez le programme pendant <span className="text-primary">1 mois</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                Profitez de votre mois d’essai gratuit en quelques clics.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-border bg-card shadow-xl">
              <CardContent className="flex h-full flex-col justify-center p-8 md:p-10">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Démarrer mon essai gratuit
                </h2>

                <p className="text-muted-foreground mb-8">
                  Cliquez ci-dessous pour accéder au formulaire officiel d'inscription au mois d'essai gratuit.
                </p>

                <Button asChild variant="cta" size="lg" className="w-full text-lg py-6">
                  <a href={TRIAL_REGISTRATION_URL}>Essai gratuit</a>
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Le lien s'ouvre dans le même onglet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EssaiGratuit;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Users, Award } from "lucide-react";
import presidentYoann from "@/assets/president-yoann.png";

const APropos = () => {
  const valeurs = [
    {
      icon: Heart,
      titre: "Bienveillance",
      description:
        "Un accompagnement humain, respectueux du rythme de chacun, dans un cadre sécurisant et motivant.",
    },
    {
      icon: Target,
      titre: "Engagement",
      description:
        "Une présence active sur le terrain, au service de la prévention cardiovasculaire et de la formation aux premiers secours.",
    },
    {
      icon: Users,
      titre: "Pédagogie",
      description:
        "Transmettre des savoirs et des gestes essentiels avec clarté, simplicité et professionnalisme.",
    },
    {
      icon: Award,
      titre: "Accessibilité",
      description:
        "Rendre la santé cardiovasculaire accessible à tous, quel que soit l'âge, le niveau ou les moyens.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-accent mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins'] text-primary">
            L'Association
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une association locale engagée pour la prévention cardiovasculaire à Saint-Raphaël
          </p>
        </div>
      </section>

      {/* Le Mot du Président */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 font-['Poppins'] text-primary">
              Le Mot du Président
            </h2>

            <Card className="border-2 border-accent/30 mb-12">
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <img 
                    src={presidentYoann} 
                    alt="Dr KIAVUE Yoann, Cardiologue et Fondateur" 
                    className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-2 border-accent/30"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2 font-['Poppins']">
                      Dr KIAVUE Yoann
                    </h3>
                    <p className="text-lg text-secondary font-semibold mb-4">
                      Cardiologue - Fondateur de l'Association LUCIANI
                    </p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  "Nous voulons aller plus loin que les consultations. Notre engagement : agir concrètement pour réduire la mortalité cardiovasculaire. Prévenir, former, sensibiliser, accompagner — parce que chaque battement compte, et que la santé du cœur doit être une cause partagée par tous."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Poppins'] text-primary">
            Nos valeurs
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {valeurs.map((valeur, index) => (
              <Card
                key={index}
                className="hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border-2 hover:border-secondary"
              >
                <CardHeader className="text-center">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <valeur.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-['Poppins'] text-primary">
                    {valeur.titre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {valeur.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;

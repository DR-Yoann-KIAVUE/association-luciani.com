import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Clock, Users, CheckCircle2 } from "lucide-react";
import formationsImage from "@/assets/formations-secours.jpg";
import formationMassage1 from "@/assets/formation-massage-cardiaque-1.jpg";
import atelierScolaire from "@/assets/atelier-scolaire.jpg";

const Formations = () => {
  const formations = [
    {
      titre: "Grand Public et Groupes",
      duree: "2h",
      public: "Adulte (Associations ou Entreprises)",
      description:
        "Formation initiation aux gestes de premiers secours. Apprenez à alerter les secours, pratiquer un massage cardiaque efficace et utiliser un défibrillateur (DAE) en toute sécurité.",
      image: "formation-massage-cardiaque-1.jpg",
      programme: [
        "Brief sécurité & chaîne de survie (15 min)",
        "Reconnaître un arrêt cardiaque (20 min)",
        "Massage externe + DAE pratique (60 min)",
        "Cas concrets et questions/réponses (25 min)"
      ]
    },
    {
      titre: "Atelier scolaire",
      duree: "2h",
      public: "CM1/CM2/Collège/Lycée",
      description:
        "Sensibilisation adaptée aux jeunes pour apprendre les réflexes essentiels dès le plus jeune âge. Format ludique et pédagogique.",
      image: "formation-massage-cardiaque-2.jpg",
      programme: [
        "Présentation ludique de la chaîne de survie (10 min)",
        "Reconnaître une urgence - jeux de rôle (20 min)",
        "Pratique massage cardiaque adaptée à l'âge (70 min)",
        "Débriefing et remise d'un diplôme (20 min)"
      ]
    },
  ];

  const methode = [
    "Démonstrations pratiques par nos formateurs",
    "Mises en situation réalistes",
    "Pratique sur mannequins professionnels",
    "Évaluation formative individualisée",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(215, 38, 61, 0.8), rgba(215, 38, 61, 0.8)), url(${formationsImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <LifeBuoy className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins']">
            Nos formations
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/95 leading-relaxed">
            Alerter . Masser . Défibriller
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Des sessions accessibles à tous, animées par des{" "}
              <strong className="text-primary">formateurs diplômés</strong>.
              Objectif : savoir <strong>alerter</strong>, pratiquer un{" "}
              <strong>massage cardiaque</strong> et utiliser un{" "}
              <strong>DAE</strong> en toute sécurité.
            </p>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-['Poppins'] text-primary">
            Nos formations
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Adaptées à chaque public et besoin
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {formations.map((formation, index) => {
              const formationImage = index === 0 ? formationMassage1 : atelierScolaire;
              return (
                <Card
                  key={index}
                  className="hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border-2 hover:border-accent overflow-hidden flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={formationImage} 
                      alt={formation.titre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LifeBuoy className="w-8 h-8 text-accent" />
                    </div>
                    <CardTitle className="text-xl font-['Poppins'] text-primary text-center">
                      {formation.titre}
                    </CardTitle>
                    <div className="flex justify-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formation.duree}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{formation.public}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground text-center mb-6">
                      {formation.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-3 text-center">Exemple de déroulé :</h4>
                      <ul className="space-y-2">
                        {formation.programme.map((etape, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{etape}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button variant="cta" size="sm" asChild className="w-full mt-auto">
                      <Link to="/contact">Programmer</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Poppins'] text-primary">
              Notre méthode
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {methode.map((item, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-secondary transition-all"
                >
                  <CardContent className="flex items-center gap-4 p-6">
                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
                    <p className="text-foreground font-medium">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 border-2 border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl font-['Poppins'] text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                  Attestation et conformité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tous nos intervenants sont diplômés et régulièrement formés
                  aux dernières normes. Le matériel utilisé est conforme aux
                  standards en vigueur et un protocole d'hygiène strict est
                  appliqué pour chaque session.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
            Prêt à apprendre les gestes qui sauvent ?
          </h2>
          <p className="text-lg mb-8 text-accent-foreground/90 max-w-2xl mx-auto">
            Demandez un devis ou programmez une session dès maintenant
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/contact">Demander un devis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Formations;
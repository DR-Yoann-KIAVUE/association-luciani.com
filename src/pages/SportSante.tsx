import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Activity, MapPin, Users, Clock, Gift, UserPlus } from "lucide-react";
import sportImage from "@/assets/sport-sante.jpg";
import coachJb from "@/assets/coach-jb.png";
import coachLea from "@/assets/coach-lea.png";
import coachNoemie from "@/assets/coach-noemie.png";
import coachYoann from "@/assets/coach-yoann.png";
import coachClarisse from "@/assets/coach-clarisse-new.png";
import { useEffect } from "react";

const SportSante = () => {
  useEffect(() => {
    // Charger le script Sportigo si pas déjà chargé
    const existingScript = document.querySelector('script[src="https://standalone.api.sportigo.fr/component-standalone.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://standalone.api.sportigo.fr/component-standalone.js';
      script.async = true;
      script.onload = () => {
        // Initialiser le widget après le chargement du script
        if (typeof (window as any).initComponent === 'function') {
          (window as any).initComponent("Appointment", "sportigo-container", "ad220ca5-8b76-4353-9d0e-025f2a8165f7", {colored: true, readonly: false});
        }
      };
      document.body.appendChild(script);
    } else {
      // Le script est déjà chargé, initialiser directement
      if (typeof (window as any).initComponent === 'function') {
        (window as any).initComponent("Appointment", "sportigo-container", "ad220ca5-8b76-4353-9d0e-025f2a8165f7", {colored: true, readonly: false});
      }
    }
  }, []);

  // Fonction pour obtenir l'image du coach
  const getCoachImage = (coachName: string) => {
    switch (coachName) {
      case "Jean-Baptiste":
        return coachJb;
      case "Léa":
        return coachLea;
      case "Noémie":
        return coachNoemie;
      case "Clarisse":
        return coachClarisse;
      default:
        return undefined;
    }
  };

  const planning = [
    {
      jour: "Lundi",
      cours: [
        {
          titre: "Pilates",
          heure: "08:00-09:00",
          coach: "Noémie",
          lieu: "Clinique Cardio-Vasculaire Raphaëloise",
          description: "Posture, mobilité, respiration",
        },
        {
          titre: "Pilates",
          heure: "09:00-10:00",
          coach: "Noémie",
          lieu: "Clinique Cardio-Vasculaire Raphaëloise",
          description: "Posture, mobilité, respiration",
        },
        {
          titre: "Circuit training",
          heure: "13:30-14:30",
          coach: "Clarisse",
          lieu: "Clinique Cardio-Vasculaire Raphaëloise",
          description: "Renfo global, fun et efficace",
        },
      ],
    },
    {
      jour: "Mardi",
      cours: [
        {
          titre: "Cardio",
          heure: "11:30-12:30",
          coach: "Jean-Baptiste",
          lieu: "Clinique Cardio-Vasculaire Raphaëloise",
          description: "Endurance accessible et progressive",
        },
      ],
    },
    {
      jour: "Mercredi",
      cours: [
        {
          titre: "Cardio Renfo",
          heure: "10:00-11:00",
          coach: "Jean-Baptiste",
          lieu: "Plage du Débarquement, Saint-Raphaël",
          description: "Cardio en plein air face à la mer",
        },
      ],
    },
    {
      jour: "Jeudi",
      cours: [
        {
          titre: "Yoga",
          heure: "18:00-19:00",
          coach: "Léa",
          lieu: "Clinique Cardio-Vasculaire Raphaëloise",
          description: "Souffle, souplesse et récupération",
        },
      ],
    },
    {
      jour: "Vendredi",
      cours: [
        {
          titre: "Circuit training",
          heure: "15:00-16:00",
          coach: "Clarisse",
          lieu: "Clinique Cardio-Vasculaire Raphaëloise",
          description: "Entraînement complet et dynamique",
        },
      ],
    },
  ];

  const coachs = [
    {
      nom: "Noémie",
      specialite: "Pilates",
      bio: "Masseur-kinésithérapeute diplômée d'État et professeur de Pilates. Posture, mobilité, respiration.",
    },
    {
      nom: "Clarisse",
      specialite: "Circuit training",
      bio: "Coach APA proposant des cours en circuit training. Renfo global, fun et efficace.",
    },
    {
      nom: "Jean-Baptiste",
      specialite: "Cardio / Cardio Renfo",
      bio: "Coach et ancien athlète de natation, ancien champion de France en 4x200m. Endurance accessible et progressive.",
    },
    {
      nom: "Léa",
      specialite: "Yoga",
      bio: "Coach APA proposant des cours de yoga. Souffle, souplesse et récupération.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${sportImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Activity className="w-16 h-16 mx-auto mb-4 text-accent" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins']">
            Le sport, un allié essentiel pour un cœur en pleine forme
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Des séances collectives encadrées par des coachs diplômés, adaptées à
            tous les niveaux, pour améliorer votre endurance, votre force et
            votre bien-être cardio.
          </p>
        </div>
      </section>

      {/* Planning */}
      <section className="py-20 bg-background" id="planning">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins'] text-primary">
              Planning des séances de sport
            </h2>
            <p className="text-muted-foreground text-lg">
              Toutes les séances sont encadrées par nos coach·es sportifs diplômés et kinésithérapeutes, pour vous garantir un accompagnement sécurisé et adapté à vos besoins.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-4">
            {planning.map((jour) => (
              <Card key={jour.jour} className="overflow-hidden">
                <CardHeader className="bg-[#cc616b]/10">
                  <CardTitle className="text-2xl font-['Poppins'] text-primary flex items-center gap-2">
                    <Clock className="w-6 h-6 text-[#cc616b]" />
                    {jour.jour}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {jour.cours.map((cours, index) => {
                      const coachImage = getCoachImage(cours.coach);
                      return (
                        <div
                          key={index}
                          className="p-6 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Photo du coach */}
                            {coachImage && (
                              <div className="flex-shrink-0">
                                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-[#ff914d] shadow-lg">
                                   <img
                                     src={coachImage}
                                     alt={cours.coach === "Noémie" ? "Noémie - Kinésithérapeute" : cours.coach === "Clarisse" ? "Clarisse - Coach APA" : cours.coach === "Jean-Baptiste" ? "Jean-Baptiste - Coach" : "Léa - Coach APA"}
                                     className="w-full h-full object-cover"
                                   />
                                 </div>
                              </div>
                            )}
                            
                            <div className="flex-1">
                              <div className="flex items-start gap-3">
                                <Activity className="w-6 h-6 text-[#ff914d] mt-1 flex-shrink-0" />
                                <div>
                                  <h3 className="text-xl font-bold text-primary mb-1">
                                    {cours.titre}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-3">
                                    {cours.description}
                                  </p>
                                  <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-muted-foreground" />
                                      <span className="font-medium">{cours.heure}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Users className="w-4 h-4 text-muted-foreground" />
                                      <span>
                                        {cours.coach === "Noémie" && "Noémie - Kinésithérapeute"}
                                        {cours.coach === "Clarisse" && "Clarisse - Coach APA"}
                                        {cours.coach === "Jean-Baptiste" && "Jean-Baptiste - Coach"}
                                        {cours.coach === "Léa" && "Léa - Coach APA"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-muted-foreground">
                                        {cours.lieu}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Section Test 1 mois */}
          <div className="max-w-3xl mx-auto mt-16">
            <Card className="border-2 border-red-600 bg-red-600 hover:shadow-2xl transition-all duration-300">
              <CardContent className="py-10 px-8 text-center">
                <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 font-['Poppins']">
                  Envie d'essayer nos cours pendant 1 mois gratuitement ?
                </h3>
                <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                  Et profiter du <strong className="text-white">Club Prévention</strong>
                </p>
                <Button asChild size="lg" className="bg-white hover:bg-white/90 text-red-600 text-base sm:text-lg px-6 sm:px-8 py-6 h-auto font-bold w-full sm:w-auto mx-auto">
                  <Link to="/essai-gratuit" className="block text-center">
                    Tester 1 mois gratuitement
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/tarifs">Voir tous les tarifs & adhésions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Coachs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Poppins'] text-primary">
            Nos coachs diplômés
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coachs.map((coach, index) => {
              const coachImage = getCoachImage(coach.nom);
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 hover:scale-105 border-t-4 border-t-[hsl(var(--accent-gold))]"
                >
                  <CardHeader>
                    {coachImage ? (
                       <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[hsl(var(--accent-gold))] shadow-lg">
                         <img
                           src={coachImage}
                           alt={coach.nom === "Noémie" ? "Noémie - Kinésithérapeute" : coach.nom === "Clarisse" ? "Clarisse - Coach APA" : coach.nom === "Jean-Baptiste" ? "Jean-Baptiste - Coach" : "Léa - Coach APA"}
                           className="w-full h-full object-cover"
                         />
                       </div>
                    ) : (
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--accent-gold))] to-accent rounded-full flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                    )}
                    <CardTitle className="text-xl font-['Poppins'] text-primary">
                      {coach.nom}
                    </CardTitle>
                    <p className="text-secondary font-semibold">
                      {coach.specialite}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{coach.bio}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 font-['Poppins'] text-primary">
            Questions fréquentes
          </h2>

          <Accordion
            type="single"
            collapsible
            className="max-w-3xl mx-auto space-y-4"
          >
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Quel niveau requis ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Tous nos cours sont adaptés aux débutants. Les coachs donnent
                des consignes adaptées à chaque niveau et proposent des
                variations pour que chacun progresse à son rythme.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Quel matériel apporter ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Une tenue confortable et une bouteille d'eau sont essentiels.
                Pour les cours de Pilates et Yoga, il est préférable de venir avec une serviette et son tapis. 
                Tout autre équipement est fourni sur place.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Que se passe-t-il en cas de mauvais temps ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                La plupart des séances se font en intérieur. Pour celles en extérieur, le coach décidera d'une éventuelle annulation au maximum 24h à l'avance par message.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Comment s'inscrire ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Choisissez votre adhésion sur la page Tarifs, puis contactez-nous
                via le formulaire de contact. Nous vous confirmerons votre inscription.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>


      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
            Envie de tester ? On vous offre 1 mois en illimité
          </h2>
          <p className="text-lg mb-8 text-secondary-foreground/90 max-w-2xl mx-auto">
            (avec le Club Prévention inclus)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="cta" size="lg">
              <Link to="/essai-gratuit">
                J'essaie 1 mois gratuitement
              </Link>
            </Button>
            <Button asChild variant="gold" size="lg">
              <a href="https://association-luciani.sportigo.fr/buy" target="_blank" rel="noopener noreferrer">
                Je m&apos;inscris au cours de sport
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Espace Sportigo */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins'] text-primary">
                Votre espace Sportigo
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Gérez vos réservations en toute autonomie avec notre plateforme Sportigo
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-['Poppins'] text-primary">
                    Qu'est-ce que Sportigo ?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Sportigo est notre plateforme de gestion en ligne qui vous permet de :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        <strong>Réserver vos séances</strong> en toute autonomie, 24h/24
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        <strong>Annuler une réservation</strong> jusqu'à 24h avant la séance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        <strong>Gérer votre adhésion</strong> et suivre vos crédits de séances
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        <strong>Consulter les horaires</strong> et lieux de chaque séance
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary">
                <CardHeader className="bg-secondary/5">
                  <CardTitle className="text-2xl font-['Poppins'] text-primary">
                    Connectez-vous à votre espace
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      Accédez à votre compte pour réserver vos prochaines séances et gérer vos participations.
                    </p>
                    <div className="space-y-3">
                      <Button asChild variant="secondary" size="lg" className="w-full">
                        <a href="https://association-luciani.sportigo.fr/" target="_blank" rel="noopener noreferrer">
                          Se connecter à Sportigo
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Vous recevrez vos identifiants par email après votre adhésion
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

export default SportSante;

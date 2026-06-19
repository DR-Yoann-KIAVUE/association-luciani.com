import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Activity,
  LifeBuoy,
  Users,
  Award,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import sportImage from "@/assets/sport-sante.jpg";
import formationsImage from "@/assets/premiers-secours-new.jpg";
import preventionImage from "@/assets/prevention-audience.jpg";
import coachJb from "@/assets/coach-jb.png";
import coachLea from "@/assets/coach-lea.png";
import coachNoemie from "@/assets/coach-noemie.png";
import coachYoann from "@/assets/coach-yoann.png";
import coachClarisse from "@/assets/coach-clarisse-new.png";
const Home = () => {

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

  const coursesPreview = [
    {
      titre: "Pilates",
      jour: "Lundi",
      heure: "08:00-09:00",
      coach: "Noémie",
      lieu: "Clinique Cardio-Vasculaire Raphaëloise",
    },
    {
      titre: "Pilates",
      jour: "Lundi",
      heure: "09:00-10:00",
      coach: "Noémie",
      lieu: "Clinique Cardio-Vasculaire Raphaëloise",
    },
    {
      titre: "Circuit training",
      jour: "Lundi",
      heure: "13:30-14:30",
      coach: "Clarisse",
      lieu: "Salle French Riviera, Saint-Raphaël",
    },
    {
      titre: "Cardio",
      jour: "Mardi",
      heure: "11:30-12:30",
      coach: "Jean-Baptiste",
      lieu: "Clinique Cardio-Vasculaire Raphaëloise",
    },
    {
      titre: "Cardio Renfo",
      jour: "Mercredi",
      heure: "10:00-11:00",
      coach: "Jean-Baptiste",
      lieu: "Plage du Débarquement",
    },
    {
      titre: "Yoga",
      jour: "Jeudi",
      heure: "18:00-19:00",
      coach: "Léa",
      lieu: "Clinique Cardio-Vasculaire Raphaëloise",
    },
    {
      titre: "Circuit training",
      jour: "Vendredi",
      heure: "15:00-16:00",
      coach: "Clarisse",
      lieu: "Salle French Riviera, Saint-Raphaël",
    },
  ];

  const trustIndicators = [
    { icon: Award, text: "Formateurs et coachs diplômés" },
    { icon: MapPin, text: "Actions locales à Saint-Raphaël" },
    { icon: Heart, text: "Actions menées par notre président, cardiologue" },
  ];

  const whyUs = [
    {
      icon: CheckCircle2,
      title: "Prévention fondée sur l'évidence",
      description: "Approches validées scientifiquement",
    },
    {
      icon: Users,
      title: "Encadrement diplômé",
      description: "Coachs et formateurs certifiés",
    },
    {
      icon: Heart,
      title: "Actions de prévention",
      description: "Partenariats avec établissements médicaux",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-['Poppins'] leading-tight text-white">
            Bouger pour protéger votre cœur
          </h1>
          <p className="text-lg md:text-xl mb-16 max-w-3xl mx-auto font-normal leading-relaxed text-white">
            Portée par le Dr KIAVUE Yoann, cardiologue, l'Association LUCIANI<br />
            s'engage à Saint-Raphaël pour un cœur en meilleure santé,<br />
            grâce au sport, à la prévention et à la formation aux gestes qui sauvent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="sport" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-6">
              <Link to="/sport-sante">Découvrir Sport & Santé</Link>
            </Button>
            <Button asChild variant="gold" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-6">
              <Link to="/pack-prevention">Découvrir le Club Prévention</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-8 py-6"
            >
              <Link to="/formations">Découvrir nos formations</Link>
            </Button>
          </div>
          
          {/* Encart test gratuit */}
          <div className="mt-8 max-w-2xl mx-auto">
            <Link
              to="/essai-gratuit"
              className="block bg-white backdrop-blur-sm border-2 border-white/80 rounded-lg p-6 hover:bg-white/90 hover:border-white transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <p className="text-[#cc616b] text-xl md:text-2xl font-semibold text-center group-hover:scale-105 transition-transform">
                Envie de tester gratuitement pendant 1 mois ?
                <ArrowRight className="inline-block w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12 text-center">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Pôles */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-['Poppins'] text-primary">
            Nos pôles d'action
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Trois approches complémentaires pour votre santé cardiovasculaire
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Sport/Santé */}
            <Card className="overflow-hidden hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border-2 hover:border-secondary group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sportImage}
                  alt="Cours Sport et Santé pour la prévention cardiovasculaire"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <Activity className="absolute top-4 right-4 w-10 h-10 text-secondary bg-card rounded-full p-2" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-['Poppins'] text-primary">
                  Sport & Santé
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-4 flex-1">
                  Cours collectifs encadrés par des coachs diplômés pour renforcer votre cœur.
                </p>
                <Button asChild variant="sport" className="w-full group">
                  <Link to="/sport-sante">
                    Découvrir
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Prévention */}
            <Card className="overflow-hidden hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border-2 hover:border-[hsl(var(--accent-gold))] group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={preventionImage}
                  alt="Conférences et webinaires de prévention cardiovasculaire"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <Heart className="absolute top-4 right-4 w-10 h-10 text-[hsl(var(--accent-gold))] bg-card rounded-full p-2" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-['Poppins'] text-primary">
                  Club Prévention
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-4 flex-1">
                  Webinaires, conférences et newsletter pour vous informer et prévenir.
                </p>
                <Button asChild variant="gold" className="w-full group">
                  <Link to="/pack-prevention">
                    Découvrir
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premiers secours */}
            <Card className="overflow-hidden hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border-2 hover:border-accent group flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={formationsImage}
                  alt="Formation aux gestes de premiers secours"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <LifeBuoy className="absolute top-4 right-4 w-10 h-10 text-accent bg-card rounded-full p-2" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-['Poppins'] text-primary">
                  Formations Premiers Secours
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-4 flex-1">
                  Alerter, masser, défibriller : apprenez les gestes qui sauvent avec nos formateurs diplômés.
                </p>
                <Button asChild variant="cta" className="w-full group">
                  <Link to="/formations">
                    Découvrir
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Planning Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins'] text-primary">
              Planning des cours de sport & santé
            </h2>
            <p className="text-muted-foreground text-lg">
              Rejoignez un cours cette semaine
            </p>
          </div>

          {/* Agenda Format */}
          <div className="max-w-5xl mx-auto space-y-4">
            {coursesPreview.map((cours, index) => {
              const coachImage = getCoachImage(cours.coach);
              return (
                <Card
                  key={index}
                  className="hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border-l-4 border-l-[#ff914d]"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Jour et heure */}
                      <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                        <div className="bg-[#ff914d]/10 rounded-lg p-3 text-center min-w-[80px]">
                          <p className="text-sm font-semibold text-muted-foreground">{cours.jour}</p>
                          <p className="text-lg font-bold text-[#ff914d]">{cours.heure}</p>
                        </div>
                      </div>
                      
                      {/* Photo du coach */}
                      {coachImage && (
                        <div className="flex-shrink-0 hidden md:block">
                          <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-[#ff914d] shadow-md">
                            <img
                              src={coachImage}
                              alt={`Coach ${cours.coach}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Cours info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-2 font-['Poppins']">
                              {cours.titre}
                            </h3>
                            <div className="flex flex-col gap-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  Coach: <strong className="text-foreground">{cours.coach}</strong>
                                </span>
                              </div>
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{cours.lieu}</span>
                              </div>
                            </div>
                          </div>
                          <Activity className="w-8 h-8 text-[#ff914d] flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6">
              <Link to="/sport-sante">En savoir plus sur Sport & Santé</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tester 1 mois */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins'] text-red-600">
                TESTER TOUS LES COURS ET LE CLUB PRÉVENTION PENDANT 1 MOIS
              </h2>
              <p className="text-xl text-muted-foreground">
                Accédez à tous nos cours sans engagement
              </p>
            </div>

            <Card className="overflow-hidden border-2 border-red-500 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-br from-red-500/10 to-red-500/5 py-8">
                <CardTitle className="text-3xl font-['Poppins'] text-primary mb-3">
                  TESTER 1 MOIS tous les cours
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  Découvrez l'ensemble de notre programmation Sport & Santé
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-medium">Accès illimité pendant 1 mois</span>
                    </div>
                    <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-medium">Tous les cours disponibles</span>
                    </div>
                    <div className="flex items-center gap-3 bg-muted/30 p-4 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <span className="text-sm font-medium">Sans engagement</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button asChild size="lg" className="text-base sm:text-lg px-8 sm:px-12 py-6 bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto" style={{ padding: '5px' }}>
                      <Link to="/essai-gratuit" className="px-8 sm:px-12 py-6">
                        Commencer mon essai gratuit
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Entreprises CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
            Sensibiliser, c'est sauver des vies
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Nous organisons des sessions de formation en entreprises, en école, dans d'autres associations etc...
            Intervention sur Saint-Raphaël / Fréjus et alentours.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
            <Link to="/formations">Découvrir notre programme de formation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Newspaper, GraduationCap, Users, CheckCircle2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import formationCprTraining from "@/assets/formation-cpr-training.jpg";
import webinaireOnline from "@/assets/webinaire-online.jpg";
import webinairePrevention from "@/assets/webinaire-prevention-new.jpg";
import conferencePrevention from "@/assets/conference-prevention.jpg";
import elderlyManMobile from "@/assets/elderly-man-mobile.jpg";

const PackPrevention = () => {
  const packItems = [
    "4 webinaires thématiques par an",
    "2 conférences gratuites sur la santé cardiovasculaire",
    "1 newsletter mensuelle (actus médicales vérifiées)",
    "2 sessions de formation aux gestes de premiers secours",
    "Accès à une communauté WhatsApp pour échanger",
  ];

  const benefices = [
    {
      icon: Heart,
      titre: "Prévention cardiovasculaire",
      description:
        "Accédez à des contenus expertisés par des professionnels de santé pour mieux comprendre et prévenir les risques cardiovasculaires.",
    },
    {
      icon: Calendar,
      titre: "Événements réguliers",
      description:
        "Participez à des webinaires thématiques et conférences tout au long de l'année sur des sujets de santé actuels et essentiels.",
    },
    {
      icon: GraduationCap,
      titre: "Formation premiers secours",
      description:
        "Apprenez les gestes qui sauvent lors de sessions pratiques encadrées par nos formateurs diplômés.",
    },
    {
      icon: Users,
      titre: "Communauté engagée",
      description:
        "Rejoignez une communauté bienveillante sur WhatsApp pour échanger, poser vos questions et partager vos expériences.",
    },
  ];

  const webinaires = [
    {
      titre: "Comprendre l'hypertension",
      description: "Les facteurs de risque, le diagnostic et les solutions pour mieux vivre au quotidien",
    },
    {
      titre: "Nutrition et santé cardiaque",
      description: "Les aliments à privilégier et ceux à éviter pour un cœur en bonne santé",
    },
    {
      titre: "Activité physique adaptée",
      description: "Comment bouger sainement selon son profil et ses capacités",
    },
    {
      titre: "Stress et santé cardiovasculaire",
      description: "Comprendre l'impact du stress et apprendre à le gérer efficacement",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[700px] sm:h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${conferencePrevention})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[hsl(var(--accent-gold))] mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 font-['Poppins']">
              Club Prévention
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed mb-3 text-white/90">
              Rejoignez votre Club Prévention. Informez-vous, formez-vous pour votre santé.
            </p>
            <p className="text-base sm:text-lg mb-4 text-white/90">
              Vivre plus longtemps et en meilleure santé.
            </p>
            <p className="text-sm font-semibold mb-4 text-[hsl(var(--accent-gold))]">
              💡 Le Club Prévention est inclus dans les adhésions aux séances de sport.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 inline-block mb-6 border border-white/20">
              <p className="text-3xl sm:text-4xl font-bold text-white mb-2">99€ / an</p>
              <p className="text-white/80">Accès à tous les contenus et événements</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
                <Link to="/inscription-club-prevention">
                  Je rejoins le Club
                </Link>
              </Button>
              <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
                <Link to="/tarifs">Voir toutes les adhésions</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link to="/essai-gratuit">
                  Essayer 1 mois gratuitement
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 font-['Poppins'] text-primary">
            Ce qui est inclus
          </h2>

          <div className="max-w-3xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {packItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 font-['Poppins'] text-primary">
            Pourquoi souscrire au Club Prévention ?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefices.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-[var(--card-shadow-hover)] transition-all duration-300 border-2 hover:border-secondary"
              >
                <CardHeader className="text-center">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-['Poppins'] text-primary">
                    {item.titre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="border-2 border-secondary/30 bg-secondary/5">
              <CardContent className="p-8 text-center">
                <p className="text-lg text-muted-foreground mb-2">
                  <strong className="text-primary">Vous voulez aller plus loin ?</strong>
                </p>
                <p className="text-lg text-muted-foreground mb-4">
                  Complétez votre adhésion avec nos cours de sport encadrés ! 
                  C'est moins cher en combinant les deux formules, et c'est l'occasion de prendre en main votre santé en pratiquant une activité physique régulière adaptée à vos besoins.
                </p>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/sport-sante">Découvrir nos cours de sport</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galerie Carrousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6 font-['Poppins'] text-primary">
              Club Prévention en images
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Découvrez l'ambiance de nos sessions de formation et webinaires
            </p>

            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden border-2 hover:border-secondary transition-all h-full flex flex-col">
                    <img 
                      src={formationCprTraining} 
                      alt="Formation aux gestes de premiers secours - Massage cardiaque"
                      className="w-full h-80 object-cover"
                    />
                    <CardContent className="p-6 flex-1">
                      <h3 className="font-bold text-lg text-primary mb-2">
                        Formation massage cardiaque
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Apprenez les gestes qui sauvent avec nos formateurs diplômés
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden border-2 hover:border-secondary transition-all h-full flex flex-col">
                    <img 
                      src={webinaireOnline} 
                      alt="Webinaire sur la santé cardiovasculaire"
                      className="w-full h-80 object-cover"
                    />
                    <CardContent className="p-6 flex-1">
                      <h3 className="font-bold text-lg text-primary mb-2">
                        Webinaires santé cardio
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Conférences en ligne animées par des experts en santé cardiovasculaire
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden border-2 hover:border-secondary transition-all h-full flex flex-col">
                    <img 
                      src={webinairePrevention} 
                      alt="Conférence de prévention cardiovasculaire"
                      className="w-full h-80 object-cover"
                    />
                    <CardContent className="p-6 flex-1">
                      <h3 className="font-bold text-lg text-primary mb-2">
                        Conférences prévention
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Interventions thématiques pour comprendre et prévenir les risques
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2 lg:basis-1/2">
                  <Card className="overflow-hidden border-2 hover:border-secondary transition-all h-full flex flex-col">
                    <img 
                      src={elderlyManMobile} 
                      alt="Accès mobile aux contenus du Club Prévention"
                      className="w-full h-80 object-cover"
                    />
                    <CardContent className="p-6 flex-1">
                      <h3 className="font-bold text-lg text-primary mb-2">
                        Accès partout, tout le temps
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Consultez vos contenus et restez connecté à la communauté depuis votre mobile
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Exemples de webinaires */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6 font-['Poppins'] text-primary">
              Exemples de webinaires thématiques
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              4 webinaires par an animés par des experts en santé cardiovasculaire
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {webinaires.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary">
                      {item.titre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Newspaper className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 font-['Poppins'] text-primary">
              Newsletter mensuelle
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Chaque mois, recevez des actualités médicales vérifiées, des conseils pratiques et des informations sur nos prochains événements.
            </p>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Actualités scientifiques vulgarisées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Conseils nutrition et exercice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Calendrier des événements à venir</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Témoignages et retours d'expérience</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">
            Prêt à prendre soin de votre santé ?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Rejoignez notre communauté et bénéficiez d'un accompagnement complet pour 99€ par an
          </p>
          <Button asChild variant="cta" size="lg">
            <Link to="/inscription-club-prevention">
              Je rejoins le Club
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PackPrevention;

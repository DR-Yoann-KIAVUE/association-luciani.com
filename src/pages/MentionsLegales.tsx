import { Card, CardContent } from "@/components/ui/card";
import PageHero from "@/components/PageHero";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHero titre="Mentions Légales" texte="Informations légales et modalités de paiement" />

      {/* Paiement & modalités */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
              Paiement & modalités
            </h2>
            <Card>
              <CardContent className="p-8 space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Moyens de paiement
                  </h3>
                  <p className="text-muted-foreground">
                    <strong>Adhésion Sport et Santé :</strong> via notre espace membre (CB)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Club Prévention :</strong> via Stripe (CB)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Formations :</strong> sur devis
                  </p>
                  <p className="text-muted-foreground">
                    Les conditions générales de l'espace membre sont consultables depuis la page de connexion de l'application :{" "}
                    <a
                      href="https://app.association-luciani.com/cgv"
                      className="text-accent underline"
                    >
                      app.association-luciani.com
                    </a>
                    .
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Durée de l'adhésion
                  </h3>
                  <p className="text-muted-foreground">
                    1 an de date à date à partir de votre adhésion.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Paiement annuel ou mensuel
                  </h3>
                  <p className="text-muted-foreground">
                    <strong>Paiement annuel :</strong> règlement en une fois pour l'année complète
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Paiement mensuel :</strong> sans engagement, résiliable à tout moment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Informations légales */}
      <section className="py-20 bg-muted/60">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
              Informations légales
            </h2>
            <Card>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Association LUCIANI
                  </h3>
                  <p className="text-muted-foreground">
                    Association loi 1901
                  </p>
                  <p className="text-muted-foreground">
                    Siège social : 87 avenue Archimède, Pôle Epsilon 3, Bât B, 83700 Saint-Raphaël, France
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Conception et édition du site
                  </h3>
                  <p className="text-muted-foreground">
                    DRYKSPHR, société par actions simplifiée (SAS), SIREN 937 935 187, Bâtiment B, 87 avenue Archimède,
                    83700 Saint-Raphaël, France.
                  </p>
                  <p className="text-muted-foreground">
                    Directeur de la publication : Dr Yoann Kiavue.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Contact
                  </h3>
                  <p className="text-muted-foreground">
                    Email : luciani.association@gmail.com
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Hébergement du site
                  </h3>
                  <p className="text-muted-foreground">
                    Ce site est hébergé par Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, États-Unis)
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Propriété intellectuelle
                  </h3>
                  <p className="text-muted-foreground">
                    L'ensemble du contenu de ce site (textes, images, vidéos) est la propriété de l'Association LUCIANI. 
                    Toute reproduction, même partielle, est interdite sans autorisation préalable.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentionsLegales;

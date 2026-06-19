import { Card, CardContent } from "@/components/ui/card";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins'] text-primary text-center">
            Mentions Légales
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            Informations légales et modalités de paiement
          </p>
        </div>
      </section>

      {/* Paiement & modalités */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 font-['Poppins'] text-primary">
              Paiement & modalités
            </h2>
            <Card>
              <CardContent className="p-8 space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Moyens de paiement
                  </h3>
                  <p className="text-muted-foreground">
                    <strong>Adhésion Sport et Santé :</strong> via Sportigo/Mollie (CB)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Club Prévention :</strong> via Stripe (CB)
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Formations :</strong> sur devis
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 font-['Poppins'] text-primary">
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
                    Siège social : Saint-Raphaël, France
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
                    Ce site est hébergé par Lovable
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

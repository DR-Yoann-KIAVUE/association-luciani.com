import { Shield, Lock, Eye, FileText, UserCheck, Database, Bell, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RGPD = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
              RGPD
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Règlement Général sur la Protection des Données
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              L'Association LUCIANI s'engage à respecter le Règlement Général sur la Protection 
              des Données (RGPD - Règlement UE 2016/679) entré en application le 25 mai 2018. 
              Cette page vous informe sur vos droits et sur les mesures que nous mettons en œuvre 
              pour protéger vos données personnelles.
            </p>
          </section>

          {/* Principes fondamentaux */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins'] flex items-center gap-3">
              <Scale className="w-6 h-6 text-accent" />
              Principes fondamentaux du RGPD
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Licéité et transparence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Vos données sont traitées de manière licite, loyale et transparente.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Limitation des finalités</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Vos données sont collectées pour des finalités déterminées et légitimes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Minimisation des données</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Seules les données nécessaires sont collectées.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Exactitude</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Vos données sont maintenues exactes et à jour.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Limitation de la conservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Vos données ne sont pas conservées plus longtemps que nécessaire.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Intégrité et confidentialité</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Vos données sont protégées contre tout accès non autorisé.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Vos droits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins'] flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-accent" />
              Vos droits selon le RGPD
            </h2>
            <div className="space-y-4">
              <div className="bg-muted/50 p-5 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Droit d'accès (Article 15)</h3>
                <p className="text-muted-foreground text-sm">
                  Vous avez le droit d'obtenir la confirmation que vos données sont traitées 
                  et d'accéder à ces données ainsi qu'aux informations sur leur traitement.
                </p>
              </div>
              <div className="bg-muted/50 p-5 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Droit de rectification (Article 16)</h3>
                <p className="text-muted-foreground text-sm">
                  Vous pouvez demander la rectification de vos données personnelles 
                  si elles sont inexactes ou incomplètes.
                </p>
              </div>
              <div className="bg-muted/50 p-5 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Droit à l'effacement (Article 17)</h3>
                <p className="text-muted-foreground text-sm">
                  Vous pouvez demander l'effacement de vos données dans certaines conditions 
                  (retrait du consentement, données non nécessaires, etc.).
                </p>
              </div>
              <div className="bg-muted/50 p-5 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Droit à la limitation (Article 18)</h3>
                <p className="text-muted-foreground text-sm">
                  Vous pouvez demander la limitation du traitement de vos données 
                  dans certaines circonstances.
                </p>
              </div>
              <div className="bg-muted/50 p-5 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Droit à la portabilité (Article 20)</h3>
                <p className="text-muted-foreground text-sm">
                  Vous avez le droit de recevoir vos données dans un format structuré 
                  et de les transmettre à un autre responsable de traitement.
                </p>
              </div>
              <div className="bg-muted/50 p-5 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Droit d'opposition (Article 21)</h3>
                <p className="text-muted-foreground text-sm">
                  Vous pouvez vous opposer à tout moment au traitement de vos données 
                  pour des raisons tenant à votre situation particulière.
                </p>
              </div>
            </div>
          </section>

          {/* Bases légales */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins'] flex items-center gap-3">
              <FileText className="w-6 h-6 text-accent" />
              Bases légales de nos traitements
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-left font-semibold">Traitement</th>
                    <th className="border p-3 text-left font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 text-muted-foreground">Gestion des adhésions</td>
                    <td className="border p-3 text-muted-foreground">Exécution du contrat</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-3 text-muted-foreground">Inscriptions aux formations</td>
                    <td className="border p-3 text-muted-foreground">Exécution du contrat</td>
                  </tr>
                  <tr>
                    <td className="border p-3 text-muted-foreground">Envoi de newsletters</td>
                    <td className="border p-3 text-muted-foreground">Consentement</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-3 text-muted-foreground">Réponse aux demandes de contact</td>
                    <td className="border p-3 text-muted-foreground">Intérêt légitime</td>
                  </tr>
                  <tr>
                    <td className="border p-3 text-muted-foreground">Données de santé (certificats médicaux)</td>
                    <td className="border p-3 text-muted-foreground">Obligation légale</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-3 text-muted-foreground">Comptabilité et facturation</td>
                    <td className="border p-3 text-muted-foreground">Obligation légale</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Mesures de sécurité */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins'] flex items-center gap-3">
              <Lock className="w-6 h-6 text-accent" />
              Mesures de sécurité
            </h2>
            <p className="text-muted-foreground mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
              pour garantir la sécurité de vos données :
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong>Chiffrement :</strong> Les données sensibles sont chiffrées lors 
                  de leur transmission (protocole HTTPS/TLS)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong>Contrôle d'accès :</strong> Seules les personnes habilitées ont 
                  accès aux données personnelles
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong>Sauvegarde :</strong> Des sauvegardes régulières sont effectuées 
                  pour prévenir toute perte de données
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong>Formation :</strong> Notre équipe est sensibilisée à la protection 
                  des données personnelles
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  <strong>Hébergement sécurisé :</strong> Nos données sont hébergées sur 
                  des serveurs conformes aux normes européennes
                </span>
              </li>
            </ul>
          </section>

          {/* Sous-traitants */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins'] flex items-center gap-3">
              <Database className="w-6 h-6 text-accent" />
              Nos sous-traitants
            </h2>
            <p className="text-muted-foreground mb-4">
              Nous faisons appel à des sous-traitants pour certains traitements. 
              Tous nos sous-traitants sont conformes au RGPD :
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-left font-semibold">Sous-traitant</th>
                    <th className="border p-3 text-left font-semibold">Finalité</th>
                    <th className="border p-3 text-left font-semibold">Localisation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 text-muted-foreground">Brevo (Sendinblue)</td>
                    <td className="border p-3 text-muted-foreground">Envoi d'emails</td>
                    <td className="border p-3 text-muted-foreground">France / UE</td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="border p-3 text-muted-foreground">Sportigo</td>
                    <td className="border p-3 text-muted-foreground">Gestion des adhésions</td>
                    <td className="border p-3 text-muted-foreground">France</td>
                  </tr>
                  <tr>
                    <td className="border p-3 text-muted-foreground">Lovable</td>
                    <td className="border p-3 text-muted-foreground">Hébergement du site</td>
                    <td className="border p-3 text-muted-foreground">UE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Notification de violation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins'] flex items-center gap-3">
              <Bell className="w-6 h-6 text-accent" />
              Notification des violations de données
            </h2>
            <p className="text-muted-foreground mb-4">
              Conformément à l'article 33 du RGPD, en cas de violation de données personnelles :
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Nous notifierons la CNIL dans les 72 heures suivant la découverte de la violation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Si la violation présente un risque élevé pour vos droits, vous serez informé 
                  dans les meilleurs délais
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Nous documenterons toute violation dans un registre interne
                </span>
              </li>
            </ul>
          </section>

          {/* Exercer vos droits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins'] flex items-center gap-3">
              <Eye className="w-6 h-6 text-accent" />
              Comment exercer vos droits ?
            </h2>
            <Card className="bg-accent/10 border-accent">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Pour exercer vos droits ou pour toute question concernant le traitement 
                  de vos données, vous pouvez nous contacter :
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <strong>Par email :</strong>{" "}
                    <a 
                      href="mailto:luciani.association@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      luciani.association@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>Par courrier :</strong> Association LUCIANI - 87 avenue Archimède, 
                    Pôle Epsilon 3, Bât B 2ème étage, 83700 Saint-Raphaël
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4 text-sm">
                  Nous nous engageons à répondre à votre demande dans un délai d'un mois 
                  à compter de sa réception.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Réclamation CNIL */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 font-['Poppins']">
              Réclamation auprès de la CNIL
            </h2>
            <p className="text-muted-foreground">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire 
              une réclamation auprès de la Commission Nationale de l'Informatique et des 
              Libertés (CNIL) :
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>
                <strong>Site web :</strong>{" "}
                <a 
                  href="https://www.cnil.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.cnil.fr
                </a>
              </li>
              <li>
                <strong>Adresse :</strong> CNIL - 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
              </li>
            </ul>
          </section>

          {/* Mise à jour */}
          <section className="border-t pt-8">
            <p className="text-sm text-muted-foreground text-center">
              Cette page RGPD a été mise à jour le 29 janvier 2025.
              <br />
              Nous nous réservons le droit de la modifier à tout moment.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default RGPD;

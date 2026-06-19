import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Poppins'] text-primary text-center">
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            Protection de vos données personnelles
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  1. Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'Association LUCIANI, association loi 1901, s'engage à protéger la vie privée de ses adhérents, 
                  participants aux formations et visiteurs de son site internet. La présente politique de confidentialité 
                  décrit comment nous collectons, utilisons et protégeons vos données personnelles conformément au 
                  Règlement Général sur la Protection des Données (RGPD).
                </p>
              </CardContent>
            </Card>

            {/* Responsable du traitement */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  2. Responsable du traitement
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p><strong>Association LUCIANI</strong></p>
                  <p>87 avenue Archimède, Pôle Epsilon 3, Bât B 2ème étage</p>
                  <p>83700 Saint-Raphaël, France</p>
                  <p>Email : luciani.association@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Données collectées */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  3. Données collectées
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nous collectons les données suivantes dans le cadre de nos activités :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Données d'identification :</strong> nom, prénom, date de naissance, adresse</li>
                  <li><strong>Coordonnées :</strong> email, numéro de téléphone</li>
                  <li><strong>Données de santé :</strong> certificat médical, informations relatives à votre condition physique (uniquement pour les activités Sport Santé)</li>
                  <li><strong>Données de paiement :</strong> informations nécessaires au traitement des adhésions et inscriptions</li>
                  <li><strong>Données de navigation :</strong> cookies, adresse IP (pour améliorer votre expérience sur notre site)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Finalités du traitement */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  4. Finalités du traitement
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Gestion des adhésions et inscriptions aux activités Sport Santé</li>
                  <li>Organisation et suivi des formations aux premiers secours</li>
                  <li>Inscription au Club Prévention et envoi des newsletters</li>
                  <li>Communication d'informations relatives à nos activités et événements</li>
                  <li>Traitement des demandes de contact</li>
                  <li>Facturation et gestion des paiements</li>
                  <li>Respect de nos obligations légales et réglementaires</li>
                </ul>
              </CardContent>
            </Card>

            {/* Base légale */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  5. Base légale du traitement
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Le traitement de vos données repose sur :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>L'exécution d'un contrat :</strong> pour la gestion de votre adhésion et votre participation aux activités</li>
                  <li><strong>Votre consentement :</strong> pour l'envoi de newsletters et communications marketing</li>
                  <li><strong>L'intérêt légitime :</strong> pour améliorer nos services et prévenir la fraude</li>
                  <li><strong>Le respect d'obligations légales :</strong> pour la tenue de nos registres et déclarations obligatoires</li>
                </ul>
              </CardContent>
            </Card>

            {/* Durée de conservation */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  6. Durée de conservation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vos données sont conservées pendant les durées suivantes :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Données d'adhésion :</strong> pendant la durée de votre adhésion + 3 ans après la fin de celle-ci</li>
                  <li><strong>Données de formation :</strong> 10 ans (conformément aux obligations légales de traçabilité des formations)</li>
                  <li><strong>Données de paiement :</strong> 10 ans (obligations comptables)</li>
                  <li><strong>Données de newsletter :</strong> jusqu'à votre désabonnement + 3 ans</li>
                  <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
                </ul>
              </CardContent>
            </Card>

            {/* Destinataires des données */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  7. Destinataires des données
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vos données peuvent être transmises à :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Nos coachs et formateurs dans le cadre des activités</li>
                  <li>Nos prestataires techniques (hébergement, paiement en ligne)</li>
                  <li>Nos partenaires pour l'envoi de newsletters (Brevo)</li>
                  <li>Les autorités compétentes si la loi l'exige</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Nous ne vendons jamais vos données à des tiers à des fins commerciales.
                </p>
              </CardContent>
            </Card>

            {/* Vos droits */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  8. Vos droits
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                  <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                  <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                  <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Pour exercer ces droits, contactez-nous à : <strong>luciani.association@gmail.com</strong>
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  9. Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                  <li><strong>Cookies analytiques :</strong> pour comprendre comment vous utilisez notre site</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur.
                </p>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  10. Sécurité des données
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
                  vos données personnelles contre tout accès non autorisé, perte, destruction ou altération. 
                  Nos systèmes de paiement sont sécurisés par nos prestataires certifiés (Stripe, Mollie).
                </p>
              </CardContent>
            </Card>

            {/* Réclamation */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  11. Réclamation
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si vous estimez que le traitement de vos données ne respecte pas la réglementation en vigueur, 
                  vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique 
                  et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">www.cnil.fr</a>
                </p>
              </CardContent>
            </Card>

            {/* Mise à jour */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-4 font-['Poppins']">
                  12. Mise à jour de la politique
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cette politique de confidentialité peut être mise à jour périodiquement. La date de dernière 
                  mise à jour est indiquée ci-dessous. Nous vous invitons à consulter régulièrement cette page.
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Dernière mise à jour :</strong> Janvier 2025
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PolitiqueConfidentialite;

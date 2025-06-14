
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ContactFAQ = () => {
  const faqs = [
    {
      question: "Comment inscrire mon enfant à Casa Hills ?",
      answer: "Pour inscrire votre enfant, vous devez d'abord nous contacter par téléphone ou via notre formulaire de contact. Notre équipe vous guidera à travers toutes les étapes du processus d'admission."
    },
    {
      question: "Quels sont les frais de scolarité ?",
      answer: "Nos frais de scolarité varient selon le niveau d'études. Nous proposons également des facilités de paiement. Contactez-nous pour obtenir notre grille tarifaire détaillée."
    },
    {
      question: "Y a-t-il un service de transport scolaire ?",
      answer: "Oui, nous proposons un service de transport scolaire qui dessert plusieurs quartiers de Casablanca. Les itinéraires sont optimisés chaque année selon la demande des familles."
    },
    {
      question: "Quelles langues sont enseignées à l'école ?",
      answer: "Casa Hills propose un enseignement multilingue avec le français comme langue principale, l'arabe, l'anglais dès le primaire, et l'espagnol au collège et lycée."
    },
    {
      question: "L'école accueille-t-elle des élèves de toutes nationalités ?",
      answer: "Absolument ! Casa Hills accueille des élèves de toutes nationalités dans un environnement multiculturel enrichissant qui prépare nos élèves à un monde globalisé."
    },
    {
      question: "Peut-on visiter l'école avant l'inscription ?",
      answer: "Bien sûr ! Nous organisons des visites guidées sur rendez-vous. Contactez-nous pour planifier votre visite."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-600">
            Trouvez rapidement les réponses à vos questions les plus courantes.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold hover:text-casa-blue">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pt-2 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ContactFAQ;

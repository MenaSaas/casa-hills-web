
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/components/ContactHero';
import ContactInfo from '@/components/ContactInfo';
import ContactForm from '@/components/ContactForm';
import ContactFAQ from '@/components/ContactFAQ';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ContactHero />
      <ContactInfo />
      
      {/* Google Maps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              Nous trouver
            </h2>
            <p className="text-muted-foreground">
              Complexe Résidentiel Albadr, Sidi Bernoussi, Casablanca
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.5!2d-7.5311!3d33.6069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCasa+Hills+Sidi+Bernoussi+Casablanca!5e0!3m2!1sfr!2sma!4v1700000000000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Casa Hills - Sidi Bernoussi, Casablanca"
            />
          </div>
        </div>
      </section>

      <ContactForm />
      <ContactFAQ />
      <Footer />
    </div>
  );
};

export default Contact;

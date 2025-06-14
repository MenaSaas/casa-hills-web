
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
      <ContactForm />
      <ContactFAQ />
      <Footer />
    </div>
  );
};

export default Contact;

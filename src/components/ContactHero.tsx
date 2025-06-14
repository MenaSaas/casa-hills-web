
const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-casa-blue to-casa-red text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-display font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions et vous accompagner 
            dans votre projet éducatif. N'hésitez pas à nous contacter !
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

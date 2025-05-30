
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const SocialSidebar = () => {
  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://www.facebook.com/ecolecasahills/",
      label: "Facebook",
      bgColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/ecolecasahills/",
      label: "Instagram", 
      bgColor: "bg-pink-600 hover:bg-pink-700"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://wa.me/212663514432",
      label: "WhatsApp",
      bgColor: "bg-green-600 hover:bg-green-700"
    }
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col space-y-3">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.bgColor} text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110`}
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;

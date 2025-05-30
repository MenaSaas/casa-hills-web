
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Index from "./pages/Index";
import Maternelle from "./pages/Maternelle";
import Primaire from "./pages/Primaire";
import College from "./pages/College";
import Lycee from "./pages/Lycee";
import Philosophie from "./pages/Philosophie";
import Actualites from "./pages/Actualites";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueCookies from "./pages/PolitiqueCookies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/maternelle" element={<Maternelle />} />
          <Route path="/primaire" element={<Primaire />} />
          <Route path="/college" element={<College />} />
          <Route path="/lycee" element={<Lycee />} />
          <Route path="/philosophie" element={<Philosophie />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-cookies" element={<PolitiqueCookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppFloat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

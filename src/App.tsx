
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Maternelle from "./pages/Maternelle";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/maternelle" element={<Maternelle />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          {/* Pages à créer */}
          <Route path="/primaire" element={<Index />} />
          <Route path="/college" element={<Index />} />
          <Route path="/lycee" element={<Index />} />
          <Route path="/philosophie" element={<Index />} />
          <Route path="/actualites" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

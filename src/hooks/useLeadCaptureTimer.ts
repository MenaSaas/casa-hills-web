
import { useState, useEffect } from 'react';

export const useLeadCaptureTimer = () => {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà vu le popup
    const hasSeenLeadCapture = localStorage.getItem('casa-hills-lead-capture-shown');
    const neverShowAgain = localStorage.getItem('casa-hills-lead-capture-never-show');
    
    if (hasSeenLeadCapture || neverShowAgain) {
      return;
    }

    // Détecter l'interaction utilisateur (scroll, click, mouvement souris)
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('click', handleInteraction);
    document.addEventListener('mousemove', handleInteraction);

    // Timer de 60 secondes
    const timer = setTimeout(() => {
      if (hasInteracted) {
        setShowLeadCapture(true);
        localStorage.setItem('casa-hills-lead-capture-shown', 'true');
      }
    }, 60000); // 1 minute

    return () => {
      clearTimeout(timer);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('mousemove', handleInteraction);
    };
  }, [hasInteracted]);

  const closeLeadCapture = () => {
    setShowLeadCapture(false);
  };

  const neverShowAgain = () => {
    setShowLeadCapture(false);
    localStorage.setItem('casa-hills-lead-capture-never-show', 'true');
  };

  return {
    showLeadCapture,
    closeLeadCapture,
    neverShowAgain
  };
};

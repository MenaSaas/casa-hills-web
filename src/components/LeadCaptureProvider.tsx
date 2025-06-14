
import { useLeadCaptureTimer } from '@/hooks/useLeadCaptureTimer';
import LeadCaptureModal from './LeadCaptureModal';

const LeadCaptureProvider = () => {
  const { showLeadCapture, closeLeadCapture, neverShowAgain } = useLeadCaptureTimer();

  return (
    <LeadCaptureModal
      isOpen={showLeadCapture}
      onClose={closeLeadCapture}
      onNeverShow={neverShowAgain}
    />
  );
};

export default LeadCaptureProvider;

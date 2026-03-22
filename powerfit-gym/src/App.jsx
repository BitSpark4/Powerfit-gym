import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClassSchedule from './components/ClassSchedule';
import MembershipPlans from './components/MembershipPlans';
import Trainers from './components/Trainers';
import Location from './components/Location';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import TrialBookingModal from './components/TrialBookingModal';

export default function App() {
  const [trialModal, setTrialModal] = useState({ open: false, batchTime: '', batchType: '' });

  const openTrialForm = (batchTime, batchType) => {
    setTrialModal({ open: true, batchTime, batchType });
  };

  const closeTrialForm = () => {
    setTrialModal({ open: false, batchTime: '', batchType: '' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navbar />
      <Hero />
      <ClassSchedule openTrialForm={openTrialForm} />
      <MembershipPlans />
      <Trainers />
      <Location />
      <Footer />
      <ChatBot />
      <WhatsAppButton />
      {trialModal.open && (
        <TrialBookingModal
          batchTime={trialModal.batchTime}
          batchType={trialModal.batchType}
          onClose={closeTrialForm}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SignInModal from './SignInModal';

export default function LoginButton() {
  const [isReturning, setIsReturning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const returningVisitor = Cookies.get('returningVisitor');
    if (returningVisitor) {
      setIsReturning(true);
    }
  }, []);

  if (!isReturning) return null;

  return (
    <>
      <button 
        className="fixed top-4 right-4 z-[100]
                  px-4 py-2 rounded
                  bg-[#f7f3e9]/10 backdrop-blur-sm
                  text-[#f7f3e9] text-sm
                  border border-[#f7f3e9]/20
                  hover:bg-[#f7f3e9]/30 hover:border-[#f7f3e9]/40 
                  hover:scale-105 hover:shadow-xl
                  transition-all duration-300 ease-in-out
                  shadow-lg
                  block"
        onClick={() => setIsModalOpen(true)}
      >
        Login
      </button>

      <SignInModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 
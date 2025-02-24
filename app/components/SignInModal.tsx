import { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in attempt:', { email, password });
    // We'll add real authentication later
    alert('Sign in functionality coming soon!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-[#f7f3e9] rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-900/60 hover:text-gray-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Form content */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-600 mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-900/20 rounded
                          focus:outline-none focus:ring-2 focus:ring-gray-900/30
                          bg-[#f7f3e9]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-900/20 rounded
                          focus:outline-none focus:ring-2 focus:ring-gray-900/30
                          bg-[#f7f3e9]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-900 text-[#f7f3e9] rounded
                        hover:bg-gray-800 transition-colors
                        focus:outline-none focus:ring-2 focus:ring-gray-900/50"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-sm">
            <a href="#" className="text-gray-900/70 hover:text-gray-900">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 
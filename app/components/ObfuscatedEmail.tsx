import { useEffect, useRef } from 'react';

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
}

export default function ObfuscatedEmail({ user, domain, className }: ObfuscatedEmailProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      const email = `${user}@${domain}`;
      linkRef.current.href = `mailto:${email}`;
      linkRef.current.textContent = email;
    }
  }, [user, domain]);

  return <a ref={linkRef} className={className}>Contact</a>;
} 
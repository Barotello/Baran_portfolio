import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // Gecikme süresi (ms)
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animasyonun sadece bir kez tetiklenmesini sağlar
    threshold: 0.1,    // Elementin %10'u görünür olduğunda tetiklenir
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Küçük bir gecikme ekleyerek elementin render edildiğinden ve sayfanın yerleştiğinden emin oluyoruz.
        // Özellikle farklı bir rotadan gelindiğinde bu faydalıdır.
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
    } else {
      // Hash yoksa, yeni bir sayfaya gidildiğinde en üste kaydır.
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
}
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio'; // AspectRatio bileşenini import ediyoruz

interface ImageLightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode; // Tetikleyici eleman (genellikle img)
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ src, alt, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 border-none bg-transparent shadow-none">
        <AspectRatio ratio={16 / 9} className="w-full h-full">
          <img src={src} alt={alt} className="object-contain w-full h-full rounded-lg" />
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
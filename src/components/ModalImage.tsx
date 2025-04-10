'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

interface ModalImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ModalImage({ src, alt, width, height, className, style }: ModalImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        className={`${className} cursor-pointer hover:opacity-90 transition-opacity`}
        style={style}
        onClick={() => setIsModalOpen(true)}
      />
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={src}
        alt={alt}
      />
    </>
  );
} 
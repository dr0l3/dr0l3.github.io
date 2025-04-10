'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="relative w-full h-full">
          <img
            src={imageSrc}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
} 
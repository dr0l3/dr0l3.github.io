'use client'

import { useState } from 'react'
import Image from 'next/image'

type ModalImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export default function ModalImage({ src, alt, width, height, className = '' }: ModalImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setIsOpen(false)}
        >
          <Image
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              width: 'auto',
              height: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
} 
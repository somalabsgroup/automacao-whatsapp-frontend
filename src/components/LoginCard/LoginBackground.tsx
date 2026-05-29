'use client';

import { motion } from 'framer-motion';

export function LoginBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 35%, #14B8A6 70%, #0891B2 100%)',
    }}>
      {/* Gradiente principal animado */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* Blobs flutuando */}
      {[
        { size: 400, x: [-80, 80, -80], y: [-40, 40, -40], duration: 15, delay: 0 },
        { size: 350, x: [80, -60, 80], y: [60, -50, 60], duration: 18, delay: 3 },
        { size: 300, x: [-40, 60, -40], y: [-60, 30, -60], duration: 20, delay: 6 },
      ].map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          animate={{
            x: blob.x,
            y: blob.y,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            delay: blob.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: `${30 + i * 20}%`,
            left: `${25 + i * 25}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      ))}

      {/* Grid sutil */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.5,
      }}>
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      {/* Partículas flutuantes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            y: [0, -120, 0],
            x: [0, (i % 3 - 1) * 40, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0]
          }}
          transition={{
            duration: 5 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: `${(i * 6) % 100}%`,
            left: `${(i * 8) % 100}%`,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
          }}
        />
      ))}

      {/* Círculos concêntricos sutis */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ring-${i}`}
          animate={{
            scale: [0, 2],
            opacity: [0.2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '250px',
            height: '250px',
            marginLeft: '-125px',
            marginTop: '-125px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.15)',
          }}
        />
      ))}

      {/* Ondas diagonais */}
      {[0, 1].map((i) => (
        <motion.div
          key={`wave-${i}`}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.08, 0.15, 0.08, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: `${i * 40}%`,
            left: 0,
            width: '150%',
            height: '120px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)',
            transform: 'rotate(-20deg)',
            filter: 'blur(40px)',
          }}
        />
      ))}
    </div>
  );
}

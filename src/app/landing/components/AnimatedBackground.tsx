'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      {/* Gradiente principal animado - movimento fluido mais visível */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(8, 145, 178, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(8, 145, 178, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(20, 184, 166, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(8, 145, 178, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(8, 145, 178, 0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Blobs grandes flutuando */}
      {[
        { size: 500, x: [-100, 100, -100], y: [-50, 50, -50], duration: 15, delay: 0, color: 'rgba(20, 184, 166, 0.08)' },
        { size: 400, x: [100, -80, 100], y: [80, -60, 80], duration: 18, delay: 3, color: 'rgba(8, 145, 178, 0.10)' },
        { size: 450, x: [-50, 80, -50], y: [-80, 40, -80], duration: 20, delay: 6, color: 'rgba(20, 184, 166, 0.06)' },
      ].map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          animate={{
            x: blob.x,
            y: blob.y,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            delay: blob.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: `${25 + i * 20}%`,
            left: `${20 + i * 25}%`,
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
      ))}

      {/* Ondas de luz diagonal - efeito scanner */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`wave-${i}`}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.15, 0.25, 0.15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: `${i * 30}%`,
            left: 0,
            width: '150%',
            height: '150px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(20, 184, 166, 0.12) 50%, transparent 100%)',
            transform: 'rotate(-25deg)',
            filter: 'blur(30px)',
          }}
        />
      ))}

      {/* Grid dinâmico com pulso */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(20, 184, 166, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(8, 145, 178, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.4,
      }}>
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
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
              linear-gradient(rgba(20, 184, 166, 0.08) 2px, transparent 2px),
              linear-gradient(90deg, rgba(8, 145, 178, 0.10) 2px, transparent 2px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      {/* Partículas grandes brilhantes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-big-${i}`}
          animate={{
            y: [0, -150, 0],
            x: [0, (i % 3 - 1) * 50, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 6 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: `${(i * 5.5) % 100}%`,
            left: `${(i * 7) % 100}%`,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: i % 3 === 0 
              ? '#14B8A6' 
              : i % 3 === 1 
              ? '#0891B2' 
              : '#22C55E',
            boxShadow: `0 0 20px ${i % 3 === 0 ? '#14B8A6' : i % 3 === 1 ? '#0891B2' : '#22C55E'}`,
          }}
        />
      ))}

      {/* Círculos concêntricos animados */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`ring-${i}`}
          animate={{
            scale: [0, 2.5],
            opacity: [0.3, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '300px',
            height: '300px',
            marginLeft: '-150px',
            marginTop: '-150px',
            borderRadius: '50%',
            border: '2px solid rgba(20, 184, 166, 0.15)',
          }}
        />
      ))}

      {/* Formas geométricas rotativas */}
      {[
        { size: 150, duration: 20, delay: 0, top: '15%', left: '10%' },
        { size: 120, duration: 25, delay: 5, top: '70%', left: '80%' },
        { size: 100, duration: 22, delay: 10, top: '50%', left: '15%' },
      ].map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{
            rotate: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: shape.duration / 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: shape.duration / 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{
            position: 'absolute',
            top: shape.top,
            left: shape.left,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            border: '3px solid rgba(20, 184, 166, 0.15)',
            borderRadius: i % 2 === 0 ? '30%' : '20%',
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Linhas conectando pontos - efeito neural */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`line-${i}`}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.25, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: `${20 + i * 15}%`,
            left: i % 2 === 0 ? '10%' : '60%',
            width: '30%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.4), transparent)',
            transformOrigin: 'left',
          }}
        />
      ))}
    </div>
  );
}

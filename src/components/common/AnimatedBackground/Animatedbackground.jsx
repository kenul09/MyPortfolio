// AnimatedBackground.jsx

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let animationId;

    let W;
    let H;

    const stars = [];
    const trails = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;

      stars.length = 0;
      trails.length = 0;

      // STARS
      for (let i = 0; i < 220; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4,
          alpha: Math.random() * 0.8,
          speed: Math.random() * 0.15 + 0.03,
        });
      }

      // LIGHT TRAILS
      for (let i = 0; i < 3; i++) {
        trails.push({
          x: W * 0.6,
          y: H * 0.2 + i * 12,
          length: 500,
          speed: 1.4 + i * 0.3,
        });
      }
    }

    function drawBackground() {
      const gradient = ctx.createLinearGradient(0, 0, W, H);

      gradient.addColorStop(0, '#020617');
      gradient.addColorStop(0.5, '#020b1f');
      gradient.addColorStop(1, '#01040d');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // LEFT GLOW
      const leftGlow = ctx.createRadialGradient(
        W * 0.15,
        H * 0.35,
        0,
        W * 0.15,
        H * 0.35,
        W * 0.4
      );

      leftGlow.addColorStop(0, 'rgba(37,99,235,0.12)');
      leftGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, W, H);

      // RIGHT GLOW
      const rightGlow = ctx.createRadialGradient(
        W * 0.75,
        H * 0.3,
        0,
        W * 0.75,
        H * 0.3,
        W * 0.35
      );

      rightGlow.addColorStop(0, 'rgba(34,211,238,0.08)');
      rightGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, W, H);
    }

    function drawStars() {
      stars.forEach((s, i) => {
        s.x -= s.speed;

        if (s.x < 0) {
          s.x = W;
          s.y = Math.random() * H;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();

        // TWINKLE
        if (i % 8 === 0) {
          const pulse =
            0.5 + Math.sin(Date.now() * 0.002 + i) * 0.5;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.2, 0, Math.PI * 2);

          ctx.fillStyle = `rgba(120,180,255,${
            pulse * 0.18
          })`;

          ctx.fill();
        }
      });
    }

    function drawTrails() {
      trails.forEach((t, i) => {
        t.x += t.speed;

        if (t.x > W + 200) {
          t.x = W * 0.45;
        }

        ctx.beginPath();
        ctx.moveTo(t.x, t.y);

        ctx.lineTo(
          t.x + t.length,
          t.y - 120
        );

        ctx.strokeStyle = 'rgba(120,220,255,0.9)';
        ctx.lineWidth = 2;

        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;

        ctx.stroke();

        // PARTICLES
        for (let p = 0; p < 40; p++) {
          const px =
            t.x + Math.random() * t.length;

          const py =
            t.y -
            (px - t.x) * 0.24 +
            (Math.random() - 0.5) * 12;

          ctx.beginPath();

          ctx.arc(
            px,
            py,
            Math.random() * 2,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            'rgba(180,240,255,0.8)';

          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);

      drawBackground();
      drawStars();
      drawTrails();

      animationId = requestAnimationFrame(animate);
    }

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',

        // IMPORTANT
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        background: 'transparent',
      }}
    />
  );
}
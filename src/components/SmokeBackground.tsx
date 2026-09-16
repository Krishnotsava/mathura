"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
}

export function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const maxParticles = 20;

    const createParticle = (originX?: number, originY?: number): Particle => {
      const maxLife = 400 + Math.random() * 300;
      return {
        x: originX ?? Math.random() * width,
        y: originY ?? height + Math.random() * 80,
        radius: 60 + Math.random() * 110,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -(0.3 + Math.random() * 0.55),
        alpha: 0.001,
        maxAlpha: 0.045 + Math.random() * 0.045, // subtle & ethereal
        life: 0,
        maxLife,
      };
    };

    // Pre-populate particles across screen
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.y = Math.random() * height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Subtle wind drift toward mouse
        const dx = mouseX - p.x;
        p.x += dx * 0.00015;

        // Fade in and out
        const progress = p.life / p.maxLife;
        if (progress < 0.25) {
          p.alpha = (progress / 0.25) * p.maxAlpha;
        } else if (progress > 0.7) {
          p.alpha = ((1 - progress) / 0.3) * p.maxAlpha;
        }

        if (p.life >= p.maxLife || p.y < -p.radius * 2) {
          particles[i] = createParticle();
        }

        // Draw soft botanical smoke puff
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        gradient.addColorStop(0, `rgba(180, 195, 185, ${p.alpha * 1.2})`);
        gradient.addColorStop(0.5, `rgba(215, 205, 190, ${p.alpha * 0.6})`);
        gradient.addColorStop(1, "rgba(251, 249, 245, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="smoke-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

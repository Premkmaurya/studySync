import React, { useEffect, useRef } from "react";

/**
 * ParticleNetwork
 * Canvas-based lattice visualization inspired by high-impact tech CTA designs.
 * Renders a funnel/mesh grid of connected particles flowing into a focal beam.
 * Dynamically adjusts geometry for Horizontal (Desktop) and Vertical (Mobile) layouts.
 */
const ParticleNetwork = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Grid configuration
    const numStrands = 9; // Number of longitudinal curves
    const numSlices = 16;  // Slices along the funnel
    let particles = [];
    let startTime = performance.now();

    // Particle class for flowing sparks along the lattice
    class PulseParticle {
      constructor(strandIndex, isHorizontal) {
        this.reset(strandIndex, isHorizontal, true);
      }

      reset(strandIndex, isHorizontal, initial = false) {
        this.strandIndex = strandIndex !== undefined ? strandIndex : Math.floor(Math.random() * numStrands);
        this.t = initial ? Math.random() * 1.2 : 0; // 0 to 1.2 (1.2 extends into focal beam)
        this.speed = 0.003 + Math.random() * 0.004;
        this.size = 1.5 + Math.random() * 2;
        this.opacity = 0.4 + Math.random() * 0.6;
        this.color = Math.random() > 0.3 ? "#62aef0" : Math.random() > 0.5 ? "#ffffff" : "#0075de";
      }

      update(isHorizontal) {
        this.t += this.speed;
        if (this.t > 1.2) {
          this.reset(Math.floor(Math.random() * numStrands), isHorizontal, false);
        }
      }
    }

    // Initialize particles
    const initParticles = (isHorizontal) => {
      particles = [];
      const particleCount = isHorizontal ? 24 : 18;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new PulseParticle(i % numStrands, isHorizontal));
      }
    };

    // Resize handler with DPI scaling
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const isHorizontal = width >= height * 1.1 || width >= 768;
      initParticles(isHorizontal);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Track mouse position over canvas for subtle interactive attraction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.targetX = e.clientX - rect.left;
      mousePos.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mousePos.current.targetX = -1000;
      mousePos.current.targetY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Compute point on lattice for given t (0..1 funnel, >1 beam) and strandIndex (0..numStrands-1)
    const getLatticePoint = (t, strandIdx, isHorizontal, time) => {
      const normStrand = (strandIdx - (numStrands - 1) / 2) / ((numStrands - 1) / 2); // -1 to +1

      if (isHorizontal) {
        // Desktop Layout: Left -> Right Funnel
        const startX = width * 0.05;
        const funnelEndX = width * 0.76;
        const beamEndX = width * 0.96;
        const centerY = height * 0.5;

        if (t <= 1.0) {
          const x = startX + t * (funnelEndX - startX);
          const envelope = Math.pow(1 - t, 1.5) * (height * 0.40);
          const wave = Math.sin(t * 7 - time * 1.5 + strandIdx * 0.5) * (6 * (1 - t));
          const baseY = centerY + normStrand * envelope + wave;

          // Mouse attraction calculation
          let dx = x - mousePos.current.x;
          let dy = baseY - mousePos.current.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let offsetX = 0;
          let offsetY = 0;
          if (dist < 120 && dist > 0) {
            let force = (1 - dist / 120) * 14;
            offsetX = (dx / dist) * force;
            offsetY = (dy / dist) * force;
          }

          return { x: x + offsetX, y: baseY + offsetY, inBeam: false, envelope };
        } else {
          // Focal beam line
          const beamProgress = (t - 1.0) / 0.2;
          const x = funnelEndX + beamProgress * (beamEndX - funnelEndX);
          const wave = Math.sin(time * 3 + strandIdx) * 1.2;
          return { x, y: centerY + wave, inBeam: true, envelope: 0 };
        }
      } else {
        // Mobile Layout: Top -> Bottom Funnel
        const startY = height * 0.06;
        const funnelEndY = height * 0.74;
        const beamEndY = height * 0.94;
        const centerX = width * 0.5;

        if (t <= 1.0) {
          const y = startY + t * (funnelEndY - startY);
          const envelope = Math.pow(1 - t, 1.5) * (width * 0.38);
          const wave = Math.sin(t * 7 - time * 1.5 + strandIdx * 0.5) * (6 * (1 - t));
          const baseX = centerX + normStrand * envelope + wave;

          let dx = baseX - mousePos.current.x;
          let dy = y - mousePos.current.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          let offsetX = 0;
          let offsetY = 0;
          if (dist < 100 && dist > 0) {
            let force = (1 - dist / 100) * 10;
            offsetX = (dx / dist) * force;
            offsetY = (dy / dist) * force;
          }

          return { x: baseX + offsetX, y: y + offsetY, inBeam: false, envelope };
        } else {
          // Focal beam line pointing down
          const beamProgress = (t - 1.0) / 0.2;
          const y = funnelEndY + beamProgress * (beamEndY - funnelEndY);
          const wave = Math.sin(time * 3 + strandIdx) * 1.2;
          return { x: centerX + wave, y, inBeam: true, envelope: 0 };
        }
      }
    };

    // Render frame
    const render = (now) => {
      const time = (now - startTime) * 0.001;

      // Smooth mouse movement interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.1;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.1;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isHorizontal = width >= height * 1.1 || width >= 768;

      // Ambient background glow at focal convergence point
      const glowX = isHorizontal ? width * 0.76 : width * 0.5;
      const glowY = isHorizontal ? height * 0.5 : height * 0.74;
      const bgGradient = ctx.createRadialGradient(glowX, glowY, 5, glowX, glowY, isHorizontal ? width * 0.45 : height * 0.45);
      bgGradient.addColorStop(0, "rgba(0, 117, 222, 0.15)");
      bgGradient.addColorStop(0.5, "rgba(9, 127, 232, 0.04)");
      bgGradient.addColorStop(1, "rgba(5, 8, 13, 0)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Pre-calculate grid node matrix
      const grid = [];
      for (let s = 0; s <= numSlices; s++) {
        const t = s / numSlices;
        const sliceNodes = [];
        for (let k = 0; k < numStrands; k++) {
          sliceNodes.push(getLatticePoint(t, k, isHorizontal, time));
        }
        grid.push(sliceNodes);
      }

      // 1. Draw Longitudinal Lines (strands)
      for (let k = 0; k < numStrands; k++) {
        ctx.beginPath();
        for (let s = 0; s <= numSlices; s++) {
          const pt = grid[s][k];
          if (s === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        // Beam extension line
        const beamPt = getLatticePoint(1.2, k, isHorizontal, time);
        ctx.lineTo(beamPt.x, beamPt.y);

        const strandAlpha = 0.08 + (1 - Math.abs(k - (numStrands - 1) / 2) / (numStrands / 2)) * 0.12;
        ctx.strokeStyle = `rgba(0, 117, 222, ${strandAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Draw Transverse Lines (grid rings)
      for (let s = 0; s <= numSlices; s++) {
        const t = s / numSlices;
        ctx.beginPath();
        for (let k = 0; k < numStrands; k++) {
          const pt = grid[s][k];
          if (k === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }

        const ringAlpha = (0.04 + 0.16 * t) * (1 - t * 0.3);
        ctx.strokeStyle = `rgba(98, 174, 240, ${ringAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Draw Grid Nodes (dots)
      for (let s = 0; s <= numSlices; s++) {
        const t = s / numSlices;
        for (let k = 0; k < numStrands; k++) {
          const pt = grid[s][k];
          
          // Density & brightness increases toward convergence
          const nodeRadius = 1.2 + t * 1.6;
          const nodeAlpha = 0.2 + t * 0.7;

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, nodeRadius, 0, Math.PI * 2);
          
          if (t > 0.85) {
            ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha})`;
          } else if (k % 2 === 0) {
            ctx.fillStyle = `rgba(98, 174, 240, ${nodeAlpha})`;
          } else {
            ctx.fillStyle = `rgba(0, 117, 222, ${nodeAlpha})`;
          }
          ctx.fill();
        }
      }

      // 4. Draw Focal Beam (horizontal or vertical bright core stream)
      const focalStart = getLatticePoint(0.98, (numStrands - 1) / 2, isHorizontal, time);
      const focalEnd = getLatticePoint(1.22, (numStrands - 1) / 2, isHorizontal, time);
      
      const beamGrad = isHorizontal
        ? ctx.createLinearGradient(focalStart.x, 0, focalEnd.x, 0)
        : ctx.createLinearGradient(0, focalStart.y, 0, focalEnd.y);
      beamGrad.addColorStop(0, "rgba(98, 174, 240, 0.9)");
      beamGrad.addColorStop(0.5, "rgba(0, 117, 222, 0.95)");
      beamGrad.addColorStop(1, "rgba(255, 255, 255, 0.1)");

      // Glow line behind focal beam
      ctx.beginPath();
      ctx.moveTo(focalStart.x, focalStart.y);
      ctx.lineTo(focalEnd.x, focalEnd.y);
      ctx.strokeStyle = "rgba(0, 117, 222, 0.4)";
      ctx.lineWidth = 6;
      ctx.stroke();

      // Sharp center core line
      ctx.beginPath();
      ctx.moveTo(focalStart.x, focalStart.y);
      ctx.lineTo(focalEnd.x, focalEnd.y);
      ctx.strokeStyle = beamGrad;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 5. Update & Render Flowing Pulse Particles
      if (!isReducedMotion) {
        particles.forEach((p) => {
          p.update(isHorizontal);
          const pPoint = getLatticePoint(p.t, p.strandIndex, isHorizontal, time);

          ctx.beginPath();
          ctx.arc(pPoint.x, pPoint.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * (p.t > 1.0 ? 1 - (p.t - 1.0) / 0.2 : 0.4 + p.t * 0.6);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Glowing tail for particles
          if (p.t > 0.1) {
            const tailPoint = getLatticePoint(Math.max(0, p.t - 0.04), p.strandIndex, isHorizontal, time);
            const tailGrad = ctx.createLinearGradient(pPoint.x, pPoint.y, tailPoint.x, tailPoint.y);
            tailGrad.addColorStop(0, p.color);
            tailGrad.addColorStop(1, "transparent");

            ctx.beginPath();
            ctx.moveTo(pPoint.x, pPoint.y);
            ctx.lineTo(tailPoint.x, tailPoint.y);
            ctx.strokeStyle = tailGrad;
            ctx.lineWidth = p.size * 0.9;
            ctx.stroke();
          }
        });
      }

      ctx.restore();

      if (!isReducedMotion) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    if (isReducedMotion) {
      render(startTime);
    } else {
      animationFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[320px] overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        role="img"
        aria-label="Abstract connected network particle visualization representing knowledge flow and student community convergence"
      />
    </div>
  );
};

export default ParticleNetwork;

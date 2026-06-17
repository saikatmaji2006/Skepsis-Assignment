import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ icon: Icon, label, value, color = 'primary' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const colorMap = {
    primary: 'from-primary to-secondary',
    accent: 'from-accent to-blue-500',
    green: 'from-emerald-500 to-green-500',
    orange: 'from-orange-500 to-amber-500',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount(value);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const animateCount = (target) => {
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  };

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -2, scale: 1.02 }}
      className="card p-5 flex items-center gap-4"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-lg`}
      >
        <Icon className="text-white text-xl" />
      </div>
      <div>
        <p className="text-2xl font-bold text-dark-text">{count.toLocaleString()}</p>
        <p className="text-xs text-dark-muted font-medium uppercase tracking-wider">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

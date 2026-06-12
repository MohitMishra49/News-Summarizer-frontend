import { motion } from 'framer-motion';
import { ArrowDown, Zap, Shield, TrendingUp } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Animated orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'pulse 4s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
        style={{
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.3)',
        }}
      >
        <Zap className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-xs font-medium text-indigo-300 tracking-wide">
          Powered by State-of-the-Art AI
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold text-center tracking-tight leading-[1.05] mb-6 max-w-4xl"
      >
        <span className="text-slate-100">AI News</span>
        <br />
        <span className="gradient-text">Intelligence</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-slate-400 text-center max-w-2xl mb-10 leading-relaxed"
      >
        Transform lengthy news articles into concise, actionable insights.
        <br className="hidden md:block" />
        Cut through the noise and understand what matters — in seconds.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <motion.a
          href="#workspace"
          whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(99,102,241,0.4)' }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(135deg, #6366F1, #06B6D4)' }}
        >
          <Zap className="w-4 h-4" />
          Start Summarizing
        </motion.a>
        <motion.a
          href="#features"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-slate-300 font-semibold text-sm glass"
        >
          Learn More
        </motion.a>
      </motion.div>

      {/* Social proof bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-wrap justify-center gap-8 mb-12"
      >
        {[
          { icon: <TrendingUp className="w-4 h-4 text-indigo-400" />, label: '10× faster', sub: 'than manual reading' },
          { icon: <Shield className="w-4 h-4 text-cyan-400" />, label: '95% accuracy', sub: 'in key facts retained' },
          { icon: <Zap className="w-4 h-4 text-emerald-400" />, label: '<3s latency', sub: 'average response time' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2.5">
            {item.icon}
            <div>
              <div className="text-sm font-semibold text-slate-200">{item.label}</div>
              <div className="text-xs text-slate-500">{item.sub}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown className="w-4 h-4 text-slate-600" />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </section>
  );
}

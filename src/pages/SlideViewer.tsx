import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { kajianList as kajianData } from '../data/kajian';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

export default function SlideViewer() {
  const { id, pertemuanId } = useParams();
  const navigate = useNavigate();
  
  const kajian = kajianData.find(k => k.id === id);
  const slides = useMemo(() => {
    if (!kajian) return [];
    if (kajian.type === 'single') return kajian.slides || [];
    if (kajian.type === 'series' && pertemuanId) {
      const per = kajian.pertemuan?.find(p => p.id === parseInt(pertemuanId));
      return per?.slides || [];
    }
    return [];
  }, [kajian, pertemuanId]);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!kajian || slides.length === 0) {
    return (
      <div className="p-12 text-center">
        <h2 className="font-serif text-2xl text-text-primary mb-4">Materi tidak ditemukan</h2>
        <Link to="/" className="text-accent-main hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const currentSlide = slides[currentIndex];
  const backUrl = kajian.type === 'series' ? `/kajian/${kajian.id}` : '/';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: kajian.color.soft }}>
      {/* Top Bar */}
      <div className="w-full px-6 py-6 flex justify-between items-center max-w-4xl mx-auto shrink-0 z-10">
        <button 
          onClick={() => navigate(backUrl)}
          className="flex items-center justify-center w-10 h-10 rounded-full frosted-glass border border-[#F0DDE4] transition-transform hover:-translate-x-1"
          style={{ color: kajian.color.primary }}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-xs bg-white px-4 py-1.5 rounded-full font-bold shadow-sm" style={{ color: kajian.color.primary }}>
          {currentIndex + 1} / {slides.length}
        </div>
        <div className="w-10"></div> {/* Spacer to center the counter */}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-4 relative w-full h-full max-w-2xl mx-auto">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full flex-1 flex flex-col"
          >
            <div 
              className="bg-white rounded-3xl w-full flex-1 mx-auto p-10 md:p-14 accent-shadow relative overflow-hidden flex flex-col border border-white"
            >
              {/* Tag Pill */}
              <div className="self-start">
                <span 
                  className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border"
                  style={{ backgroundColor: kajian.color.primary, color: 'white', borderColor: kajian.color.primary }}
                >
                  {currentSlide.tag}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif font-bold text-4xl md:text-5xl mt-2 mb-8 leading-tight relative z-10 text-center" style={{ color: kajian.color.primary }}>
                {currentSlide.title}
              </h1>

              {/* Divider */}
              <hr className="w-24 mb-8 mx-auto relative z-10" style={{ borderColor: 'var(--color-border-main)' }} />

              {/* Content */}
              <div 
                className="font-sans text-lg md:text-xl leading-relaxed text-center px-4 md:px-10 relative z-10 markdown-body"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Markdown>{currentSlide.content}</Markdown>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Bottom Controls */}
      <div className="w-full px-6 py-8 flex justify-between items-center max-w-md mx-auto shrink-0 z-10">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center justify-center w-10 h-10 rounded-full border border-white transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/50 bg-white shadow-sm'}`}
          style={{ color: kajian.color.accent, borderColor: 'var(--color-border-main)' }}
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              className={`rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 h-2' : 'w-2 h-2 opacity-100'}`}
              style={{ backgroundColor: idx === currentIndex ? kajian.color.accent : 'var(--color-border-main)' }}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          disabled={currentIndex === slides.length - 1}
          className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${currentIndex === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/50 bg-white shadow-sm'}`}
          style={{ color: kajian.color.accent, borderColor: 'var(--color-border-main)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
}

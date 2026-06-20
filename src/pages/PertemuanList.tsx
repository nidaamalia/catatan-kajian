import { useParams, Link } from 'react-router-dom';
import { kajianList as kajianData } from '../data/kajian';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function PertemuanList() {
  const { id } = useParams();
  const kajian = kajianData.find(k => k.id === id);

  if (!kajian || kajian.type !== 'series') {
    return (
      <div className="p-12 text-center">
        <h2 className="font-serif text-2xl text-text-primary mb-4">Kajian tidak ditemukan</h2>
        <Link to="/" className="text-accent-main hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 md:py-16">
      {/* Navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center justify-center w-10 h-10 rounded-full frosted-glass border border-[#F0DDE4] mb-10 transition-transform hover:-translate-x-1"
        style={{ color: kajian.color.primary }}
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif font-bold text-4xl md:text-5xl mb-3" style={{ color: 'var(--color-text-primary)' }}>
          {kajian.title}
        </h1>
        <p className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          {kajian.pemateri}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {kajian.tags.map(tag => (
            <span 
              key={tag} 
              className="text-[10px] tracking-widest px-2.5 py-1 rounded bg-white text-[#C4788A]"
              style={{ backgroundColor: 'var(--color-card-bg)', color: kajian.color.accent, border: '1px solid var(--color-border-main)' }}
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {kajian.pertemuan?.map(p => (
          <Link 
            key={p.id} 
            to={`/kajian/${kajian.id}/${p.id}`}
            className="flex items-center gap-4 p-4 rounded-xl frosted-glass border-l-4 soft-shadow transition-transform hover:-translate-y-1 hover:bg-white hover:shadow-xl group"
            style={{ borderLeftColor: kajian.color.accent }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-serif text-lg"
              style={{ backgroundColor: 'white', color: kajian.color.accent, border: '1px solid var(--color-border-main)' }}
            >
              {p.id}
            </div>
            
            <div className="flex-1">
              <h3 className="font-serif font-bold text-lg mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {p.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>
                {p.date}
              </p>
            </div>
            
            <div className="pl-4 pr-2" style={{ color: 'var(--color-text-secondary)' }}>
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

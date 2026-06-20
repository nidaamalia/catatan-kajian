import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { kajianList as kajianData } from '../data/kajian';

export default function HomePage() {
  const [activeTag, setActiveTag] = useState<string>('Semua');
  const [activeTab, setActiveTab] = useState<string>('Semua');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    kajianData.forEach(k => k.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, []);

  const filteredKajian = useMemo(() => {
    return kajianData.filter(kajian => {
      const matchTag = activeTag === 'Semua' || kajian.tags.includes(activeTag);
      const matchTab = activeTab === 'Semua' || 
                      (activeTab === 'Kelas' && kajian.type === 'series') ||
                      (activeTab === 'Tematik' && kajian.type === 'single');
      return matchTag && matchTab;
    });
  }, [activeTag, activeTab]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-wide" style={{ color: 'var(--color-text-primary)' }}>
          Catatan Kajian
        </h1>
      </div>

      {/* Tag Cloud */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        <button 
          onClick={() => setActiveTag('Semua')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-200`}
          style={{
            backgroundColor: activeTag === 'Semua' ? 'var(--color-accent-main)' : 'rgba(255,255,255,0.6)',
            color: activeTag === 'Semua' ? '#fff' : 'var(--color-text-secondary)',
            border: activeTag === 'Semua' ? '1px solid var(--color-accent-main)' : '1px solid var(--color-border-main)',
            backdropFilter: activeTag === 'Semua' ? 'none' : 'blur(8px)',
          }}
        >
          Semua
        </button>
        {allTags.map(tag => (
          <button 
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors duration-200`}
            style={{
              backgroundColor: activeTag === tag ? 'var(--color-accent-main)' : 'rgba(255,255,255,0.6)',
              color: activeTag === tag ? '#fff' : 'var(--color-text-secondary)',
              border: activeTag === tag ? '1px solid var(--color-accent-main)' : '1px solid var(--color-border-main)',
              backdropFilter: activeTag === tag ? 'none' : 'blur(8px)',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Type Tabs */}
      <div className="flex gap-6 border-b mb-10" style={{ borderColor: 'var(--color-border-main)' }}>
        {['Semua', 'Kelas', 'Tematik'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold tracking-wider uppercase transition-colors relative`}
            style={{
              color: activeTab === tab ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
            }}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-[-1px] left-0 w-full h-[2px]" style={{ backgroundColor: 'var(--color-accent-main)' }} />
            )}
          </button>
        ))}
      </div>

      {/* Kajian Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredKajian.map(kajian => (
          <Link 
            key={kajian.id}
            to={kajian.type === 'series' ? `/kajian/${kajian.id}` : `/kajian/${kajian.id}/materi`}
            className="block h-full group"
          >
            <div 
              className="frosted-glass rounded-xl p-6 soft-shadow h-full flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-xl bg-white/70"
              style={{
                borderLeft: `4px solid ${kajian.color.accent}`,
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-white" style={{ color: kajian.color.accent }}>
                  {kajian.cover_tag}
                </span>
                <span className="text-xs font-bold tracking-wider uppercase" style={{ color: 'var(--color-text-secondary)' }}>
                  {kajian.type === 'series' ? `${kajian.pertemuan?.length || 0} Pertemuan` : kajian.date}
                </span>
              </div>
              
              <h2 className="font-serif text-2xl font-bold leading-tight mb-1 mt-2 transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                {kajian.title}
              </h2>
              
              <p className="text-sm font-semibold mb-6 uppercase tracking-wider mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                Oleh {kajian.pemateri}
              </p>
              
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {kajian.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-[10px] bg-transparent border px-2 py-0.5 rounded"
                    style={{ borderColor: 'var(--color-border-main)', color: 'var(--color-text-secondary)' }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

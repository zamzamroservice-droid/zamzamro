import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import FaqAccordion from '../components/ui/FaqAccordion';
import CtaBanner from '../components/ui/CtaBanner';
import { routeMeta } from '../data/seo';
import { faqs, faqTopicTa, faqTopics, type FaqTopic } from '../data/faqs';
import { breadcrumb, faqPage } from '../lib/schema';
import { useLang } from '../i18n/LanguageProvider';

export default function FAQ() {
  const meta = routeMeta.faq;
  const { t, lang } = useLang();
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState<FaqTopic | null>(null);
  const crumbs = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.faq'), path: '/faq' },
  ];
  const list = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    // Search both languages so a query in either script finds the question.
    return faqs.filter((f) => (!topic || f.topics.includes(topic)) && words.every((w) => `${f.q} ${f.a} ${f.ta.q} ${f.ta.a}`.toLowerCase().includes(w)));
  }, [q, topic]);

  return (
    <>
      {/* FAQPage markup mirrors the full, visible English Q&A on this page. */}
      <Seo title={meta.title} description={meta.description} path="/faq" jsonLd={[faqPage(faqs), breadcrumb([{ name: 'Home', path: '/' }, { name: 'FAQs', path: '/faq' }])]} />
      <PageHero
        eyebrow={t('fq.eyebrow')}
        title={
          <>
            {t('fq.title')} <span className="accent text-gold">{t('fq.accent')}</span>
          </>
        }
        intro={t('fq.intro')}
        crumbs={crumbs}
      />
      <section className="container-royal max-w-4xl py-10 sm:py-14">
        <label className="relative block">
          <span className="sr-only">{t('fq.search')}</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-mist" aria-hidden />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('fq.search')} className="field !rounded-full !py-3.5 !pl-11" />
        </label>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('fq.topics')}>
          {faqTopics.map((tp, i) => (
            <motion.li key={tp} animate={{ y: [0, -3, 0] }} transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}>
              <button
                type="button"
                aria-pressed={topic === tp}
                onClick={() => setTopic(topic === tp ? null : tp)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-[0.8rem] transition-colors ${topic === tp ? 'border-navy bg-navy text-white' : 'border-ice/70 bg-white text-navy hover:border-gold'}`}
              >
                {lang === 'ta' ? faqTopicTa[tp] : tp}
              </button>
            </motion.li>
          ))}
        </ul>
        <p className="mt-5 text-[0.82rem] text-mist" aria-live="polite">
          {list.length === 1 ? t('fq.count1') : t('fq.count', { n: list.length })}
        </p>
        <div className="mt-3">
          {list.length ? (
            <FaqAccordion key={`${q}-${topic}`} items={list} defaultOpen={null} />
          ) : (
            <p className="rounded-[22px] border border-dashed border-ice p-8 text-center text-mist">{t('fq.none')}</p>
          )}
        </div>
      </section>
      <CtaBanner
        title={
          <>
            {t('fq.ctaTitle')} <span className="accent text-gold">{t('fq.ctaAccent')}</span>
          </>
        }
      />
    </>
  );
}

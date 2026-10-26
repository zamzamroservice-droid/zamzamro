import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageProvider';

export interface Crumb {
  name: string;
  path: string;
}

export default function Breadcrumbs({ items, tone = 'navy' }: { items: Crumb[]; tone?: 'navy' | 'light' }) {
  const light = tone === 'light';
  const { t } = useLang();
  return (
    <nav aria-label={t('nav.breadcrumb')}>
      <ol className={`flex flex-wrap items-center gap-1 text-[0.74rem] tracking-wide ${light ? 'text-white/70' : 'text-mist'}`}>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className={light ? 'text-white' : 'text-navy'}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link to={c.path} className={`hover:underline ${light ? 'hover:text-white' : 'hover:text-navy'}`}>
                    {c.name}
                  </Link>
                  <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

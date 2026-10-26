import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProductVisual from '../ui/ProductVisual';
import Swatches from '../ui/Swatches';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { fullName, productPath, ptext, type Product } from '../../data/products';
import { useLang } from '../../i18n/LanguageProvider';
import { messages, whatsappLink } from '../../lib/whatsapp';

export default function ProductCard({ product }: { product: Product }) {
  const href = productPath(product);
  const { t, lang } = useLang();
  return (
    <article className="group card-royal relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift">
      <Link to={href} className="relative m-2 block overflow-hidden rounded-[20px] bg-gradient-to-b from-white to-aqua/60" tabIndex={-1} aria-hidden>
        <ProductVisual product={product} className="aspect-[4/3.4] w-full p-4 transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </Link>
      <div className="flex flex-1 flex-col px-5 pt-3 pb-5">
        <p className="text-[0.64rem] font-medium tracking-[0.24em] text-gold-deep uppercase">
          {product.brand}
          {product.series && ` · ${product.series}`}
        </p>
        <h3 className="mt-1.5 text-[1.45rem] leading-tight">
          <Link to={href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {fullName(product)}
          </Link>
        </h3>
        <p className="mt-1.5 text-[0.88rem] text-mist">{ptext(product, lang).short}</p>
        <div className="mt-3">
          <Swatches colours={product.colours} />
        </div>
        <div className="relative z-10 mt-auto flex items-center gap-2 pt-4">
          <Link to={href} className="btn-ghost !min-h-10 flex-1 !px-3 !py-2 !text-[0.78rem]">
            {t('cta.viewProduct')} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <a
            href={whatsappLink(messages.product(product))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('cta.enquireAbout', { name: fullName(product) })}
            className="btn !min-h-10 bg-[#1fa855] !px-3.5 !py-2 text-white hover:bg-[#1a9049]"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

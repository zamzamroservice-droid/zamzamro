import { useId, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Send } from 'lucide-react';
import { serviceOptions } from '../../data/services';
import { fullName, products } from '../../data/products';
import { enquiryMessage, whatsappLink, type EnquiryData } from '../../lib/whatsapp';
import { EASE } from '../../lib/motion';
import { useLang } from '../../i18n/LanguageProvider';
import type { DictKey } from '../../i18n/dict';

interface Props {
  defaultService?: string;
  defaultProduct?: string;
  title?: string;
  compact?: boolean;
}

/** Errors hold dictionary keys so they re-translate when the language changes. */
type Errors = Partial<Record<keyof EnquiryData, DictKey>>;

// Values stay in English for the WhatsApp message; labels are localised.
const TIMES = [
  { value: 'Morning (9 AM – 12 PM)', key: 'fm.morning' },
  { value: 'Afternoon (12 – 4 PM)', key: 'fm.afternoon' },
  { value: 'Evening (4 – 8 PM)', key: 'fm.evening' },
] as const;
const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function validate(d: EnquiryData): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = 'fm.e.name';
  const digits = d.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'fm.e.phone';
  if (!d.service) e.service = 'fm.e.service';
  if (d.area.trim().length < 2) e.area = 'fm.e.area';
  if (d.date && d.date < today()) e.date = 'fm.e.date';
  if (d.message && d.message.length > 600) e.message = 'fm.e.message';
  return e;
}

/**
 * Frontend-only enquiry form. It validates the details and opens WhatsApp with a structured
 * message — nothing is stored, and no appointment is confirmed until Zam Zam replies.
 */
export default function EnquiryForm({ defaultService = '', defaultProduct = '', title, compact = false }: Props) {
  const uid = useId();
  const { t, lang } = useLang();
  const options = serviceOptions(lang);
  const [data, setData] = useState<EnquiryData>({
    name: '',
    phone: '',
    service: serviceOptions('en').some((o) => o.value === defaultService) ? defaultService : '',
    product: defaultProduct,
    area: '',
    date: '',
    time: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof EnquiryData) => (e: { target: { value: string } }) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    window.open(whatsappLink(enquiryMessage({ ...data, name: data.name.trim(), area: data.area.trim(), message: data.message?.trim() })), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const field = (k: keyof EnquiryData, label: string, required: boolean, input: ReactNode) => (
    <div className={k === 'message' ? 'sm:col-span-2' : ''}>
      <label htmlFor={`${uid}-${k}`} className="mb-1.5 block text-[0.78rem] font-medium tracking-wide text-navy">
        {label} {required ? <span className="text-gold-deep">*</span> : <span className="font-normal text-mist">{t('fm.optional')}</span>}
      </label>
      {input}
      {errors[k] && (
        <p id={`${uid}-${k}-err`} role="alert" className="mt-1 text-[0.76rem] text-rose-600">
          {t(errors[k])}
        </p>
      )}
    </div>
  );

  const aria = (k: keyof EnquiryData) => ({
    id: `${uid}-${k}`,
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined,
    className: 'field',
  });

  return (
    <div className={`card-royal relative overflow-hidden ${compact ? 'p-5' : 'p-5 sm:p-8'}`}>
      <h2 className="text-[1.9rem]">{title ?? t('fm.title')}</h2>
      <p className="mt-1 text-[0.86rem] text-mist">{t('fm.intro')}</p>
      <form onSubmit={submit} noValidate className="mt-6 grid gap-4 sm:grid-cols-2">
        {field('name', t('fm.name'), true, <input {...aria('name')} type="text" autoComplete="name" value={data.name} onChange={set('name')} required />)}
        {field('phone', t('fm.phone'), true, <input {...aria('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" value={data.phone} onChange={set('phone')} required />)}
        {field(
          'service',
          t('fm.service'),
          true,
          <select {...aria('service')} value={data.service} onChange={set('service')} required>
            <option value="">{t('fm.chooseService')}</option>
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>,
        )}
        {field(
          'product',
          t('fm.product'),
          false,
          <select {...aria('product')} value={data.product} onChange={set('product')}>
            <option value="">{t('fm.notSure')}</option>
            {products.map((p) => (
              <option key={p.slug}>{fullName(p)}</option>
            ))}
            {defaultProduct && !products.some((p) => fullName(p) === defaultProduct) && <option>{defaultProduct}</option>}
          </select>,
        )}
        {field('area', t('fm.area'), true, <input {...aria('area')} type="text" autoComplete="address-level3" placeholder={t('fm.areaPh')} value={data.area} onChange={set('area')} required />)}
        {field('date', t('fm.date'), false, <input {...aria('date')} type="date" min={today()} value={data.date} onChange={set('date')} />)}
        {field(
          'time',
          t('fm.time'),
          false,
          <select {...aria('time')} value={data.time} onChange={set('time')}>
            <option value="">{t('fm.anyTime')}</option>
            {TIMES.map((o) => (
              <option key={o.value} value={o.value}>
                {t(o.key)}
              </option>
            ))}
          </select>,
        )}
        <div className="hidden sm:block" />
        {field('message', t('fm.message'), false, <textarea {...aria('message')} rows={3} maxLength={600} placeholder={t('fm.messagePh')} value={data.message} onChange={set('message')} />)}
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            <Send className="h-4 w-4" aria-hidden /> {t('fm.submit')}
          </button>
          <p className="mt-3 text-[0.74rem] text-mist">
            {t('fm.disclaimer')}
          </p>
        </div>
      </form>
      <AnimatePresence>
        {sent && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-5 flex items-start gap-3 rounded-2xl bg-aqua p-4 text-[0.86rem] text-navy"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ocean" aria-hidden />
            <p>{t('fm.sent')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

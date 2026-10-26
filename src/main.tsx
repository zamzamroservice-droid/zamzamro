import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './i18n/LanguageProvider';
import './index.css';

// Prerendered route tags are for crawlers & link previews; React renders the live ones from here on.
document.querySelectorAll('head [data-pr], head script[data-pr-ld]').forEach((el) => el.remove());

// The scroll-driven hero should always begin at the top after a reload.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);

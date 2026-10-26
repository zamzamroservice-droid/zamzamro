import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Preloader from './components/layout/Preloader';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingContact from './components/layout/FloatingContact';
import ScrollProgress from './components/layout/ScrollProgress';
import ClickFeedback from './components/layout/ClickFeedback';
import Home from './pages/Home';
import { initSmoothScroll, scrollToElement, scrollToTop } from './lib/scroll';
import { EASE } from './lib/motion';

const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Services = lazy(() => import('./pages/Services'));
const Installation = lazy(() => import('./pages/Installation'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);

  useEffect(() => initSmoothScroll(), []);

  // Scroll to top on route change, or to the #anchor (offset for the fixed header).
  useEffect(() => {
    if (loading) return;
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(id);
        if (el) scrollToElement(el);
        else if (tries++ < 20) setTimeout(seek, 100); // wait for lazy route + exit transition
      };
      setTimeout(seek, 380);
      return;
    }
    scrollToTop();
  }, [location.pathname, location.hash, loading]);

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      <AnimatePresence>{loading && <Preloader onDone={finish} />}</AnimatePresence>
      <ScrollProgress />
      <ClickFeedback />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Suspense fallback={<div className="min-h-svh water-soft" aria-busy="true" />}>
            <Routes location={location}>
              <Route path="/" element={<Home ready={!loading} />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/installation" element={<Installation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingContact />
    </MotionConfig>
  );
}

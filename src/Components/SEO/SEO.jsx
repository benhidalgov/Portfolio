import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://portfolio-bice-eight-77.vercel.app';

export default function SEO({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }

    // Canonical por ruta: /#skills y /projects/kgb no compiten como duplicados.
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = SITE + pathname;
  }, [title, description, pathname]);

  return null;
}

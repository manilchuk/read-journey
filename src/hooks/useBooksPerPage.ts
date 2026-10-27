// src/hooks/useBooksPerPage.ts
import { useEffect, useState } from 'react';

// Мають збігатися з breakpoint-ами в RecommendedPage.module.css
const TABLET_QUERY = '(min-width: 768px)';
const DESKTOP_QUERY = '(min-width: 1440px)';

// За макетом: mobile показує 2 книжки (1 ряд), tablet 8 (4×2), desktop 10 (5×2)
const MOBILE_LIMIT = 2;
const TABLET_LIMIT = 8;
const DESKTOP_LIMIT = 10;

const getLimit = (): number => {
  if (window.matchMedia(DESKTOP_QUERY).matches) return DESKTOP_LIMIT;
  if (window.matchMedia(TABLET_QUERY).matches) return TABLET_LIMIT;
  return MOBILE_LIMIT;
};

export const useBooksPerPage = (): number => {
  const [limit, setLimit] = useState<number>(getLimit);

  useEffect(() => {
    const tablet = window.matchMedia(TABLET_QUERY);
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const update = () => setLimit(getLimit());

    tablet.addEventListener('change', update);
    desktop.addEventListener('change', update);

    return () => {
      tablet.removeEventListener('change', update);
      desktop.removeEventListener('change', update);
    };
  }, []);

  return limit;
};

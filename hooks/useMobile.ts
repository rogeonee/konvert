import { useState, useEffect } from 'react';

const useMobile = () => {
  const [mobileSize, setMobileSize] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 400) {
        setMobileSize('small');
        console.log('useMobile | small');
      } else if (width >= 400 && width < 420) {
        setMobileSize('medium');
        console.log('useMobile | medium');
      } else if (width >= 420 && width < 640) {
        setMobileSize('large');
        console.log('useMobile | large');
      } else {
        setMobileSize('not-mobile'); // Not a mobile
        console.log('useMobile | not-mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return mobileSize;
};

export default useMobile;

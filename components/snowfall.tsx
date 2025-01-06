'use client';

import { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';

const SnowfallComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <Snowfall
      snowflakeCount={25}
      changeFrequency={400}
      speed={[0.5, 1]}
      opacity={[0.3, 0.8]}
      wind={[-2, 5]}
    />
  );
};

export default SnowfallComponent;

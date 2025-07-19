
"use client"

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = adContainerRef.current;
    if (container && container.children.length === 1) { // Only the div, no script yet
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl27208232.profitableratecpm.com/34d774587b9290e27dfe066b2ba5e8a2/invoke.js';

      container.appendChild(script);
    }
    
    // Cleanup function to remove script if component unmounts
    return () => {
      if (container) {
        // Simple cleanup, might need more robust solution depending on ad script behavior
        while (container.children.length > 1) {
            container.removeChild(container.lastChild as Node);
        }
      }
    };
  }, []);

  return (
    <div ref={adContainerRef}>
        <div id="container-34d774587b9290e27dfe066b2ba5e8a2"></div>
    </div>
  );
};

export default AdBanner;

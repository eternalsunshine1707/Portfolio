import { useEffect, useState } from 'react';
import { playWhoosh } from '../utils/playWhoosh';

const STRIP_COUNT = 10;
const STRIP_COLOR = '#c9b694';
export const CURTAIN_TOTAL_MS = 2600 + (STRIP_COUNT - 1) * 90 + 100;

const CurtainOverlay = () => {
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    playWhoosh();
    const handler = () => {
      playWhoosh();
      setPlayKey((k) => k + 1);
    };
    window.addEventListener('portfolio:curtain', handler);
    return () => window.removeEventListener('portfolio:curtain', handler);
  }, []);

  return (
    <div key={playKey} className="fixed inset-0 z-[9999] flex pointer-events-none">
      {Array.from({ length: STRIP_COUNT }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: STRIP_COLOR,
            animation: `curtainFall 2.6s cubic-bezier(0.76,0,0.24,1) ${i * 0.09}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default CurtainOverlay;

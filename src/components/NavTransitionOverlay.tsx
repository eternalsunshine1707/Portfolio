import { useEffect, useState } from 'react';
import { playWhoosh } from '../utils/playWhoosh';

const STRIP_COUNT = 10;
const STRIP_COLOR = '#c9b694';
const WIPE_MS = 500;
const FALL_MS = 2600;
const STAGGER_MS = 90;

/**
 * Two-phase nav transition, distinct from the landing CurtainOverlay:
 * phase 1 wipes navy -> beige from the bottom up (clip-path), phase 2
 * immediately curtain-falls beige -> navy from the top down (same
 * translateY mechanic as the landing curtain), staggered per strip.
 * Both phases are plain CSS @keyframes so they stay reliable even if the
 * tab is treated as backgrounded (unlike rAF-driven Framer Motion).
 */
const NavTransitionOverlay = () => {
  const [playKey, setPlayKey] = useState<number | null>(null);

  const wipeCompleteMs = (STRIP_COUNT - 1) * STAGGER_MS + WIPE_MS;

  useEffect(() => {
    const handler = () => {
      // Slowed to match the full staggered wipe-up duration so it doesn't cut off early.
      playWhoosh(wipeCompleteMs / 1000);
      setPlayKey((k) => (k ?? 0) + 1);
    };
    window.addEventListener('portfolio:navtransition', handler);
    return () => window.removeEventListener('portfolio:navtransition', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (playKey === null) return null;

  return (
    <div key={playKey} className="fixed inset-0 z-[9999] flex pointer-events-none">
      {Array.from({ length: STRIP_COUNT }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: STRIP_COLOR,
            animation: `wipeUp ${WIPE_MS}ms cubic-bezier(0.76,0,0.24,1) ${(STRIP_COUNT - 1 - i) * STAGGER_MS}ms both, curtainFall ${FALL_MS}ms cubic-bezier(0.76,0,0.24,1) ${wipeCompleteMs + i * STAGGER_MS}ms forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default NavTransitionOverlay;

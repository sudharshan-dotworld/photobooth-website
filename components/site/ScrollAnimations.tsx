'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {animate, inView, type AnimationPlaybackControls} from 'motion';
import {useReducedMotion} from 'motion/react';

export default function ScrollAnimations() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion !== false) return;

    const running = new Set<AnimationPlaybackControls>();
    const targets = document.querySelectorAll<HTMLElement>([
      'main .section-heading',
      'main .booth-types-heading',
      'main .booth-breakout-content',
      'main .booth-breakout-render',
      'main .trial-copy',
      'main .trial-product',
      'main .foreground-copy',
      'main .scrapbook-showcase-art',
      'main .image-feature-card',
      'main .price-card',
      'main .setup-benefit',
      'main .audience-grid > a',
      'main .contact-copy',
      'main .contact-form',
    ].join(','));

    const stops = Array.from(targets).map(target => {
      if (target.getBoundingClientRect().top < innerHeight - 60) return () => {};
      const isVisual = target.matches('.booth-breakout-render, .trial-product, .scrapbook-showcase-art');
      const isCard = target.matches('.image-feature-card, .price-card, .setup-benefit, .audience-grid > a');
      const siblings = target.parentElement ? Array.from(target.parentElement.children) : [];
      const delay = isCard ? (siblings.indexOf(target) % 3) * 0.09 : 0;

      const stop = inView(target, () => {
        const fromRight = !target.closest('.booth-breakout-reverse');
        const animation = isVisual
          ? animate(target, {
              opacity: [0, 1],
              translate: [fromRight ? '45px 0' : '-45px 0', '0px 0px'],
              scale: [0.95, 1],
            }, {type: 'spring', stiffness: 105, damping: 23})
          : animate(target, {
              opacity: [0, 1],
              translate: [isCard ? '0px 28px' : '0px 20px', '0px 0px'],
              clipPath: isCard
                ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
                : ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
            }, {duration: isCard ? 0.55 : 0.75, delay, ease: [0.22, 1, 0.36, 1]});
        running.add(animation);
        void animation.then(() => running.delete(animation));
      }, {margin: '0px 0px -60px 0px'});
      return stop;
    });

    return () => {
      stops.forEach(stop => stop());
      running.forEach(animation => animation.stop());
    };
  }, [pathname, reducedMotion]);

  return null;
}

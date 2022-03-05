import { useEffect } from 'react';
import { gsap } from 'gsap';

/*
   useBounceOut({
    isSHowElement: showSubBtn,
    elementRef: subBtnRef,
    showEl: {
      from: -40,
      to: 0,
      fromDuration: 0.3,
      toDuration: 1,
    },
    hideEl: {
      from: -40,
      to: '70%',
      fromDuration: 0.3,
      toDuration: 1,
    },
  });

*/

const useBounceOut = ({
  isSHowElement, elementRef, showEl, hideEl,
}) => {
  const tl = gsap.timeline();

  useEffect(() => {
    if (isSHowElement) {
      tl.to(elementRef.current, {
        y: showEl.from || -40,
        duration: showEl.fromDuration || 0.3,
        ease: 'ease.out',
      }).to(elementRef.current, {
        y: showEl.to || 0,
        duration: showEl.toDuration || 1,
        ease: 'bounce.out',
      });
    }

    if (!isSHowElement) {
      tl.to(elementRef.current, {
        y: hideEl.from || -40,
        duration: hideEl.fromDuration || 0.3,
        ease: 'ease.in',
      }).to(elementRef.current, {
        y: hideEl.to || 0,
        duration: hideEl.toDuration || 1,
        ease: 'bounce.out',
      });
    }
  }, [isSHowElement, elementRef, tl, showEl, hideEl]);
};

export default useBounceOut;

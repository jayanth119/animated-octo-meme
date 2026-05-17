import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
  trigger?: string | Element;
  start?: string;
  style?: React.CSSProperties;
}

const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = "", 
  type = 'chars', 
  delay = 0,
  trigger,
  start = "top 85%",
  style
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: type });
    const elements = type === 'chars' ? split.chars : type === 'words' ? split.words : split.lines;

    gsap.from(elements, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
      delay: delay,
      scrollTrigger: trigger ? {
        trigger: trigger,
        start: start,
        toggleActions: "play none none none"
      } : {
        trigger: textRef.current,
        start: start,
        toggleActions: "play none none none"
      }
    });

    return () => {
      split.revert();
    };
  }, { scope: textRef });

  return (
    <div ref={textRef} className={`overflow-hidden ${className}`} style={style}>
      {text}
    </div>
  );
};

export default TextReveal;

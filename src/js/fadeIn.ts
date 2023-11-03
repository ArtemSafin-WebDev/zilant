import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function fadeIn() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-fade-in")
  );
  let mm = gsap.matchMedia();

  elements.forEach((element) => {
    mm.add("(min-width: 641px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top+=80 bottom",
        },
      });

      tl.fromTo(
        element,
        {
          autoAlpha: 0,
          y: 60,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    });
    mm.add("(max-width: 640px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top+=30 bottom",
        },
      });

      tl.fromTo(
        element,
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        }
      );
    });
  });
}

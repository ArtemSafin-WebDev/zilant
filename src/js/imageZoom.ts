import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function imageZoom() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-image-zoom")
  );

  elements.forEach((element) => {
    const image = element.querySelector<HTMLImageElement>(
      ".js-image-zoom-picture"
    );
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        scrub: true,
        end: "bottom top",
      },
    });

    tl.fromTo(
      image,
      {
        scale: 1.1,
      },
      {
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  });
}

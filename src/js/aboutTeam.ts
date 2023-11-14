import Swiper from "swiper";
import "swiper/css";
import { SwiperOptions } from "swiper/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function aboutTeam() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-about-team-slider")
  );

  const mql = window.matchMedia("(max-width: 640px)");

  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    const options: SwiperOptions = {
      slidesPerView: "auto",
      speed: 600,
    };

    let instance: Swiper | null = null;

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        if (instance) instance.destroy();
        instance = new Swiper(container, options);
      } else {
        if (instance) instance.destroy();
        instance = null;
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 641px)", () => {
      const teamCards = Array.from(
        element.querySelectorAll<HTMLElement>(".about-team__slider-card")
      );

      teamCards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top+=50px bottom",
          onEnter: () => card.classList.add("revealed"),
        });
      });
    });
  });
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function projects() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".projects")
  );

  elements.forEach((element) => {
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".projects__card")
    );

    cards.forEach((card) => {
      document.addEventListener("loaderhidden", () => {
        ScrollTrigger.create({
          trigger: card,
          start: "top+=50px bottom",
          onEnter: () => card.classList.add("revealed"),
        });
      });
    });
  });
}

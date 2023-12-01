import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function imageReveal() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-image-reveal, .image-with-text")
  );

  elements.forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: "top+=50px bottom",
      onEnter: () => element.classList.add("revealed"),
    });
  });
}

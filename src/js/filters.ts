import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function filters() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-projects-filters")
  );

  elements.forEach((element) => {
    const SPEED = 0.6;

    const openAccordion = (element: HTMLElement | null | undefined) => {
      if (!element) return;
      gsap.to(element, {
        height: "auto",
        duration: SPEED,
        onComplete: () => ScrollTrigger.refresh(),
      });
    };
    const closeAccordion = (element: HTMLElement | null | undefined) => {
      if (!element) return;
      gsap.to(element, {
        height: 0,
        duration: SPEED,
        onComplete: () => ScrollTrigger.refresh(),
      });
    };

    let active = false;
    const btn = element.querySelector<HTMLButtonElement>(
      ".projects__filter-toggle"
    );
    const content = element.querySelector<HTMLElement>(
      ".projects__filters-dropdown"
    );

    btn?.addEventListener("click", (event) => {
      event.preventDefault();
      if (!active) {
        openAccordion(content);
        element.classList.add("open");
        active = true;
      } else {
        closeAccordion(content);
        element.classList.remove("open");
        active = false;
      }
    });

    // if (window.matchMedia("(max-width: 640px)").matches) {
    //   openAccordion(content);
    //   element.classList.add("open");
    //   active = true;
    // }
  });
}

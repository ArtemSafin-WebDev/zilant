import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function projectCategories() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".project-category")
  );

  elements.forEach((element) => {
    const listItems = Array.from(
      element.querySelectorAll(".project-category__list-item")
    );
    listItems.forEach((item) => {
      const card = item.querySelector<HTMLLinkElement>(
        ".project-category__card"
      );

      item.addEventListener("mouseenter", () => {
        if (window.matchMedia("(max-width: 640px)").matches) return;
        gsap.to([".project-category__heading-text", ".production"], {
          autoAlpha: 0,
          duration: 0.4,
        });
        card?.classList.add("active");
        Array.from(
          document.querySelectorAll<HTMLElement>(".project-category__list-item")
        )
          .filter((otherItem) => otherItem !== item)
          .forEach((item) => item.classList.add("hidden"));
      });

      item.addEventListener("mouseleave", () => {
        if (window.matchMedia("(max-width: 640px)").matches) return;
        gsap.to([".project-category__heading-text", ".production", ,], {
          autoAlpha: 1,
          duration: 0.4,
          clearProps: "all",
        });
        card?.classList.remove("active");
        Array.from(
          document.querySelectorAll<HTMLElement>(".project-category__list-item")
        )
          .filter((otherItem) => otherItem !== item)
          .forEach((item) => item.classList.remove("hidden"));
      });

      ScrollTrigger.create({
        trigger: item,
        start: "top+=50px bottom",
        onEnter: () => item.classList.add("revealed"),
      });
    });
  });
}

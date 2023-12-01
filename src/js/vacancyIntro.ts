import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function vacancyIntro() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".vacancy-intro")
  );

  elements.forEach((element) => {
    let instance: Swiper | null = null;
    const container = element.querySelector<HTMLElement>(".swiper");
    const slides = Array.from(
      element.querySelectorAll<HTMLElement>(".swiper-slide")
    );
    const wrapper = element.querySelector<HTMLElement>(".swiper-wrapper");

    const previews = Array.from(
      element.querySelectorAll<HTMLElement>(".vacancy-intro__preview")
    );

    for (let i = 0; i < 3; i++) {
      slides.forEach((slide) => wrapper?.appendChild(slide.cloneNode(true)));
    }

    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".vacancy-intro__slider-card")
    );

    if (container) {
      instance = new Swiper(container, {
        modules: [Autoplay],
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        speed: 1400,
        allowTouchMove: true,
        autoplay: {
          delay: 2000,
          // pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
      });
    }

    const setPreview = (card: HTMLElement) => {
      const cardId = card.getAttribute("data-id");
      if (cardId) {
        const matchingPreview = previews.find(
          (preview) => preview.getAttribute("data-id") === cardId
        );
        previews.forEach((preview) => preview.classList.remove("active"));
        matchingPreview?.classList.add("active");

        previews.forEach((preview) => {
          const video = preview.querySelector("video");
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        });
        const video = matchingPreview?.querySelector("video");
        if (video) {
          video.play();
        }
      }
    };

    const closePreviews = () => {
      previews.forEach((preview) => preview.classList.remove("active"));
    };

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("active");
        element.classList.add("card-selected");
        if (instance) instance.autoplay.stop();

        setPreview(card);
      });
      card.addEventListener("click", (event) => {
        event.preventDefault();
        card.classList.add("active");
        element.classList.add("card-selected");
        if (instance) instance.autoplay.stop();

        setPreview(card);
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("active");
        element.classList.remove("card-selected");
        if (instance) instance.autoplay.start();

        closePreviews();
      });
    });

    element.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (
        target.matches(".vacancy-intro__slider-card") ||
        target.closest(".vacancy-intro__slider-card")
      ) {
        return;
      }
      cards.forEach((card) => card.classList.remove("active"));
      element.classList.remove("card-selected");
      closePreviews();
      if (instance) instance.autoplay.start();
    });
  });
}

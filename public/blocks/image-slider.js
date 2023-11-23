import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const elements = Array.from(document.querySelectorAll(".js-image-slider"));

elements.forEach((element) => {
  const container = element.querySelector(".swiper");
  if (!container) return;

  new Swiper(container, {
    slidesPerView: "auto",
    speed: 600,
    longSwipesRatio: 0.2,
    navigation: {
      prevEl: element.querySelector(".image-slider__arrow--prev"),
      nextEl: element.querySelector(".image-slider__arrow--next"),
    },
  });
});

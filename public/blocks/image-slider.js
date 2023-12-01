const elements = Array.from(document.querySelectorAll(".js-image-slider"));

function init(element) {
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
}

elements.forEach((element) => init(element));

function initializeACFSlider($block) {
  console.log("Native slider element", $block[0]);
  init($block[0]);
}

//@ts-ignore
if (window.acf) {
  //@ts-ignore
  window.acf.addAction(
    "render_block_preview/type=image-slider",
    initializeACFSlider
  );
}

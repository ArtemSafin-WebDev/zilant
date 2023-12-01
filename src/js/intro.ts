import IntroSlider from "./classes/IntroSlider";

export default function intro() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));

  elements.forEach((element) => {
    const slider = element.querySelector<HTMLElement>(".intro__slider");
    if (!slider) return;
    const instance = new IntroSlider(slider, {
      slideSelector: ".intro__slider-slide",

      transitionDuration: 1,
      autoplayDelay: 10,
    });
    instance.autoplay();
  });
}

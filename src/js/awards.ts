import gsap from "gsap";

export default function awards() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".awards")
  );

  elements.forEach((element) => {
    const sliders = Array.from(
      element.querySelectorAll<HTMLElement>(".awards__logos-slider")
    );

    sliders.forEach((slider, sliderIndex) => {
      const slides = Array.from(
        slider.querySelectorAll<HTMLElement>(".awards__logos-item-slide")
      );
      let activeSlide = 0;
      let prevSlide = 0;

      const nextSlide = (currentIndex: number, prevIndex: number) => {
        const tl = gsap.timeline({
          onComplete: () => {
            prevSlide = currentIndex;
            if (currentIndex < slides.length - 1) {
              activeSlide = currentIndex + 1;
            } else {
              activeSlide = 0;
            }

            gsap.delayedCall(2, () => {
              nextSlide(activeSlide, prevSlide);
            });
          },
        });

        if (activeSlide !== prevSlide) {
          const previousElement = slides[prevIndex];

          // console.log("PREV ELEMENT", previousElement);
          tl.to(previousElement, {
            autoAlpha: 0,
            yPercent: -100,
          });
        }

        const nextElement = slides[currentIndex];

        // console.log("NEXT ELEMENT", nextElement, currentIndex);
        tl.fromTo(
          nextElement,
          {
            autoAlpha: 0,
            yPercent: 100,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5,
          },
          0
        );
      };

      gsap.delayedCall(sliderIndex * 0.5, () => {
        nextSlide(activeSlide, prevSlide);
      });
    });
  });
}

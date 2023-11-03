import gsap from "gsap";

export default function loader() {
  const loader = document.querySelector<HTMLElement>(".loader");
  if (!loader) return;
  const loaderInner = document.querySelector(".loader__inner");

  gsap.delayedCall(1, () => {
    const tl = gsap.timeline({});

    tl.to(loaderInner, {
      y: -50,
      autoAlpha: 0,
      duration: 0.4,
    });

    tl.to(
      loader,
      {
        autoAlpha: 0,
        duration: 0.4,
      },
      0
    ).add(() => {
      const event = new CustomEvent("loaderhidden");
      document.dispatchEvent(event);
    });

    const pageHeader = document.querySelector<HTMLElement>(".page-header");
    const introText = document.querySelector<HTMLElement>(".intro__text");
    const introSlider = document.querySelector<HTMLElement>(".intro__slider");

    if (pageHeader && introText && introSlider) {
      tl.from(
        pageHeader,
        {
          y: 50,
          autoAlpha: 0,
          duration: 1,
          clearProps: "all",
          ease: "power3.out",
        },
        ">0.2"
      );
      if (introText) {
        tl.from(
          introText,
          {
            y: 50,
            autoAlpha: 0,
            duration: 1,

            ease: "power3.out",
          },
          "<+=0.3"
        );
      }
      if (introSlider) {
        tl.from(
          introSlider,
          {
            autoAlpha: 0,
            duration: 1,

            ease: "power3.out",
          },
          "<+=0.3"
        );
      }
    }

    const projectsHeading =
      document.querySelector<HTMLElement>(".projects__heading");
    const projectsFilters =
      document.querySelector<HTMLElement>(".projects__filters");
    if (projectsHeading && pageHeader) {
      tl.from(
        pageHeader,
        {
          y: 50,
          autoAlpha: 0,
          duration: 1,
          clearProps: "all",
          ease: "power3.out",
        },
        ">0.2"
      );
      tl.from(
        projectsHeading,
        {
          y: 50,
          autoAlpha: 0,
          duration: 1,

          ease: "power3.out",
        },
        "<+=0.15"
      );
      tl.from(
        projectsFilters,
        {
          autoAlpha: 0,
          duration: 1,

          ease: "power3.out",
        },
        "<"
      );
    }
  });
}

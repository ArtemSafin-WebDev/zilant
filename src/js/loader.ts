import gsap from "gsap";

export default function loader() {
  const loader = document.querySelector<HTMLElement>(".loader");

  const loaderInner = document.querySelector(".loader__inner");
  const tl = gsap.timeline({});

  const loaderPlayed = window.sessionStorage.getItem("loader_played") === "Y";
  if (loader && !loaderPlayed) {
    tl.to(
      loaderInner,
      {
        y: -50,
        autoAlpha: 0,
        duration: 0.4,
      },
      1
    );

    tl.to(
      loader,
      {
        autoAlpha: 0,
        duration: 0.4,
      },
      "<"
    ).add(() => {
      const event = new CustomEvent("loaderhidden");
      window.sessionStorage.setItem("loader_played", "Y");
      document.dispatchEvent(event);
    });
  }

  const pageHeader = document.querySelector<HTMLElement>(".page-header");
  const introText = document.querySelector<HTMLElement>(".intro__text");
  const introSlider = document.querySelector<HTMLElement>(".intro__slider");

  if (pageHeader && introText && introSlider) {
    // tl.from(
    //   pageHeader,
    //   {
    //     y: 50,
    //     autoAlpha: 0,
    //     duration: 1,
    //     clearProps: "all",
    //     ease: "power3.out",
    //   },
    //   ">0.2"
    // );
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
    // tl.from(
    //   pageHeader,
    //   {
    //     y: 50,
    //     autoAlpha: 0,
    //     duration: 1,
    //     clearProps: "all",
    //     ease: "power3.out",
    //   },
    //   ">0.2"
    // );
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

  const aboutIntroHeading = document.querySelector<HTMLElement>(
    ".about-intro__heading"
  );
  const aboutIntroImageWrapper = document.querySelector<HTMLElement>(
    ".about-intro__image-wrapper"
  );

  if (pageHeader && aboutIntroHeading && aboutIntroImageWrapper) {
    // tl.from(
    //   pageHeader,
    //   {
    //     y: 50,
    //     autoAlpha: 0,
    //     duration: 1,
    //     clearProps: "all",
    //     ease: "power3.out",
    //   },
    //   ">0.2"
    // );
    tl.from(
      aboutIntroHeading,
      {
        y: 50,
        autoAlpha: 0,
        duration: 1,

        ease: "power3.out",
      },
      "<+=0.15"
    );
    tl.from(
      aboutIntroImageWrapper,
      {
        autoAlpha: 0,
        duration: 1,

        ease: "power3.out",
      },
      "<"
    );
  }
}

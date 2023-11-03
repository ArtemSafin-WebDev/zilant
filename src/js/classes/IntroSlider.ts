import gsap from "gsap";
import Hammer from "hammerjs";

import { DrawSVGPlugin } from "../vendor/gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

interface IntroSliderOptions {
  slideSelector: string;
  transitionDuration?: number;
  autoplayDelay?: number;
}

export default class IntroSlider {
  public slides: HTMLElement[];
  public activeIndex: number = 0;
  private transitionDuration = 0.5;
  private autoplayDelay = 3;
  private animating: boolean = false;
  private slidesCount: number;
  public autoplayPaused: boolean = false;
  private autoplayTimer: ReturnType<typeof gsap.delayedCall> | null = null;
  private paginationElement: HTMLElement | null = null;
  private hammerInstance: HammerManager | null = null;
  private paginationBullets: HTMLElement[] = [];

  constructor(
    protected element: HTMLElement,
    private options: IntroSliderOptions
  ) {
    this.slides = Array.from(
      element.querySelectorAll(this.options.slideSelector)
    );
    if (this.options.transitionDuration)
      this.transitionDuration = this.options.transitionDuration;
    if (this.options.autoplayDelay)
      this.autoplayDelay = this.options.autoplayDelay;
    this.slidesCount = this.slides.length;
    this.paginationElement = this.element.querySelector(
      ".intro__slider-pagination"
    );

    if (this.paginationElement) {
      this.paginationBullets = Array.from(
        this.paginationElement?.querySelectorAll<HTMLElement>(
          ".intro__slider-pagination-btn"
        )
      );
    }

    this.initialSetup();
  }

  private initialSetup() {
    this.slides.forEach((slide) => {
      gsap.set(slide, {
        zIndex: 1,
      });
    });
    const currentSlide = this.slides[this.activeIndex];

    gsap.set(currentSlide, {
      zIndex: 4,
    });

    this.hammerInstance = new Hammer(this.element);
    this.hammerInstance
      .get("swipe")
      .set({ direction: Hammer.DIRECTION_HORIZONTAL });

    this.hammerInstance.on("swipeleft", async () => {
      this.changeSlideTo(this.calculateNextIndex());
    });
    this.hammerInstance.on("swiperight", async () => {
      this.changeSlideTo(this.calculatePreviousIndex());
    });

    this.paginationBullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", (event) => {
        event.preventDefault();
        this.changeSlideTo(bulletIndex);
      });
    });
  }

  public async changeSlideTo(index: number) {
    if (this.animating) return;
    const prevSlide = this.slides[this.activeIndex];
    const nextSlide = this.slides[index];

    this.slides.forEach((slide) => {
      if (slide !== nextSlide)
        gsap.set(slide, {
          zIndex: 1,
        });
    });

    gsap.set(prevSlide, {
      zIndex: 3,
    });
    gsap.set(nextSlide, {
      zIndex: 4,
    });

    this.animating = true;

    console.log("Animating to slide", index + 1);

    this.activeIndex = index;

    if (!this.autoplayPaused) {
      this.updatePagination(this.activeIndex);
      this.autoplayTimer?.kill();
      this.autoplayTimer = gsap.delayedCall(this.autoplayDelay, async () => {
        this.changeSlideTo(this.calculateNextIndex());
      });
    }

    const nextSlideImage = nextSlide.querySelector<HTMLElement>(
      ".intro__slider-card-bg-zoom-wrapper"
    );

    const tl = gsap.timeline({
      onComplete: () => {
        this.animating = false;
      },
    });

    return tl
      .fromTo(
        nextSlide,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: this.transitionDuration,
          ease: "power3.out",
        }
      )
      .fromTo(
        nextSlideImage,
        {
          scale: 1.2,
        },
        {
          scale: 1,
          duration: this.transitionDuration,
          ease: "power3.out",
        },
        0
      );
  }

  public pauseAutoplay() {
    this.autoplayPaused = true;
    this.autoplayTimer?.kill();
    this.autoplayTimer = null;
    this.paginationBullets.forEach((bullet) => {
      const progress = bullet.querySelector<SVGCircleElement>(
        "circle:nth-child(2)"
      );
      gsap.killTweensOf(progress);
      gsap.set(progress, {
        drawSVG: "0% 0%",
      });
    });
  }

  private updatePagination = (index: number) => {
    this.paginationBullets.forEach((bullet, bulletIndex) => {
      const progress = bullet.querySelector<SVGCircleElement>(
        "circle:nth-child(2)"
      );
      gsap.killTweensOf(progress);

      if (bulletIndex === index) {
        bullet.classList.add("active");
        gsap.fromTo(
          progress,
          { drawSVG: "0% 0%" },
          {
            duration: this.autoplayDelay,
            drawSVG: "0% 100%",
            ease: "none",
          }
        );
      } else {
        bullet.classList.remove("active");
        gsap.set(progress, {
          drawSVG: "0% 0%",
        });
      }
    });
  };

  public resumeAutoplay() {
    this.autoplayPaused = false;
    this.autoplay();

    console.log("Autoplay resumed");
  }

  private calculateNextIndex(): number {
    if (this.activeIndex < this.slidesCount - 1) {
      return this.activeIndex + 1;
    } else {
      return 0;
    }
  }

  private calculatePreviousIndex(): number {
    if (this.activeIndex > 0) {
      return this.activeIndex - 1;
    } else {
      return this.slidesCount - 1;
    }
  }

  public autoplay() {
    this.updatePagination(this.activeIndex);
    this.autoplayTimer = gsap.delayedCall(this.autoplayDelay, async () => {
      if (this.autoplayPaused) return;
      this.changeSlideTo(this.calculateNextIndex());
    });
  }
}

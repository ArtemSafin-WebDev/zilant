import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

export default function projects() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".projects")
  );

  elements.forEach((element) => {
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".projects__card")
    );

    console.log("Cards", cards);

    cards.forEach((card) => {
      if (window.sessionStorage.getItem("loader_played") === "Y") {
        ScrollTrigger.create({
          trigger: card,
          start: "top+=50px bottom",
          onEnter: () => card.classList.add("revealed"),
        });
      } else {
        document.addEventListener("loaderhidden", () => {
          ScrollTrigger.create({
            trigger: card,
            start: "top+=50px bottom",
            onEnter: () => card.classList.add("revealed"),
          });
        });
      }
    });

    const form = element.querySelector("form");
    const list = element.querySelector(".projects__list");
    const radioBtns = Array.from(
      element.querySelectorAll<HTMLInputElement>(
        ".projects__filters-checkbox-input"
      )
    );

    const typeBtns = Array.from(
      element.querySelectorAll<HTMLInputElement>(".projects__types-radio-input")
    );

    if (!form) return;
    const controller = new AbortController();

    const sendData = async () => {
      let url = form.action;

      const params = new URLSearchParams(new FormData(form) as any);

      console.log("URL ACTION", url);

      console.log("Params", params);
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
          params,
        });

        const data = response.data;
        const parser = new DOMParser();
        const nextPageHtml = parser.parseFromString(data, "text/html");
        const nextResults = Array.from(
          nextPageHtml.querySelectorAll<HTMLLIElement>(".projects__list-item")
        );

        window.history.replaceState({}, "", `${location.pathname}?${params}`);

        console.log("Data", data);

        if (nextResults && list) {
          gsap.to(".projects__card", {
            autoAlpha: 0,
            duration: 0.4,
            onComplete: () => {
              list.innerHTML = "";
              nextResults.forEach((item) => {
                const card = item.querySelector<HTMLElement>(".projects__card");
                list.appendChild(item);

                setTimeout(() => {
                  card?.classList.add("revealed");
                  ScrollTrigger.refresh();
                }, 200);
              });
            },
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (!form) return;
    radioBtns.forEach((btn) => {
      btn.addEventListener("change", () => {
        sendData();
      });
    });
    typeBtns.forEach((btn) => {
      btn.addEventListener("change", () => {
        sendData();
      });
    });
  });
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Validator from "./classes/Validator";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

export default function quizForm() {
  const forms = Array.from(
    document.querySelectorAll<HTMLFormElement>(".js-quiz-form")
  );

  forms.forEach((form) => {
    const content = form.querySelector<HTMLElement>(
      ".quiz__form-main-content"
    )!;
    const success = form.querySelector<HTMLElement>(".quiz__form-success");
    const error = form.querySelector<HTMLElement>(".quiz__form-error");
    const formValidator = new Validator(form);
    const resetBtn = form.querySelector<HTMLButtonElement>(
      ".quiz__form-error-btn"
    );

    const setSuccess = () => {
      content?.classList.add("hidden");
      success?.classList.add("active");
      error?.classList.remove("active");
      ScrollTrigger.refresh();
    };
    const setError = () => {
      content?.classList.add("hidden");
      success?.classList.remove("active");
      error?.classList.add("active");
      ScrollTrigger.refresh();
    };
    const setDefault = () => {
      content?.classList.remove("hidden");
      success?.classList.remove("active");
      error?.classList.remove("active");
      ScrollTrigger.refresh();
    };

    const controller = new AbortController();

    const handleFormSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      if (!formValidator || !form) return;
      formValidator.validate();

      if (formValidator.valid) {
        const formData = new FormData(form);

        axios
          .post(form.action, formData, {
            signal: controller.signal,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.status && res.data.status !== "mail_sent")
              throw new Error();
            setSuccess();

            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
            setError();
          });
      }
    };
    form.addEventListener("submit", handleFormSubmit);

    resetBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      setDefault();
    });
  });
}

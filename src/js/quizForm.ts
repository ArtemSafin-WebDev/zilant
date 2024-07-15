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

    const modalClose = form.querySelector<HTMLButtonElement>(
      ".quiz__form-success-popup-close"
    );

    const radios = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        'input[type="radio"][required=""]'
      )
    );

    const validateRadios = () => {
      const radiosChecked = radios.find((radio) => radio.checked);
      return !!radiosChecked;
    };

    const submitBtn = form.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );

    let sending = false;

    const setSuccess = () => {
      // content?.classList.add("hidden");
      // success?.classList.add("active");
      // error?.classList.remove("active");

      const modal = document.querySelector<HTMLElement>(
        ".quiz__form-success-popup"
      );
      modal?.classList.add("active");
      document.body.classList.add("modal-open");
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

      const radiosValid = validateRadios();

      if (!radiosValid) {
        form.classList.add("radios-not-valid");
      } else {
        form.classList.remove("radios-not-valid");
      }

      if (formValidator.valid && !sending) {
        const formData = new FormData(form);

        sending = true;
        if (submitBtn) submitBtn.disabled = true;

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
          })
          .finally(() => {
            sending = false;
            if (submitBtn) submitBtn.disabled = false;
          });
      }
    };

    radios.forEach((radio) =>
      radio.addEventListener("change", () => {
        const radiosValid = validateRadios();

        if (!radiosValid) {
          form.classList.add("radios-not-valid");
        } else {
          form.classList.remove("radios-not-valid");
        }
      })
    );
    form.addEventListener("submit", handleFormSubmit);

    resetBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      setDefault();
    });

    modalClose?.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.querySelector<HTMLElement>(
        ".quiz__form-success-popup"
      );
      modal?.classList.remove("active");
      document.body.classList.remove("modal-open");
    });
  });
}

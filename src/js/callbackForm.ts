import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Validator from "./classes/Validator";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

export default function callbackForm() {
  const forms = Array.from(
    document.querySelectorAll<HTMLFormElement>(".js-callback-form")
  );

  forms.forEach((form) => {
    const content = form.querySelector<HTMLElement>(".callback__form-content")!;
    const success = form.querySelector<HTMLElement>(".callback__form-success");
    const error = form.querySelector<HTMLElement>(".callback__form-error");
    const formValidator = new Validator(form);
    const resetBtn = form.querySelector<HTMLButtonElement>(
      ".callback__form-error-btn"
    );

    const submitBtn = form.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );

    let sending = false;

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
    form.addEventListener("submit", handleFormSubmit);

    resetBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      setDefault();
    });
  });
}

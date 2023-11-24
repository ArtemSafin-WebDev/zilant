export default function specSelect() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".quiz__form-block-specialization")
  );

  elements.forEach((element) => {
    const inputs = Array.from(
      element.querySelectorAll<HTMLInputElement>(
        ".quiz__form-block-specialization-checkbox-input"
      )
    );
    const selectedWrapper = element.querySelector<HTMLElement>(
      ".quiz__form-block-specialization-selected"
    );

    const update = () => {
      const hasCheckedInputs = inputs.some((input) => input.checked);
      if (hasCheckedInputs) {
        element.classList.add("has-checked-inputs");
      } else {
        element.classList.remove("has-checked-inputs");
      }

      if (selectedWrapper) {
        selectedWrapper.innerHTML = "";
      }

      selectedWrapper?.append(
        ...inputs
          .filter((input) => input.checked)
          .map((item) => {
            const name = item.parentElement?.querySelector<HTMLSpanElement>(
              ".quiz__form-block-specialization-checkbox-text"
            )?.textContent;
            const value = item.value;
            const btn = document.createElement("button");
            btn.className = "quiz__form-block-specialization-selected-item";
            btn.setAttribute("data-value", value);
            btn.innerHTML = `${name} 
              <svg width="14" height="14" aria-hidden="true">
                <use xlink:href="#clear"></use>
              </svg>`;
            return btn;
          })
      );
    };

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        update();
      });
    });

    element.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (
        target.matches(".quiz__form-block-specialization-selected-item") ||
        target.closest(".quiz__form-block-specialization-selected-item")
      ) {
        const btn = target.matches(
          ".quiz__form-block-specialization-selected-item"
        )
          ? (target as HTMLButtonElement)
          : target.closest<HTMLButtonElement>(
              ".quiz__form-block-specialization-selected-item"
            );
        if (!btn) return;

        const matchingInput = inputs.find(
          (input) => input.value === btn.getAttribute("data-value")
        );
        if (matchingInput) {
          matchingInput.checked = false;
          btn.remove();
          matchingInput.dispatchEvent(new Event("change"));
        }
      }
    });
  });
}

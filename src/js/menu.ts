export default function menu() {
  const openBtn = document.querySelector<HTMLButtonElement>(".js-menu-open");
  const closeBtn = document.querySelector<HTMLElement>(".js-menu-close");

  console.log(openBtn, closeBtn);
  const openMenu = () => {
    document.body.classList.add("menu-open");
  };
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
  };

  openBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    openMenu();
  });
  closeBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

import "virtual:svg-icons-register";
import "../scss/style.scss";
import awards from "./awards";
import projectCategories from "./projectsCategories";
import intro from "./intro";
import menu from "./menu";
import fadeIn from "./fadeIn";
import imageZoom from "./imageZoom";
import loader from "./loader";
import filters from "./filters";
import projects from "./projects";
import fileUpload from "./fileUpload";
import callbackForm from "./callbackForm";
import aboutTeam from "./aboutTeam";
import vacancyIntro from "./vacancyIntro";
import accordions from "./accordions";
import specSelect from "./specSelect";
import imageReveal from "./imageReveal";
import fancybox from "./fancybox";
import quizForm from "./quizForm";

document.addEventListener("DOMContentLoaded", () => {
  menu();
  intro();
  awards();
  projectCategories();
  fadeIn();
  imageZoom();
  filters();
  projects();
  loader();
  fileUpload();
  callbackForm();
  aboutTeam();
  vacancyIntro();
  accordions();
  specSelect();
  imageReveal();
  fancybox();
  quizForm();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

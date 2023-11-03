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
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

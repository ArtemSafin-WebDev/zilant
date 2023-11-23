import home from "./pages-data/home";
import contactUs from "./pages-data/contact-us";
import callback from "./pages-data/callback";
import projectDetail from "./pages-data/project-detail";

const pagesConfig = {
  ...home,
  ...contactUs,
  ...callback,
  ...projectDetail,
};

export default pagesConfig;

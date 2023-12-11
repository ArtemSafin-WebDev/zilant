import home from "./pages-data/home";
import contactUs from "./pages-data/contact-us";
import callback from "./pages-data/callback";
import projectDetail from "./pages-data/project-detail";
import vacancy from "./pages-data/vacancy";
import subject from "./pages-data/subject";
import notFound from "./pages-data/not-found";

const pagesConfig = {
  ...home,
  ...contactUs,
  ...callback,
  ...projectDetail,
  ...vacancy,
  ...subject,
  ...notFound,
};

export default pagesConfig;

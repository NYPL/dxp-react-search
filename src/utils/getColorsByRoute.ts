import { useRouter } from "next/router";

interface ColorsByRoute {
  heroBackgroundColor: string;
  heroColor: string;
}

function getColorsByRoute(): ColorsByRoute {
  const router = useRouter();
  let route = router.pathname;

  if (route === "/[...slug]") {
    route = router.asPath;
  }

  switch (route) {
    case "/give":
      return { heroBackgroundColor: "brand.primary", heroColor: "ui.white" };
    default:
      return { heroBackgroundColor: "", heroColor: "" };
  }
}

export default getColorsByRoute;

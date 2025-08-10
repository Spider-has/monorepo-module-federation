import { Loading } from "@/app/App";
import { lazy, Suspense } from "react";

const AboutPageLazy = lazy(() => import("./About"));

export const AboutPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AboutPageLazy />
    </Suspense>
  );
};

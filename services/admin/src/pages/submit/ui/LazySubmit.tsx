import { Loading } from "@/app/App";
import { lazy, Suspense } from "react";

export const SubmitPageLazy = lazy(() => import("./Submit"));

export const SubmitPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SubmitPageLazy />
    </Suspense>
  );
};

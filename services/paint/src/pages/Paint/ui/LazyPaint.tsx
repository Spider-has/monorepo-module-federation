import { Loading } from "@packages/shared";
import { lazy, Suspense } from "react";

const LazyPaintPage = lazy(() => import("./Paint"));

export function PaintPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyPaintPage />
    </Suspense>
  );
}

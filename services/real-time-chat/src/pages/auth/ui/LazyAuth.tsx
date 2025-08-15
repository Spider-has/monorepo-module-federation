import { Loading } from "@packages/shared";
import { lazy, Suspense } from "react";

const LazyAuth = lazy(() => import("./Auth"));

export function AuthPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyAuth />
    </Suspense>
  );
}

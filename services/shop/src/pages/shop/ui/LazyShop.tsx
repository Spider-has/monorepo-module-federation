import { Loading } from "@/app/App";
import { lazy, Suspense } from "react";

const ShopPageComponent = lazy(() => import("./Shop"));

export const ShopPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ShopPageComponent />
    </Suspense>
  );
};

export const ShopPage2 = () => {
  return (
    <Suspense fallback={<Loading />}>
      <h1 style={{ color: "red" }}>color red</h1>
      <div style={{ color: "red" }}>color red</div>
    </Suspense>
  );
};

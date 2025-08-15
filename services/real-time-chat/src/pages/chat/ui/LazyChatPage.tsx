import { Loading } from "@packages/shared";
import { lazy, Suspense } from "react";

const LazyChat = lazy(() => import("./ChatPage"));

export function ChatPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyChat />
    </Suspense>
  );
}

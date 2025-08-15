import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { PaintPage } from "@/pages";

function RoomComponent() {
  return <div />;
}

function loader() {
  return redirect(`/paint/${crypto.randomUUID()}`);
}

const routes: RouteObject[] = [
  {
    path: "/paint",
    Component: PaintPage,
    children: [
      {
        path: ":id",
        Component: RoomComponent,
      },
      {
        index: true,
        loader,
      },
    ],
  },
  {
    path: "*",
    loader,
  },
];

export const router = createBrowserRouter(routes);

export default routes;

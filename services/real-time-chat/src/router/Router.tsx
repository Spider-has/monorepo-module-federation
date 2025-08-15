import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { AuthPage, ChatPage } from "@/pages";
import { NavBar } from "@/widgets";
import { accessTokenKey } from "@/features/GoogleAuth/storage/tokenStorage";

function loader() {
  return redirect("/real-time-chat");
}

// Имитация проверки аутентификации
const checkAuth = () => {
  const token = localStorage.getItem(accessTokenKey);
  return token ? { isAuthenticated: true } : { isAuthenticated: false };
};

const authedUserLoader = () => {
  const { isAuthenticated } = checkAuth();
  if (!isAuthenticated) {
    return redirect("/real-time-chat");
  }
  return redirect("/real-time-chat/chat");
};

const indexAuthUserLoader = () => {
  const { isAuthenticated } = checkAuth();
  if (!isAuthenticated) {
    return null;
  }
  return redirect("/real-time-chat/chat");
};

export const publicRoutes: RouteObject[] = [
  {
    path: "auth",
    Component: AuthPage,
    loader: authedUserLoader,
  },
  {
    index: true,
    Component: AuthPage,
    loader: indexAuthUserLoader,
  },
  {
    path: "*",
    loader,
  },
];

export const privateRoutes: RouteObject[] = [
  {
    path: "chat",
    Component: ChatPage,
    loader: () => {
      const { isAuthenticated } = checkAuth();
      if (!isAuthenticated) {
        return redirect("/real-time-chat");
      }
      return null;
    },
  },
];

const routes: RouteObject[] = [
  {
    path: "/real-time-chat",
    Component: NavBar,
    children: [...publicRoutes, ...privateRoutes],
  },
  {
    path: "*",
    loader,
  },
];

export const router = createBrowserRouter(routes);

export default routes;

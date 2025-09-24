import { BASE_URL } from "@/shared/constants";
import { useEffect, useState, type JSX } from "react";

const getCurrentPath = () => {
  const pathname = window.location.pathname;

  return pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length - 1) || "/"
    : pathname;
};

const matchPath = (path: string, route: string) => {
  const pathParts = path.split("/"); // '/tasks/123' => ['', 'tasks', '123']
  const routePaths = route.split("/"); // '/tasks/:id' => ['', 'tasks', ':id']

  if (pathParts.length !== routePaths.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(":")) {
      const paramName = routePaths[i].slice(1);

      params[paramName] = pathParts[i];
    } else if (routePaths[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRoute = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath());
    };
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return path;
};

export type RouteValueType = (props: {
  [K in string]: unknown;
}) => JSX.Element;
// type RouteValueType = (props?: Record<string, unknown>) => JSX.Element;

// Record<string, () => JSX.Element>
export const Router = (props: {
  routes: {
    [K in string]: RouteValueType;
  };
}) => {
  const { routes } = props;
  const path = useRoute();

  for (const route in routes) {
    const params = matchPath(path, route);

    if (params) {
      const Page = routes[route];

      return <Page params={{ id: params.id }} />;
    }
  }

  const NotFound = routes["*"];

  return <NotFound />;
};

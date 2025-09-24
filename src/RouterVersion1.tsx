import { useEffect, useState, type JSX } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const useRoute = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return path;
};

// Record<string, () => JSX.Element>
type RouteValueType = (props: { [K in string]: unknown }) => JSX.Element;

export const Router = (props: {
  routes: { [K in string]: RouteValueType };
}) => {
  const { routes } = props;
  const path = useRoute();
  console.log("path:", path);
  if (path.startsWith("/tasks/")) {
    const id = path.replace("/tasks/", "");
    console.log("id:", id);
    const TaskPage = routes["/tasks/:id"];

    return <TaskPage params={{ id: id }} />;
  }

  const Page = routes[path] ?? routes["*"];

  return <Page />;
};

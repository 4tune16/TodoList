import { Router, type RouteValueType } from "./routing/Router";
import { TaskPage } from "@/pages/TaskPage";
import { TasksPage } from "@/pages/TasksPage";
import "./styles";

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage as RouteValueType,
    "*": () => <div>404 Page not found</div>,
  };
  // "editTask"

  return <Router routes={routes} />;
};

export default App;

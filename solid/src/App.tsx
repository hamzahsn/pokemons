import { lazy } from "solid-js";
import { useRoutes } from "@solidjs/router";

import styles from "./App.module.css";

const routes = [
  {
    path: "/pokemon/:name",
    component: lazy(() => import("./pages/PokemonDetails")),
  },
  {
    path: "/favorites",
    component: lazy(() => import("./pages/Favorites")),
  },
  {
    path: "/",
    component: import("./pages/Home"),
  },
];

function App() {
  const Routes = useRoutes(routes);
  return (
    <div class={styles.App}>
      <header class={styles.header}>hello</header>
      <Routes />
    </div>
  );
}

export default App;

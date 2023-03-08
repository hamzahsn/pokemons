import { lazy } from "solid-js";
import { useRoutes } from "@solidjs/router";

import styles from "./App.module.css";
import { Header } from "./components";

const routes = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/pokemon/:name",
    component: lazy(() => import("./pages/PokemonDetails")),
  },
  {
    path: "/favorites",
    component: lazy(() => import("./pages/Favorites")),
  },
];

function App() {
  const Routes = useRoutes(routes);
  return (
    <>
      <Header />
      <div class={styles.App}>
        <Routes />
      </div>
    </>
  );
}

export default App;

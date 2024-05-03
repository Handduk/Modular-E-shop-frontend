import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Views/root.css";

import { PageRoutes } from "./PageRoutes";
import { Navbar } from "./Components/Navbar/Navbar";

export const App = () => {
  return (
    <>
      <Navbar />
      <PageRoutes />
    </>
  );
};

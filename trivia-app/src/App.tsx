import { Login } from "./Login/Login";
import { Trivia } from "./Trivia/Trivia";
import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { EndPage } from "./EndPage/EndPage";

/**
 * The main App component that sets up the routing for different pages.
 * It renders the RouterProvider with the configured routes.
 */
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path="/trivia/:userName" element={<Trivia />} />
        <Route path="/endPage" element={<EndPage />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

/**
 * The Root component that serves as the entry point for the nested routes.
 * It renders the Outlet component to handle the rendering of nested routes.
 */
const Root = () => {
  return (
    <>
      <div className="pl-5">
        {/* This is where links are displayed */}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;

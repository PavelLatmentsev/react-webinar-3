import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../components/not-found";
import ProductCard from "../components/product-card";
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          index
          element={[
            <Main key={"1"} />,
            activeModal === "basket" && <Basket key="2" />,
          ]}
        />
        <Route
          path="/product/:id?"
          element={[
            <ProductCard key={"3"} />,
            activeModal === "basket" && <Basket key="4" />,
          ]}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

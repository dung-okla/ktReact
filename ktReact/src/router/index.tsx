
import {createBrowserRouter} from "react-router";
import Product from "../page/Product";
import Order from "../page/Order";
const router = createBrowserRouter([

  {
    path: "/products",
    element: <Product/>,
  },
  {
    path: "/orders",
    element: <Order/>,
  },
]);

export default router
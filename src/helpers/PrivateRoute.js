import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { selectUser } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import { selectIsRefreshing } from "../redux/auth/selectors";

const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
export const AdminRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const admin = useSelector(selectUser).accountType === "GOD";
  console.log(admin, "admin");

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  console.log(shouldRedirect, "shouldRedirect");
  console.log(shouldRedirect || !admin);
  
  return shouldRedirect || !admin ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;

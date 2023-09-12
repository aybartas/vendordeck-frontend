import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/configureStore";

export default function RequireAnonymous() {
  const { user } = useAppSelector((state) => state.account);
  if (user?.token) {
    return <Navigate to="/catalog"></Navigate>;
  }

  return <Outlet />;
}

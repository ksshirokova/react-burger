import { Navigate, useLocation } from "react-router-dom";
import { TRouteState } from "../../utils/types";
import { useTypeSelector } from "../../utils/hooks-types";

export default function ProtectedRoute({
  children,
  isUser,
  anonymous,
}: {
  isUser?: boolean;
  anonymous: boolean;
  children: JSX.Element;
}) {
  const { isAuth, isAuthChecked, isLogged, userChecked, user } =
    useTypeSelector((state) => state.routeStore);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (!isAuthChecked && !userChecked) {
    return <h1>Загрузка...</h1>;
  }

  //анонимный доступ - может ли сюда войти человек без данных юзера
  if (anonymous && user && !isUser) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !user && !isUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (!anonymous && !isAuth && isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (!anonymous && user && isUser && isAuth) {
    return <Navigate to={from} />;
  }

  return <>{children}</>;
}

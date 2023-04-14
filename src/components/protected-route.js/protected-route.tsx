import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../utils";

export default function ProtectedRoute({
  children,
  isUser,
  anonymous,
}: {
  isUser?: boolean;
  anonymous: boolean;
  children: JSX.Element;
}) {
  const { isAuthChecked, userChecked, user } = useSelector(
    (state) => state.routeStore
  );

  const location = useLocation();
  const from = location.state?.from || "/";

  if (!isAuthChecked) {
    return <p className="text text_type_main-large mt-15 mb-1">Загрузка...</p>
}

if (anonymous && user) {
    return (
        <Navigate to={from.pathname} replace/>
    )
}

if (!anonymous && !user) {
    return (
        <Navigate to="/login" state={{ from: location}} />
    )
}

  return <>{children}</>;
}

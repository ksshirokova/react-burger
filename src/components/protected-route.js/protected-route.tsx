import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../utils";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  isUser,
  anonymous,
}: {
  isUser?: boolean;
  anonymous: boolean;
  children: JSX.Element;
}) {
  const { isAuthChecked, user } = useSelector(
    (state) => state.routeStore
  );

  const location = useLocation();
  const from = location.state?.from || "/";

  

  if (!isAuthChecked) {
    return <p className="text text_type_main-large mt-15 mb-1">Загрузка...</p>
}

if (anonymous && user) {
    return (
        <Navigate to={from} />
    )
}

if (!anonymous && !user) {
    return (
        <Navigate to="/login" state={{ from: location}} />
    )
}
 

  return <>{children}</>;
}

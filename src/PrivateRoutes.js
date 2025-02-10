import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const storedData = JSON.parse(localStorage.getItem("data"));
  //console.log(storedData);

  return storedData ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

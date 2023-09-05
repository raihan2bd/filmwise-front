import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/typeHooks";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MoviesPage from "./pages/MoviesPage";
import SingleMoviePage from "./pages/SingleMoviePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddOrEditMoviePage from "./pages/AddOrEditMoviePage";
import AccessDeniedPage from "./pages/AccessDeniedPage";

const App = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<SingleMoviePage />} />
        <Route
          path="/add-new-movie"
          element={
            user?.role === "admin" ? (
              <AddOrEditMoviePage />
            ) : (
              <Navigate to="/access-denied" />
            )
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;

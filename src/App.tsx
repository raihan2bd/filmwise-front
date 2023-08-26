import {Routes, Route} from 'react-router-dom';

import Layout from "./components/Layout/Layout"
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import MoviesPage from './pages/MoviesPage';
import SingleMoviePage from './pages/SingleMoviePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<SingleMoviePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App

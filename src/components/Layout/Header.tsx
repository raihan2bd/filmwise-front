import { useState, useRef, FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import Button from "../UI/Button";
import { logoutAction } from "../../redux/features/authSlice";

import "./Header.css";
import { useAppDispatch, useAppSelector } from "../../hooks/typeHooks";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const user = useAppSelector((state) => state.auth.user)
  

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleNavHandler = () => {
    setShowNav((prevState) => !prevState);
  };

  const showSearchHandler = () => {
    setShowSearch(true);
  };

  const hideSearchHandler = () => {
    setShowSearch(false);
  };

  const submitSearchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value: string | undefined = searchInputRef.current?.value
    if(value && value !== '') {
      navigate(`/movies?s=${value}`)
    }
  };

  return (
    <header className="header bg-dark color-white d-flex jc-space-between align-items-center">
      <div className="brand d-flex align-items-center">
        <button className="mob-menu sm-content" onClick={toggleNavHandler}>
          {!showNav ? <FiMenu /> : <FiX />}
        </button>
        <Link to="/" className="brand-name">
          FilmWise
        </Link>
      </div>
      <nav className="nav-bar d-flex gap-1">
        <ul
          className={
            showNav
              ? "nav-group d-flex-sm-column d-flex-md-row gap-1 list-style-none"
              : "nav-group d-flex-md-row gap-1 list-style-none"
          }
        >
          <li>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          {user?.role === 'admin' && <li><NavLink className="nav-link" to="/add-new-movie">
              Add Movie
            </NavLink></li> }
          <li>
            {!user || !user?.id ? <NavLink className="nav-link" to="/auth">
              Login
            </NavLink>: <Button btnClass="bg-red-500" onClick={() => dispatch(logoutAction())}>Logout</Button>}
          </li>
          
        </ul>

        <div className="sm-content">
          <button className="btn-search-toggle" onClick={showSearchHandler}>
            <FiSearch />
          </button>
          {showSearch && (
            <div className="sm-search-form d-flex jc-space-between">
              <button
                onClick={hideSearchHandler}
                className="btn-search-toggle color-orange"
              >
                X
              </button>
              <form
                onSubmit={submitSearchHandler}
                className="search-item d-flex"
              >
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search movies..."
                  ref={searchInputRef}
                />
                <Button btnClass="btn-search-toggle" type="submit">
                  <FiSearch />
                </Button>
              </form>
            </div>
          )}
        </div>
        <form  onSubmit={submitSearchHandler} className="search-item d-flex md-content">
          <input
            className="search-input"
            type="search"
            placeholder="Search movies..."
            ref={searchInputRef}
          />
          <button type="submit" className="btn-search-toggle bg-white/10">
            <FiSearch />
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;

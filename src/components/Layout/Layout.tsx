import { ReactNode } from "react";
import Header from "./Header";

type PropsTypes = {
  children?: ReactNode
}

const Layout = ({ children }: PropsTypes) => {
  return (
    <>
      <Header />
      <main className="main-container">{children}</main>
      <footer className="footer">
        <p>&copy; 2023 FilmWise, Inc. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Layout;

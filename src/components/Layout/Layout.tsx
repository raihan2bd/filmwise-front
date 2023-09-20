import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type PropsTypes = {
  children?: ReactNode
}

const Layout = ({ children }: PropsTypes) => {
  return (
    <>
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

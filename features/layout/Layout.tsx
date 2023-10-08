import { ReactNode } from "react";

import MainHeader from "./MainHeader";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}

export default Layout;

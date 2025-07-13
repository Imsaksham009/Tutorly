import { Outlet } from "react-router-dom";
import type { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: FC = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;

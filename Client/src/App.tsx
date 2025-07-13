import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	type DataRouter,
	type RouteObject,
} from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Layout from "./components/Common/Layout";
import LoginPage from "./pages/Auth/loginSignup";
import ResetPasswordPage from "./pages/Auth/ResetPassword";
import CoursePage from "./pages/Courses/CoursePage";
import Home from "./pages/Home";

const routes: RouteObject[] = createRoutesFromElements(
	<Fragment>
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="home" element={<Home />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="reset-password" element={<ResetPasswordPage />} />
			<Route path="course/:slug" element={<CoursePage />} />
		</Route>
	</Fragment>
);

const App: DataRouter = createBrowserRouter(routes);

export default App;

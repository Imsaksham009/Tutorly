import { Fragment, type FC } from "react";
import Hero from "../components/Home/Hero";
import Companies from "../components/Home/Companies";
import Course from "../components/Home/HomeCourses";

const Home: FC = () => {
	return (
		<Fragment>
			<div className="flex flex-col justify-center">
				<Hero />
				<Companies />
				<Course />
			</div>
		</Fragment>
	);
};

export default Home;

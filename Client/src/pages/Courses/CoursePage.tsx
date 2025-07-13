import { useEffect, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useNavigate,
	useParams,
	type NavigateFunction,
} from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { getCourseDetails } from "../../reducers/CourseDetail/courseDetail.action";
import toast from "react-hot-toast";
import { clearCourseDetailError } from "../../reducers/CourseDetail/courseDetail.reducer";
import { ChevronDown } from "lucide-react";
import Loader from "../../components/Common/UI/Loader";

const CoursePage: FC = () => {
	const { slug } = useParams();
	const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState<boolean>(false);
	const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
		{}
	);
	const [playerData, setPlayerData] = useState<{ videoId: string } | null>(
		null
	);

	const dispatch: AppDispatch = useDispatch();
	const { loading, courseDetail, error } = useSelector(
		(state: RootState) => state.courseDetailReducer
	);
	const navigate: NavigateFunction = useNavigate();

	useEffect(() => {
		if (slug) getCourseDetails(dispatch, slug);
	}, [dispatch, slug]);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearCourseDetailError());
			navigate("/home");
		}
	}, [error, dispatch, navigate]);

	const currency = "₹";

	const toggleSection = (index: number) => {
		setOpenSections((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	// Calculate total duration in minutes from all lessons in all sections
	const calculateCourseDuration = () => {
		if (!courseDetail?.sections) return "0m";
		let totalMinutes = 0;
		courseDetail.sections.forEach((section: any) => {
			section.lessons.forEach((lesson: any) => {
				if (lesson.lectureDuration) totalMinutes += lesson.lectureDuration;
			});
		});
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
	};

	const calculateNoOfLectures = () => {
		if (!courseDetail?.sections) return 0;
		return courseDetail.sections.reduce(
			(acc: number, section: any) => acc + (section.lessons?.length || 0),
			0
		);
	};

	const humanizeDuration = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	const enrollCourse = () => {
		setIsAlreadyEnrolled(true);
	};

	return loading ? (
		<Loader />
	) : (
		<>
			<div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-20 pt-10 text-left mb-5">
				<div className="absolute top-0 left-0 w-full h-96 -z-10 bg-gradient-to-b from-purple-200/70 via-blue-100/70 to-transparent"></div>

				<div className="max-w-xl z-10 text-gray-500">
					<h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
						{courseDetail?.title}
					</h1>
					<p className="pt-4 md:text-base text-sm">
						{courseDetail?.description}
					</p>

					<div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
						<p>{courseDetail?.ratings?.average ?? 0}</p>
						<div className="flex">
							<span className="text-yellow-400">★★★★★</span>
						</div>
						<p className="text-blue-600">
							({courseDetail?.ratings?.count ?? 0} ratings)
						</p>
						<p>{courseDetail?.enrolledStudents ?? 0} students</p>
					</div>

					<p className="text-sm">
						Course by{" "}
						<span className="text-blue-600 underline">
							{courseDetail?.instructorId?.name}
						</span>
					</p>

					<div className="pt-8 text-gray-800">
						<h2 className="text-xl font-semibold">Course Structure</h2>
						<div className="pt-5">
							{courseDetail?.sections?.map((section: any, index: number) => (
								<div
									key={section._id}
									className="border border-gray-300 bg-white mb-2 rounded"
								>
									<div
										className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
										onClick={() => toggleSection(index)}
									>
										<div className="flex items-center gap-2">
											<span
												className={`transform transition-transform ${
													openSections[index] ? "rotate-180" : ""
												}`}
											>
												<ChevronDown />
											</span>
											<p className="font-medium md:text-base text-sm">
												{section.title}
											</p>
										</div>
										<p className="text-sm md:text-base">
											{section.lessons?.length ?? 0} lectures
										</p>
									</div>

									<div
										className={`overflow-hidden transition-all duration-300 ${
											openSections[index] ? "max-h-96" : "max-h-0"
										}`}
									>
										<ul className="list-none md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
											{section.lessons?.map((lesson: any, i: number) => (
												<li
													key={lesson._id || i}
													className="flex items-start gap-2 py-1"
												>
													<span className="text-blue-500 mt-1">▶</span>
													<div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-base">
														<p>{lesson.title || "Lesson Title"}</p>
														<div className="flex gap-2">
															{lesson.isPreview && (
																<p
																	onClick={() =>
																		setPlayerData({
																			videoId: lesson.videoId || "dQw4w9WgXcQ",
																		})
																	}
																	className="text-blue-500 cursor-pointer"
																>
																	Preview
																</p>
															)}
															<p>
																{humanizeDuration(lesson.lectureDuration || 0)}
															</p>
														</div>
													</div>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="py-20 text-sm md:text-base">
						<h3 className="text-xl font-semibold text-gray-800">
							Course Description
						</h3>
						<div className="rich-text pt-3">{courseDetail?.description}</div>
					</div>
				</div>

				<div className="max-w-md z-10 shadow-lg rounded-t md:rounded-lg overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
					{playerData ? (
						<div className="w-full aspect-video bg-black flex items-center justify-center text-white">
							Video Player: {playerData.videoId}
						</div>
					) : (
						<img
							src={courseDetail?.thumbnail}
							alt="Course thumbnail"
							className="w-full aspect-video object-cover"
						/>
					)}
					<div className="p-5">
						<div className="flex items-center gap-2">
							<span className="text-red-500">⏰</span>
							<p className="text-red-500">
								<span className="font-medium">5 days</span> left at this price!
							</p>
						</div>
						<div className="flex gap-3 items-center pt-2">
							<p className="text-gray-800 md:text-4xl text-2xl font-semibold">
								{currency} {courseDetail?.price}
							</p>
							<p className="md:text-lg text-gray-500 line-through">
								{currency}
								{courseDetail?.price}
							</p>
							<p className="md:text-lg text-gray-500">{0}% off</p>
						</div>
						<div className="flex items-center text-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500">
							<div className="flex items-center gap-1">
								<span className="text-yellow-400">★</span>
								<p>{courseDetail?.ratings?.average ?? 0}</p>
							</div>
							<div className="h-4 w-px bg-gray-500/40"></div>
							<div className="flex items-center gap-1">
								<span>⏱</span>
								<p>{calculateCourseDuration()}</p>
							</div>
							<div className="h-4 w-px bg-gray-500/40"></div>
							<div className="flex items-center gap-1">
								<span>📚</span>
								<p>{calculateNoOfLectures()} lessons</p>
							</div>
						</div>
						<button
							onClick={enrollCourse}
							className={`md:mt-6 mt-4 w-full py-3 rounded font-medium ${
								isAlreadyEnrolled
									? "bg-green-600 text-white"
									: "bg-blue-600 text-white hover:bg-blue-700"
							}`}
						>
							{isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
						</button>
						<div className="pt-6">
							<p className="md:text-xl text-lg font-medium text-gray-800">
								What's in the course?
							</p>
							<ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-500">
								<li>Lifetime access with free updates.</li>
								<li>Step-by-step, hands-on project guidance.</li>
								<li>Downloadable resources and source code.</li>
								<li>Quizzes to test your knowledge.</li>
								<li>Certificate of completion.</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CoursePage;

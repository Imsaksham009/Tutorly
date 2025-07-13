import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthError } from "../../reducers/user/auth.action";
import type { userState } from "../../reducers/user/auth.reducer";
import type { AppDispatch, RootState } from "../../store/store";
import { Login } from "./Login";
import { Signup } from "./SignUp";
import ResetPassword from "./ResetPassword";

const LoginSignupComponent: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"login" | "signup" | "reset">(
		"login"
	);
	const dispatch: AppDispatch = useDispatch();
	const userState: userState = useSelector(
		(state: RootState) => state.authReducer
	);
	const navigate = useNavigate();
	let redirect = "/home";
	const { loading, error, isAuthenticated } = userState;

	const switchTab = (tab: "login" | "signup" | "reset") => {
		setActiveTab(tab);
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
			clearAuthError(dispatch);
		}
		if (isAuthenticated) {
			navigate(redirect);
		}
	}, [error, dispatch, isAuthenticated, navigate, redirect]);

	return (
		<div className=" bg-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Welcome to Tutorly
					</h1>
					<p className="text-gray-600">
						Please sign in to your account or create a new one
					</p>
				</div>

				{/* Card Container */}
				<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
					{/* Tab Navigation */}
					<div className="flex relative bg-gray-50">
						<button
							onClick={() => switchTab("login")}
							className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-300 relative ${
								activeTab === "login" || activeTab === "reset"
									? "text-purple-800 bg-white"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							Login
						</button>
						<button
							onClick={() => switchTab("signup")}
							className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-300 relative ${
								activeTab === "signup"
									? "text-purple-800 bg-white"
									: "text-gray-500 hover:text-gray-700"
							}`}
						>
							Sign Up
						</button>
						{/* Active tab indicator */}
						<div
							className={`absolute bottom-0 h-0.5 bg-purple-800 transition-all duration-300 ease-out ${
								activeTab === "login" || activeTab === "reset"
									? "left-0 w-1/2"
									: "left-1/2 w-1/2"
							}`}
						/>
					</div>

					{/* Form Container */}
					<div className="p-8">
						{(() => {
							switch (activeTab) {
								case "login":
									return (
										<Login
											loading={loading}
											dispatch={dispatch}
											switchTab={switchTab}
										/>
									);
								case "signup":
									return (
										<Signup
											loading={loading}
											dispatch={dispatch}
											switchTab={switchTab}
										/>
									);
								case "reset":
									return <ResetPassword />;
							}
						})()}
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-8">
					<p className="text-gray-500 text-sm">
						By continuing, you agree to our Terms of Service and Privacy Policy
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginSignupComponent;

import React, { type ChangeEvent, type FormEvent } from "react";
import { userLogin } from "../../reducers/user/auth.action";
import type { CommonProps, LoginInBody } from "../../types/auth";

export const Login: React.FC<CommonProps> = ({
	loading,
	dispatch,
	switchTab,
}) => {
	const [loginData, setLoginData] = React.useState<LoginInBody>({
		email: "",
		password: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setLoginData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		userLogin(dispatch, loginData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-6">
				<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
					{/* Email field */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={loginData.email}
							onChange={handleInputChange}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
							placeholder="Enter your email"
						/>
					</div>

					{/* Password field */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={loginData.password}
							onChange={handleInputChange}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
							placeholder="Enter your password"
						/>
					</div>

					{/* Forgot Password */}
					<div className="text-right">
						<button
							type="button"
							onClick={() => switchTab("reset")}
							className="text-sm text-purple-800 hover:text-purple-900 cursor-pointer transition-colors duration-200"
						>
							Forgot Password?
						</button>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-purple-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-900 focus:ring-4 focus:ring-purple-300 transition-all duration-200 transform cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
					>
						{loading ? (
							<div className="flex items-center justify-center">
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
								Signing In...
							</div>
						) : (
							"Sign In"
						)}
					</button>
				</div>
			</div>

			{/* Additional Options */}
			<div className="mt-8 pt-6 border-t border-gray-200">
				<div className="text-center">
					<p className="text-gray-600 text-sm">
						Don't have an account?{" "}
						<button
							type="button"
							onClick={() => switchTab("signup")}
							className="text-purple-800 hover:text-purple-900 cursor-alias font-medium transition-colors duration-200"
						>
							Sign up here
						</button>
					</p>
				</div>
			</div>
		</form>
	);
};

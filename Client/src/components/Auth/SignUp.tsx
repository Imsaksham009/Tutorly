import React, { type ChangeEvent, type FormEvent } from "react";
import { registerUser } from "../../reducers/user/auth.action";
import type { CommonProps, FormDataForSignUp } from "../../types/auth";

export const Signup: React.FC<CommonProps> = ({
	loading,
	dispatch,
	switchTab,
}) => {
	const [formDataForSignUp, setFormDataForSignUp] =
		React.useState<FormDataForSignUp>({
			email: "",
			password: "",
			name: "",
			avatar: null,
		});
	const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "avatar" && e.target.files) {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.readyState === 2) {
						setAvatarPreview(reader.result as string);
						setFormDataForSignUp((prev) => ({
							...prev,
							avatar: file,
						}));
					}
				};
				reader.readAsDataURL(file);
			}
		} else {
			setFormDataForSignUp((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const signupData = new FormData();
		signupData.append("name", formDataForSignUp.name);
		signupData.append("email", formDataForSignUp.email);
		signupData.append("password", formDataForSignUp.password);
		signupData.append("avatar", formDataForSignUp.avatar as File);
		registerUser(dispatch, signupData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="space-y-6">
				<div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
					{/* Name field */}
					<div className="transform transition-all duration-300">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Full Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formDataForSignUp.name}
							onChange={handleInputChange}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
							placeholder="Enter your full name"
						/>
					</div>

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
							value={formDataForSignUp.email}
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
							value={formDataForSignUp.password}
							onChange={handleInputChange}
							required
							minLength={9}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
							placeholder="Enter your password"
						/>
					</div>

					{/* Avatar Upload */}
					<div className="transform transition-all duration-300">
						<label
							htmlFor="avatar"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Profile Picture
						</label>
						<div className="flex items-center space-x-4">
							{/* Preview Container */}
							<div className="flex-shrink-0">
								{avatarPreview ? (
									<img
										src={avatarPreview}
										alt="Preview"
										className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
									/>
								) : (
									<div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
										<svg
											className="w-8 h-8 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
								)}
							</div>

							{/* File Input */}
							<div className="flex-1">
								<input
									type="file"
									id="avatar"
									name="avatar"
									accept="image/*"
									onChange={handleInputChange}
									className="hidden"
								/>
								<label
									htmlFor="avatar"
									className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
								>
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									{avatarPreview ? "Change Photo" : "Upload Photo"}
								</label>
								<p className="mt-1 text-xs text-gray-500">
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</div>
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
								Creating Account...
							</div>
						) : (
							"Create Account"
						)}
					</button>
				</div>
			</div>

			{/* Additional Options */}
			<div className="mt-8 pt-6 border-t border-gray-200">
				<div className="text-center">
					<p className="text-gray-600 text-sm">
						Already have an account?{" "}
						<button
							type="button"
							onClick={() => switchTab("login")}
							className="text-purple-800 hover:text-purple-900 cursor-alias font-medium transition-colors duration-200"
						>
							Sign in here
						</button>
					</p>
				</div>
			</div>
		</form>
	);
};

import { useState, type ChangeEvent } from "react";

const ResetPassword = () => {
	const [loginData, setLoginData] = useState<string>("");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setLoginData(value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Logic to handle password reset
		console.log("Password reset for:", loginData);
		// You can dispatch an action or call an API here
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
							value={loginData}
							onChange={handleInputChange}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-800 focus:border-transparent transition-all duration-200 outline-none"
							placeholder="Enter your email"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-purple-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-900 focus:ring-4 focus:ring-purple-300 transition-all duration-200 transform cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
					>
						Reset Password
					</button>
				</div>
			</div>
		</form>
	);
};

export default ResetPassword;

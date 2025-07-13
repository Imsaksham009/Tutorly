import type { AppDispatch } from "../store/store";

export interface FormDataForSignUp {
	email: string;
	password: string;
	name: string;
	avatar: File | null;
}

export interface LoginInBody {
	email: string;
	password: string;
}

export interface CommonProps {
	loading: boolean;
	dispatch: AppDispatch;
	switchTab: (tab: "login" | "signup" | "reset") => void;
}

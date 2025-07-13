import React, { useEffect, useRef } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				background: "rgba(0,0,0,0.5)",
				backdropFilter: "blur(6px)", // add blur effect
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
			}}
		>
			<div
				ref={modalRef}
				style={{
					position: "relative",
					background: "#fff",
					borderRadius: "8px",
					padding: "24px",
					minWidth: "300px",
					maxWidth: "90vw",
					overflowY: "auto",
					boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
				}}
			>
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: "12px",
						right: "12px",
						background: "transparent",
						border: "none",
						fontSize: "1.5rem",
						cursor: "pointer",
					}}
					aria-label="Close modal"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;

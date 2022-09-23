import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className="navheader">
			<div
				className="navlogo"
				style={{ cursor: "pointer" }}
				onClick={() => {
					navigate("/");
				}}
			>
				<span>Laptop Portal</span>
			</div>
			<div className="navlinks">
				<span>Track Request</span>
				<span>Apply</span>
			</div>
		</div>
	);
};

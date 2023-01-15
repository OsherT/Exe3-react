import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      style={{ textAlign: "left", fontSize: 25, backgroundColor: "#4a4a48" }}>
      <Link className="button-48" to="/">
        Our kitchen 🍴
      </Link>{" "}
      |
      <Link className="button-48" to="/Ingredient">
        Add ingredient 🥄
      </Link>{" "}
      |
      <Link className="button-48" to="/Recipe">
        Add Recipe 🔪
      </Link>
    </div>
  );
}

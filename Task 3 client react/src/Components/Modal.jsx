import React from "react";

const Modal_Styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "rgb(74, 74, 72)",
  borderRadius: "1rem",
  padding: "50px",
  zIndex: 1000,
  float: "left",
};

export default function Modal({ open, children }) {
  if (!open) return null;
  return <div style={Modal_Styles}>{children}</div>;
}

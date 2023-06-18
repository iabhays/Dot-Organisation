import React, { useState } from "react";
import "../style/base/Card.css";

const Card = React.forwardRef(
  (
    {
      width = "450px",
      height = "300px",
      child,
      onClick,
    },
    ref
  ) => (
    <div
      className="card"
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
      onClick={onClick}
      ref={ref}
    >
      {child}
    </div>
  )
);
export default Card;

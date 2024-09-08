import React from "react";
import { Link} from "react-router-dom";

const BottomWarning = ({ label, to, buttonText }) => {
  return (
    <div className="pt-2">
      <span className="text-sm py-2 ">{label}</span>
      <Link className="underline text-sm" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;

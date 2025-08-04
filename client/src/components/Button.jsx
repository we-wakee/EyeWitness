import React, { Children } from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  // If className contains color classes, use them instead of bgColor/textColor
  const hasColorClasses = className.includes('bg-') || className.includes('text-');
  
  return (
    <button
      type={type}
      {...props}
      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
        hasColorClasses ? className : `${bgColor} ${textColor} ${className}`
      }`}
    >
      {children}
    </button>
  );
};

export default Button;

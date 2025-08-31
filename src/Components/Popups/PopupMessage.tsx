import { useEffect, useState } from "react";

interface PopupMessageProps {
  message: string;
  type: "success" | "delete" | "info" | "warning";
}

export const PopupMessage = ({ message, type }: PopupMessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`absolute top-0 left-0 w-screen h-full flex justify-center pointer-events-none pt-10
        transform transition-all duration-400
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-50 opacity-0"}
      `}
    >
      <div
        className={`flex items-center justify-center min-w-40 h-16  text-2xl rounded-lg shadow-lg shadow-black
        ${type === "success" ? "bg-lime-400" : ""} ${
          type === "delete" ? "bg-red-500 text-white" : ""
        } 
        ${type === "info" ? "bg-blue-400" : ""} ${
          type === "warning" ? "bg-yellow-500" : ""
        }`}
      >
        <div className="p-4 font-semibold">{message}</div>
      </div>
    </div>
  );
};

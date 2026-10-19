import React from 'react';

interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean;
}

export const UIButton: React.FC<UIButtonProps> = ({ onClick, children, className = '', primary = false, ...rest }) => {
    const baseStyle = "px-6 py-3 font-bold text-xl rounded-lg border-4 border-black hover:bg-gray-200 active:translate-y-1 shadow-[0_4px_0_#000] active:shadow-none transition-all";
    const primaryStyle = primary ? "bg-white text-black" : "bg-[#D4803B] text-white hover:bg-[#b0682e]";
    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${primaryStyle} ${className}`}
            style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}
            {...rest}
        >
            {children}
        </button>
    );
};
import type { ReactNode } from "react";

const Button = ({ children, onClick }: { children: ReactNode, onClick?: () => void }) => {

    return (
        <button
            className="
                rounded-lg border border-transparent
                py-[0.6rem] px-[1.2rem]
                bg-[#f6f6f6] cursor-pointer
                transition-all duration-200
                hover:border-[#646cff]
                focus:outline-1
            "
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;
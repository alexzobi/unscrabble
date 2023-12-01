import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// The purpose of this component is to standardize buttons across the application.
// This prevents devs from going too rogue or making minor styling mistakes that
// violate company style guide. One could be considerably more rigorous in preventing
// this by sanitizing incoming styles.
const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button className={twMerge("h-full border-2 rounded-lg border-slate-400 py-2 px-3 active:bg-gray-700", className)} {...props} />

export default Button
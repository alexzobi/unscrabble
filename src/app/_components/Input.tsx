import { twMerge } from "tailwind-merge"

// The purpose of this component is to standardize buttons across the application.
// This prevents devs from going too rogue or making minor styling mistakes that
// violate company style guide. One could be considerably more rigorous in preventing
// this by sanitizing incoming styles.
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => <input className={twMerge("rounded-lg border-2 border-slate-400 bg-white text-blue-950 p-2", className)} {...props} />

export default Input
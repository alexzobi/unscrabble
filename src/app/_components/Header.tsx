import { twMerge } from "tailwind-merge"

// The purpose of this component is to standardize buttons across the application.
// This prevents devs from going too rogue or making minor styling mistakes that
// violate company style guide. One could be considerably more rigorous in preventing
// this by sanitizing incoming styles.
const Header = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => <h1 className={twMerge("text-[32px]", className)} {...props} />

export default Header
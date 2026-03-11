export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }) {
    const baseStyles = 'px-6 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-primary text-white hover:bg-opacity-90 focus:ring-primary',
        secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary',
        accent: 'bg-accent text-white hover:bg-opacity-90 focus:ring-accent',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}

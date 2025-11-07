
import React from 'react';

interface CalculatorButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
    variant?: 'default' | 'operator' | 'light-gray';
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
    label,
    onClick,
    className = '',
    variant = 'default',
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'operator':
                return 'bg-calc-orange text-white hover:bg-calc-orange-hover';
            case 'light-gray':
                return 'bg-calc-light-gray text-black hover:bg-gray-400';
            case 'default':
            default:
                return 'bg-calc-dark-gray text-white hover:bg-gray-600';
        }
    };

    const baseClasses = `
        flex items-center justify-center 
        h-16 w-full sm:h-20 
        rounded-full 
        text-3xl sm:text-4xl 
        font-medium 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-calc-dark focus:ring-white
        transition-colors duration-150
    `;

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${getVariantClasses()} ${className}`}
        >
            {label === '×' ? '×' : label === '÷' ? '÷' : label}
        </button>
    );
};

export default CalculatorButton;

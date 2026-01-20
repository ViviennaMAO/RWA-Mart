import React from 'react'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}: ButtonProps) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20",
        secondary: "bg-surface hover:bg-gray-800 text-text-primary border border-gray-700",
        outline: "border border-gray-600 text-text-secondary hover:text-text-primary hover:border-gray-500",
        ghost: "hover:bg-white/5 text-text-secondary hover:text-text-primary",
    }

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    }

    return (
        <button
            className={cn(
                "rounded-lg font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
}

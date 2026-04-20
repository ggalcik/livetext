import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from "tailwind-merge";
import React from 'react';


const buttonVariants = cva(
    ' rounded-lg   cursor-pointer',
    {
        variants: {
            variant: {
                a: 'text-white    bg-blue-700                         hover:bg-blue-800 ',
                b: 'text-gray-900 bg-white    border border-gray-400  hover:bg-gray-100  hover:text-blue-700',
                c: 'text-white    bg-red-800  border border-gray-400  hover:bg-red-600',

            },
            size: {
                sm: 'text-xs px-2 h-5',
                med: 'text-sm px-2 h-7',
                lg: 'text-md px-2 h-9',
                xl: 'text-xl px-4 py-2 h-12'
            },
            mode: {
                normal: '',
                activated: 'ring-4',
                alert: 'bg-red-700 hover:bg-red-700'
            },
            disabled: {
                true: 'opacity-50 cursor-not-allowed pointer-events-none',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'a',
            size: 'med',
            mode: 'normal',
            disabled: false,
        },
        compoundVariants: [
            {
                variant: 'c',
                mode: 'activated',
                className: 'font-bold bg-red-500 hover:bg-red-300 ring-red-300'
            }
        ],
    }
);


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, size, mode, disabled, className, children, ...rest }, ref) => (
        <button
            ref={ref}
            disabled={disabled}
            className={`${twMerge(buttonVariants({ variant, size, mode, disabled }))} ${className ?? ''}`}
            {...rest}
        >
            {children}
        </button>
    )
);
// interface ButtonProps extends
//     React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> { }

// export const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
//     ({ variant, size, mode, disabled, className, children, ...rest }, ref) => (
//         <button
//             ref={ref}
//             disabled={disabled}
//             className={`${twMerge(buttonVariants({ variant, size, mode }))} ${className ?? ''}`}
//             {...rest}
//         >
//             {children}
//         </button>
//     )
// );

Button.displayName = 'Button';

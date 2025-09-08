import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';


const buttonVariants = cva(
   'focus:ring-4 focus:ring-blue-300 font-medium rounded-lg me-2 mb-2  focus:outline-none  cursor-pointer',
 
  
    {variants: {
      variant: {
        a: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 ',
        b: 'text-gray-900  bg-white border border-gray-400 hover:bg-gray-100 hover:text-blue-700  focus:ring-gray-100',
        c: ' text-gray-400  bg-gray-200 border border-gray-400  hover:bg-gray-100  focus:ring-gray-100 ',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        med: 'text-sm px-4 py-2 text-red-400'
      }
    },
    defaultVariants: {
      variant: 'a',
      size: 'med'
    },
  }
);


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...rest }, ref) => (
    <button
      className={`${buttonVariants({ variant })} ${className ?? ''}`}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

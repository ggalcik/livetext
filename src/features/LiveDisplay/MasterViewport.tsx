import { type PropsWithChildren } from 'react';

export function MasterViewport({ children }: PropsWithChildren) {
    return (
        <div className="flex items-center justify-center absolute w-full h-full pt-48 ">
            {children}
        </div>
    );
};

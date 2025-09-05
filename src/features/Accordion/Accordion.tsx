import clsx from "clsx";
import { useState } from "react";

interface IAccordion {
    label: string;
    children: React.ReactNode;
    startOpen?: boolean;
}

export function Accordion({ label, children, startOpen = false }: IAccordion) {
    const [isOpen, setIsOpen] = useState(startOpen);

    return (
        <div>
            <div className={clsx("p-2 pl-4 border-b cursor-pointer text-xs", {
                "bg-green-100": isOpen,
                "bg-green-50": !isOpen
            })}
                onClick={(e) => {e.preventDefault(); setIsOpen(p => !p)}}>
                {label}
            </div>
            {isOpen &&
                <div className="border-t-2 border-t-gray-200 border-b p-4">{children}</div>
            }
        </div>
    )
}
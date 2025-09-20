import clsx from "clsx";
import { useState } from "react";
import type { SceneType } from "../scenes/types";

interface IAccordion<T extends string> {
    label: string;
    children: React.ReactNode;
    links?: readonly T[];
    selectedLink?: T;
    setSelectedLink?: React.Dispatch<React.SetStateAction<T>>;
    startOpen?: boolean;

}

export function Accordion<T extends string>({ label, children, links, selectedLink, setSelectedLink, startOpen = false }: IAccordion<T>) {
    const [isOpen, setIsOpen] = useState(startOpen);

    function handleSceneClick(evt: React.MouseEvent, scene: T) {
        evt.preventDefault();
        evt.stopPropagation();
        setSelectedLink && setSelectedLink(scene);
        if (!isOpen) {
             setIsOpen(true);
        }
    }

    return (
        <div className="">
            <div className={clsx("border-b cursor-pointer text-xs flex", {
                "bg-green-100": isOpen,
                "bg-green-50": !isOpen
            })}
                onClick={(e) => { e.preventDefault(); setIsOpen(p => !p) }}>
                <div className={clsx("p-2 pl-4", label === 'scenes' && 'border-r')}>
                    {label}
                </div>
                {links && setSelectedLink && 
                    links.map(item =>
                        <div className={clsx("p-2 border-r",
                            selectedLink === item && links && isOpen && "bg-green-300",
                            selectedLink === item && "bg-green-200")}
                            onClick={(e) => handleSceneClick(e, item)}>{item}</div>
                    )
                }
            </div>
            {isOpen &&
                <div className="border-t-2 border-t-gray-200 p-4">{children}</div>
            }
        </div>
    )
}
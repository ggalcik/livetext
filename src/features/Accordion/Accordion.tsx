import clsx from "clsx";
import { useState } from "react";
import type { SceneType } from "../scenes/types";
import PopupScene, { openPopup } from "../Popup/PopupScene";

interface IAccordion<T extends string> {
    label: string;
    children: React.ReactNode;
    links?: readonly T[];
    selectedLink?: T;
    setSelectedLink?: (scene: SceneType) => void;
    selectedRadio?: T;
    setSelectedRadio?: (scene: SceneType) => void;
    startOpen?: boolean;

}

export function Accordion<T extends string>({
    label,
    children,
    links,
    selectedLink,
    setSelectedLink,
    selectedRadio,
    setSelectedRadio,
    startOpen = false }: IAccordion<T>) {
    const [isOpen, setIsOpen] = useState(startOpen);

    function handleSceneClick(evt: React.MouseEvent, scene: T) {
        evt.preventDefault();
        evt.stopPropagation();
        setSelectedLink && setSelectedLink(scene);
        if (!isOpen) {
            setIsOpen(true);
        }
    }
    // TODO: ugh doesn't apply to accordion, but is there a point to generalizing
    function handleSceneSelect(evt: React.MouseEvent, scene: T) {
        evt.stopPropagation();
        openPopup(scene);
        setSelectedRadio && setSelectedRadio(scene);
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
                        <div key={`accordion_link_${item}`} 
                        className={clsx("flex gap-2 px-2 border-r items-center",
                            selectedLink === item && links && isOpen && "bg-green-300",
                            selectedLink === item && "bg-green-200")}>
                            <input type="radio"
                                className="w-6 h-6"
                                name={`accordion_${label}`}
                                value={item}
                                checked={selectedRadio && selectedRadio === item}
                                onClick={(e) => handleSceneSelect(e, item)} />
                            <div className=''
                                onClick={(e) => handleSceneClick(e, item)}>{item}</div>
                        </div>
                    )
                }
            </div>
            {isOpen &&
                <div className="border-t-2 border-t-gray-200 p-4">{children}</div>
            }
        </div>
    )
}
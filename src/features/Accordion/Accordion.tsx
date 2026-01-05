import clsx from "clsx";
import { useState } from "react";
import type { SceneType } from "../scenes/types";
import PopupScene, { openPopup } from "../Popup/PopupScene";
import { panelTypes } from "../scenes/Panels/types";
import MiniSelect from "../scenes/Panels/MiniSelect";
import glog from "../../components/glog";

interface IAccordion<T extends string> {
    label: string;
    children: React.ReactNode;
    linkLabels?: readonly T[];
    selectedLink?: T;
    setSelectedLink?: (scene: SceneType) => void;
    selectedRadio?: T;
    setSelectedRadio?: (scene: SceneType, delay?: number) => void;
    boomerangRadio?: ((delay: number) => void) | null;
    boom?: ((delay: number) => void) | null;
    boomerangTarget?: SceneType
    startOpen?: boolean;
    delay?: number | null;

}

export function Accordion<T extends string>({
    label,
    children,
    linkLabels,
    selectedLink,
    setSelectedLink,
    selectedRadio,
    setSelectedRadio,
    boomerangRadio,
    boomerangTarget,
    delay,
    boom = null,
    startOpen = false }: IAccordion<T>) {
    const [isOpen, setIsOpen] = useState(startOpen);
    const [showMiniSelect, setShowMiniSelect] = useState(false);

    function handleSceneClick(evt: React.MouseEvent, scene: T) {
        evt.preventDefault();
        evt.stopPropagation();
        if (scene === selectedLink) {
            setIsOpen(p => !p);
        } else {
            setSelectedLink && setSelectedLink(scene);
            setIsOpen(true);
        }
        // if (!isOpen) {
        //     setIsOpen(true);
        // }
    }
    // TODO: ugh doesn't apply to accordion, but is there a point to generalizing
    function handleSceneSelect(evt: React.ChangeEvent<HTMLInputElement>, scene: T) {
        // evt.preventDefault();
        setSelectedRadio && setSelectedRadio(scene);
    }


    return (
        <div className="">
            <div className={clsx("border-b cursor-pointer text-xs flex", {
                "bg-green-100": isOpen,
                "bg-green-50": !isOpen
            })}
                onClick={(e) => { e.preventDefault(); setIsOpen(p => !p) }}>
                <div className={clsx("p-2 pl-4 font-bold text-red-800", linkLabels && 'border-r')}>
                    <div className="inline-block text-sm mr-1">{isOpen ? '⏷' : '⏶'}</div>
                    {label}
                </div>
                {linkLabels && setSelectedLink &&
                    <>{linkLabels.map((item) => {
                        // console.log("radio: selectedRadio %s, item %s ", selectedRadio, item);
                        return <div key={`accordion_${label}_${item}`}
                        className={clsx("relative flex gap-2 px-2 border-r items-center",
                            selectedLink === item && isOpen && "bg-green-300",
                            selectedLink === item && "bg-green-200")}
                            onMouseEnter={() => item === 'panels' && setShowMiniSelect(true)}
                            onMouseLeave={() => item === 'panels' && setShowMiniSelect(false)}
                                onClick={(e) => handleSceneClick(e, item)}
                            >
                            {setSelectedRadio &&
                                <div className="w-6 h-6 relative z-10">
                                    <input type="radio"
                                        className="w-6 h-6 cursor-pointer"

                                        value={item}
                                        checked={selectedRadio === item}
                                        onChange={() => setSelectedRadio(item)}
                                        onClick={(e) => e.stopPropagation()}
                                    />

                                    {delay && selectedRadio === item &&
                                        <div className="absolute w-6 h-6 border -top-0 -left-0 bg-white flex justify-center align-baseline">{delay}</div>
                                    }
                                </div>
                            }
                            <div className=''

                            >{item}</div>
                            {item === 'panels' && setSelectedRadio && showMiniSelect &&
                                <MiniSelect boom={boom} activate={() => { setSelectedRadio('panels') }} />
                            }

                        </div>
                    }
                    )
                    }  </>

                }
            </div>
            {isOpen &&
                <div className="border-t-2 border-t-gray-200 p-4">{children}</div>
            }
        </div>
    )
}
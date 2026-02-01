import clsx from "clsx";

interface IInlineEdit {
    showEdit: boolean;
    value: string;
    bold: boolean | undefined;
    doUpdate: (text: string) => void;
    startEdit: () => void;
}

export default function InlineEdit({ showEdit, value, bold, startEdit, doUpdate }: IInlineEdit) {
    const cellBase =
        "w-full box-border px-1 py-0.5 text-base leading-6 rounded border";

    return (
        <div>
            {showEdit ? (
                <input
                    className={clsx(cellBase, "border-gray-300 focus:border-gray-400 bg-white")}
                    defaultValue={value}
                    autoFocus
                    onBlur={e => doUpdate(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    }}
                />
            ) : (
                <div
                    className={clsx(cellBase, "cursor-text border-transparent", bold && "font-bold")}
                    onClick={startEdit}
                >
                    {value}
                </div>
            )}
        </div>)
}
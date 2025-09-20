import { useEffect, useRef } from "react";

interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

export function AutoResizeTextarea({ value, ...props }: AutoResizeTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      {...props}
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
        const el = e.target;
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }}
    />
  );
}

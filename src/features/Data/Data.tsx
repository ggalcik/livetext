import React, { useState, useEffect, useRef } from "react";

const STORAGE_KEYS = ["MasterViewports", "fontList", "liveData", "videoScene"] as const;

type StorageKey = typeof STORAGE_KEYS[number];

export default function Data() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
 const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear copiedKey after 5 seconds
  useEffect(() => {
    if (copiedKey) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopiedKey(null), 5000);
    }
  }, [copiedKey]);

  // Clear on click anywhere inside the component
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current?.contains(e.target as Node)) {
        setCopiedKey(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const getFormatted = (key: StorageKey): string => {
    const raw = localStorage.getItem(key);
    if (!raw) return `// no data for ${key}\n`;
    try {
      const parsed = JSON.parse(raw);
      return `data.${key} = ${JSON.stringify(parsed, null, 2)};\n`;
    } catch {
      return `// invalid JSON in ${key}\n`;
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => setCopiedKey(key));
  };

  const allText = STORAGE_KEYS.map(getFormatted).join("\n");

  return (
    <div ref={containerRef} className="space-y-6 p-4 border rounded">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => handleCopy(allText, "ALL")}
      >
        Copy All
      </button>
      {copiedKey === "ALL" && <div className="text-green-600">copied!</div>}

      {STORAGE_KEYS.map((key) => {
        const formatted = getFormatted(key);
        return (
          <div key={key} className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded"
                onClick={() => handleCopy(formatted, key)}
              >
                Copy {key}
              </button>
              {copiedKey === key && <span className="text-green-600">copied!</span>}
            </div>
            <textarea
              readOnly
              value={formatted}
              className="w-full h-40 border p-2 font-mono text-sm"
            />
          </div>
        );
      })}
    </div>
  );
}

import { useState, useEffect } from "react";

type LocalFont = {
  postscriptName: string;
  fullName: string;
  family: string;
  style: string;
};

export default function FontReference() {
  const [sampleText, setSampleText] = useState("The quick brown fox jumps over the lazy dog");
  const [fonts, setFonts] = useState<LocalFont[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(24);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("fontList");
    if (saved) {
      try {
        const parsed: LocalFont[] = JSON.parse(saved);
        setFonts(parsed);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

async function handleUpdateFonts() {
  try {
    if ("queryLocalFonts" in window) {
      // @ts-expect-error experimental API
      const localFonts = await window.queryLocalFonts();

      // Extract plain JSON-safe data
      const cleanFonts = localFonts.map((f: any) => ({
        postscriptName: f.postscriptName,
        fullName: f.fullName,
        family: f.family,
        style: f.style,
      }));

      setFonts(cleanFonts);
      localStorage.setItem("fontList", JSON.stringify(cleanFonts));
    } else {
      setError("Local Font Access API not supported in this browser.");
    }
  } catch (err: any) {
    setError(err.message || "Unable to load local fonts");
  }
}


  // Build firstFamilyFonts, preferring Regular
  const firstFamilyFonts = Object.values(
    fonts.reduce<Record<string, LocalFont>>((acc, font) => {
      if (!acc[font.family]) acc[font.family] = font;
      if (font.style === "Regular") acc[font.family] = font;
      return acc;
    }, {})
  );

  // Build map of family -> styles
  const familyStyles = fonts.reduce<Record<string, string[]>>((acc, font) => {
    if (!acc[font.family]) acc[font.family] = [];
    if (!acc[font.family].includes(font.style)) {
      acc[font.family].push(font.style);
    }
    return acc;
  }, {});

  // Decide which fonts to display
  const displayFonts = showAll ? fonts : firstFamilyFonts;

  return (
    <div className="p-4 space-y-6">
      {/* Sample text input */}
      <input
        type="text"
        value={sampleText}
        onChange={(e) => setSampleText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter sample text"
      />

      {/* Font size slider */}
      <div>
        <label className="block mb-1 font-medium">Font size: {fontSize}px</label>
        <input
          type="range"
          min={8}
          max={96}
          step={2}
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-40"
        />
      </div>

      {/* Toggle */}
      <div className="flex items-center space-x-2">
        <input
          id="showAll"
          type="checkbox"
          checked={showAll}
          onChange={(e) => setShowAll(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="showAll" className="select-none">
          Show all fonts (styles & weights)
        </label>
      </div>

      {/* Update button */}
      <button
        onClick={handleUpdateFonts}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Update list
      </button>

      {error && <div className="text-red-600">{error}</div>}

      {/* Font table */}
      {fonts.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 w-1/4">Font</th>
              <th className="text-left p-2">Sample</th>
            </tr>
          </thead>
          <tbody>
            {displayFonts.map((font) => (
              <tr key={font.postscriptName} className="border-b align-top">
                <td className="p-2">
                  {/* Font name, omit (Regular) */}
                  {font.style === "Regular"
                    ? font.fullName
                    : `${font.fullName} (${font.style})`}

                  {/* If showAll is off, show style list below */}
                  {!showAll && familyStyles[font.family] && (
                    <div className="text-xs text-gray-500 mt-1">
                      {familyStyles[font.family].join(", ")}
                    </div>
                  )}
                </td>
                <td
                  className="p-2"
                  style={{
                    fontFamily: `"${font.fullName}", ${font.family}`,
                    fontSize,
                  }}
                >
                  {sampleText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

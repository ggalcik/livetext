import { useState } from "react";

type LocalFont = {
  postscriptName: string;
  fullName: string;
  family: string;
  style: string;
};

export default function FontReference() {
  const [sampleText, setSampleText] = useState("The quick brown fox jumps over the lazy dog");
  const [fontCSSPrefix, setFontCSSPrefix] = useState("40/1.3");
  const [fonts, setFonts] = useState<LocalFont[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(24);
  const [showAll, setShowAll] = useState<boolean>(false);

  async function handleLoadFonts() {
    try {
      if ("queryLocalFonts" in window) {
        // @ts-expect-error: experimental API
        const localFonts: LocalFont[] = await window.queryLocalFonts();
        setFonts(localFonts);
      } else {
        setError("Local Font Access API not supported in this browser.");
      }
    } catch (err: any) {
      setError(err.message || "Unable to load local fonts");
    }
  }

  // Collapse to one font per family if showAll = false
  const displayedFonts = showAll
    ? fonts
    : Object.values(
        fonts.reduce<Record<string, LocalFont>>((acc, font) => {
          if (!acc[font.family]) acc[font.family] = font; // first style seen
          if (font.style === 'Regular') acc[font.family] = font;
          return acc;
        }, {})
      );

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

      {/* Load button */}
      {fonts.length === 0 && (
        <button
          onClick={handleLoadFonts}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load Local Fonts
        </button>
      )}

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
            {displayedFonts.map((font) => (
              <tr key={font.postscriptName} className="border-b">
                <td className="p-2">
                  {font.fullName} ({font.style})
                </td>
                <td
                  className="p-2"
                  style={{ fontFamily: `"${font.fullName}", ${font.family}`, fontSize }}
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

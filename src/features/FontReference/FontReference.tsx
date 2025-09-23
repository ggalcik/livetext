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
  const [openFamilies, setOpenFamilies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("fontList");
    if (saved) {
      try {
        const parsed: LocalFont[] = JSON.parse(saved);
        setFonts(parsed);
      } catch {
        /* ignore parse errors */
      }
    }
  }, []);

  async function handleUpdateFonts() {
    try {
      if ("queryLocalFonts" in window) {
        // @ts-expect-error experimental API
        const localFonts = await window.queryLocalFonts();
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

  // Group fonts by family
  const familyGroups = fonts.reduce<Record<string, LocalFont[]>>((acc, font) => {
    if (!acc[font.family]) acc[font.family] = [];
    acc[font.family].push(font);
    return acc;
  }, {});

  function toggleFamily(family: string) {
    setOpenFamilies((prev) => ({
      ...prev,
      [family]: !prev[family],
    }));
  }

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
              <th className="text-left p-2 w-1/3">Font</th>
              <th className="text-left p-2">Sample</th>
            </tr>
          </thead>
          <tbody>
            {firstFamilyFonts.map((font) => {
              const variants = familyGroups[font.family] || [];
              const hasVariants = variants.length > 1;
              const isOpen = !!openFamilies[font.family];

              return (
                <>
                  {/* First family row */}
                  <tr key={font.postscriptName} className="border-t align-top">
                    <td
                      className="p-2 cursor-pointer"
                      onClick={() => hasVariants && toggleFamily(font.family)}
                    >
                      <span className="inline-block w-4">
                        {hasVariants && (isOpen ? "▾" : "▸") }
                      </span>
                      {font.style === "Regular"
                        ? font.fullName
                        : `${font.fullName} (${font.style})`}
                      {/* Variant list when collapsed */}
                      {!isOpen && hasVariants && (
                        <div className="text-xs text-gray-500 mt-1 ml-4">
                          {variants.map((v) => v.style).join(", ")}
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

                  {/* Expanded variants */}
                  {isOpen &&
                    variants
                      .filter((v) => v.postscriptName !== font.postscriptName)
                      .map((variant) => (
                        <tr
                          key={variant.postscriptName}
                          className="border-t border-gray-200 align-top text-sm "
                        >
                          <td className="p-2 pl-8 text-gray-600">
                            {variant.style === "Regular"
                              ? variant.fullName
                              : `${variant.fullName} (${variant.style})`}
                          </td>
                          <td
                            className="p-2"
                            style={{
                              fontFamily: `"${variant.fullName}", ${variant.family}`,
                              fontSize,
                            }}
                          >
                            {sampleText}
                          </td>
                        </tr>
                      ))}
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

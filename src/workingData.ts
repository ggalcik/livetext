import type { CounterScene } from "./features/scenes/Counter/types";

const dataNames = [
    "MasterViewports", 
    "fontList", 
    "liveData", 
    "videoScene", 
    "counterScene"
] as const;

export interface IWorkingData {
    counterScene?: CounterScene;
}
const workingData:IWorkingData = {};

workingData.MasterViewports = {
  "sample": {
    "edges": {
      "top": 43.400000000000006,
      "left": 5.200000000000074,
      "right": 96.60000000000001,
      "bottom": 97.79999999999983
    }
  },
  "sample-2": {
    "edges": {
      "top": 17.699999999999996,
      "left": 77.7,
      "right": 96.80000000000003,
      "bottom": 68.19999999999993
    }
  },
  "banners": {
    "edges": {
      "top": 56.49999999999999,
      "left": 14.599999999999994,
      "right": 86.39999999999989,
      "bottom": 89.3000000000001
    }
  },
  "livetext": {
    "edges": {
      "top": 51.6,
      "left": 6.1,
      "right": 96.80000000000001,
      "bottom": 102.19999999999997
    }
  },
  "other": {
    "edges": {
      "top": 3.6999999999999975,
      "left": 31.599999999999984,
      "right": 70.69999999999996,
      "bottom": 24.500000000000014
    }
  },
  "atemporal": {
    "edges": {
      "top": 51.6,
      "left": 28.9,
      "right": 71.79999999999997,
      "bottom": 77.1000000000002
    }
  },
  "video": {
    "edges": {
      "top": 44.7,
      "left": 7.199999999999999,
      "right": 93.9,
      "bottom": 100
    }
  },
  "evolution": {
    "edges": {
      "top": 51.69999999999999,
      "left": 26.49999999999999,
      "right": 75.49999999999999,
      "bottom": 94.0999999999998
    }
  },
  "counter": {
    "edges": {
      "top": 42.70000000000001,
      "left": 15.49999999999999,
      "right": 91.49999999999994,
      "bottom": 73.40000000000012
    }
  },
  "philbronium": {
    "edges": {
      "top": 50,
      "left": 0,
      "right": 100,
      "bottom": 100
    }
  },
  "panel copy Rhizic": {
    "edges": {
      "top": 60.29999999999998,
      "left": 16.00000000000001,
      "right": 94.30000000000005,
      "bottom": 88.49999999999999
    }
  },
  "panel [object Object]": {
    "edges": {
      "top": 13.99999999999999,
      "left": 34.400000000000006,
      "right": 106.90000000000002,
      "bottom": 48.90000000000002
    }
  },
  "panel Las Lajas": {
    "edges": {
      "top": 49.1,
      "left": 1.2000000000000028,
      "right": 101.20000000000005,
      "bottom": 99.1
    }
  },
  "panel Aaaamennn": {
    "edges": {
      "top": -26.800000000000008,
      "left": -0.19999999999999574,
      "right": 99.79999999999998,
      "bottom": 23.20000000000006
    }
  },
  "slides": {
    "edges": {
      "top": 48.8,
      "left": 8.9,
      "right": 92.8,
      "bottom": 97.1
    }
  },
  "panel HolyHonkers": {
    "edges": {
      "top": 34.4,
      "left": 16.799999999999997,
      "right": 83.19999999999987,
      "bottom": 100.19999999999999
    }
  }
};

workingData.fontList = [
  {
    "postscriptName": "AgencyFB-Bold",
    "fullName": "Agency FB Negreta",
    "family": "Agency FB",
    "style": "Bold"
  },
  {
    "postscriptName": "AgencyFB-Reg",
    "fullName": "Agency FB",
    "family": "Agency FB",
    "style": "Regular"
  },
  {
    "postscriptName": "Algerian",
    "fullName": "Algerian",
    "family": "Algerian",
    "style": "Regular"
  },
  {
    "postscriptName": "Arial-Black",
    "fullName": "Arial Black Normal",
    "family": "Arial",
    "style": "Black"
  },
  {
    "postscriptName": "Arial-BoldItalicMT",
    "fullName": "Arial Negreta cursiva",
    "family": "Arial",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Arial-BoldMT",
    "fullName": "Arial Negreta",
    "family": "Arial",
    "style": "Bold"
  },
  {
    "postscriptName": "Arial-ItalicMT",
    "fullName": "Arial Cursiva",
    "family": "Arial",
    "style": "Italic"
  },
  {
    "postscriptName": "ArialMT",
    "fullName": "Arial",
    "family": "Arial",
    "style": "Regular"
  },
  {
    "postscriptName": "ArialNarrow",
    "fullName": "Arial Narrow",
    "family": "Arial",
    "style": "Narrow"
  },
  {
    "postscriptName": "ArialNarrow-Bold",
    "fullName": "Arial Narrow Negreta",
    "family": "Arial",
    "style": "Narrow Bold"
  },
  {
    "postscriptName": "ArialNarrow-BoldItalic",
    "fullName": "Arial Narrow Negreta cursiva",
    "family": "Arial",
    "style": "Narrow Bold Italic"
  },
  {
    "postscriptName": "ArialNarrow-Italic",
    "fullName": "Arial Narrow Cursiva",
    "family": "Arial",
    "style": "Narrow Italic"
  },
  {
    "postscriptName": "ArialRoundedMTBold",
    "fullName": "Arial Rounded MT Bold",
    "family": "Arial Rounded MT",
    "style": "Regular"
  },
  {
    "postscriptName": "Bahnschrift",
    "fullName": "Bahnschrift",
    "family": "Bahnschrift",
    "style": "Regular"
  },
  {
    "postscriptName": "Bahnschrift-Bold",
    "fullName": "Bahnschrift Bold",
    "family": "Bahnschrift",
    "style": "Bold"
  },
  {
    "postscriptName": "Bahnschrift-Bold-Condensed",
    "fullName": "Bahnschrift Bold Condensed",
    "family": "Bahnschrift",
    "style": "Bold Condensed"
  },
  {
    "postscriptName": "Bahnschrift-Bold-SemiCondensed",
    "fullName": "Bahnschrift Bold SemiCondensed",
    "family": "Bahnschrift",
    "style": "Bold SemiCondensed"
  },
  {
    "postscriptName": "Bahnschrift-Condensed",
    "fullName": "Bahnschrift Condensed",
    "family": "Bahnschrift",
    "style": "Condensed"
  },
  {
    "postscriptName": "Bahnschrift-Light",
    "fullName": "Bahnschrift Light",
    "family": "Bahnschrift",
    "style": "Light"
  },
  {
    "postscriptName": "Bahnschrift-Light-Condensed",
    "fullName": "Bahnschrift Light Condensed",
    "family": "Bahnschrift",
    "style": "Light Condensed"
  },
  {
    "postscriptName": "Bahnschrift-Light-SemiCondensed",
    "fullName": "Bahnschrift Light SemiCondensed",
    "family": "Bahnschrift",
    "style": "Light SemiCondensed"
  },
  {
    "postscriptName": "Bahnschrift-SemiBold",
    "fullName": "Bahnschrift SemiBold",
    "family": "Bahnschrift",
    "style": "SemiBold"
  },
  {
    "postscriptName": "Bahnschrift-SemiBold-Condensed",
    "fullName": "Bahnschrift SemiBold Condensed",
    "family": "Bahnschrift",
    "style": "SemiBold Condensed"
  },
  {
    "postscriptName": "Bahnschrift-SemiBold-SemiCondensed",
    "fullName": "Bahnschrift SemiBold SemiCondensed",
    "family": "Bahnschrift",
    "style": "SemiBold SemiCondensed"
  },
  {
    "postscriptName": "Bahnschrift-SemiCondensed",
    "fullName": "Bahnschrift SemiCondensed",
    "family": "Bahnschrift",
    "style": "SemiCondensed"
  },
  {
    "postscriptName": "Bahnschrift-SemiLight",
    "fullName": "Bahnschrift SemiLight",
    "family": "Bahnschrift",
    "style": "SemiLight"
  },
  {
    "postscriptName": "Bahnschrift-SemiLight-Condensed",
    "fullName": "Bahnschrift SemiLight Condensed",
    "family": "Bahnschrift",
    "style": "SemiLight Condensed"
  },
  {
    "postscriptName": "Bahnschrift-SemiLight-SemiCondensed",
    "fullName": "Bahnschrift SemiLight SemiCondensed",
    "family": "Bahnschrift",
    "style": "SemiLight SemiCondensed"
  },
  {
    "postscriptName": "BaskOldFace",
    "fullName": "Baskerville Old Face",
    "family": "Baskerville Old Face",
    "style": "Regular"
  },
  {
    "postscriptName": "Bauhaus93",
    "fullName": "Bauhaus 93",
    "family": "Bauhaus 93",
    "style": "Regular"
  },
  {
    "postscriptName": "BellMT",
    "fullName": "Bell MT",
    "family": "Bell MT",
    "style": "Regular"
  },
  {
    "postscriptName": "BellMTBold",
    "fullName": "Bell MT Negreta",
    "family": "Bell MT",
    "style": "Bold"
  },
  {
    "postscriptName": "BellMTItalic",
    "fullName": "Bell MT Cursiva",
    "family": "Bell MT",
    "style": "Italic"
  },
  {
    "postscriptName": "BerlinSansFB-Bold",
    "fullName": "Berlin Sans FB Negreta",
    "family": "Berlin Sans FB",
    "style": "Bold"
  },
  {
    "postscriptName": "BerlinSansFB-Reg",
    "fullName": "Berlin Sans FB",
    "family": "Berlin Sans FB",
    "style": "Regular"
  },
  {
    "postscriptName": "BerlinSansFBDemi-Bold",
    "fullName": "Berlin Sans FB Demi Negreta",
    "family": "Berlin Sans FB",
    "style": "Bold"
  },
  {
    "postscriptName": "BernardMT-Condensed",
    "fullName": "Bernard MT Condensed",
    "family": "Bernard MT",
    "style": "Regular"
  },
  {
    "postscriptName": "BlackadderITC-Regular",
    "fullName": "Blackadder ITC",
    "family": "Blackadder ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "BodoniMT",
    "fullName": "Bodoni MT",
    "family": "Bodoni MT",
    "style": "Regular"
  },
  {
    "postscriptName": "BodoniMT-Bold",
    "fullName": "Bodoni MT Negreta",
    "family": "Bodoni MT",
    "style": "Bold"
  },
  {
    "postscriptName": "BodoniMT-BoldItalic",
    "fullName": "Bodoni MT Negreta cursiva",
    "family": "Bodoni MT",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "BodoniMT-Italic",
    "fullName": "Bodoni MT Cursiva",
    "family": "Bodoni MT",
    "style": "Italic"
  },
  {
    "postscriptName": "BodoniMTBlack",
    "fullName": "Bodoni MT Black",
    "family": "Bodoni MT",
    "style": "Black"
  },
  {
    "postscriptName": "BodoniMTBlack-Italic",
    "fullName": "Bodoni MT Black Cursiva",
    "family": "Bodoni MT",
    "style": "Black Italic"
  },
  {
    "postscriptName": "BodoniMTCondensed",
    "fullName": "Bodoni MT Condensed",
    "family": "Bodoni MT",
    "style": "Condensed"
  },
  {
    "postscriptName": "BodoniMTCondensed-Bold",
    "fullName": "Bodoni MT Condensed Negreta",
    "family": "Bodoni MT",
    "style": "Condensed Bold"
  },
  {
    "postscriptName": "BodoniMTCondensed-BoldItalic",
    "fullName": "Bodoni MT Condensed Negreta cursiva",
    "family": "Bodoni MT",
    "style": "Condensed Bold Italic"
  },
  {
    "postscriptName": "BodoniMTCondensed-Italic",
    "fullName": "Bodoni MT Condensed Cursiva",
    "family": "Bodoni MT",
    "style": "Condensed Italic"
  },
  {
    "postscriptName": "BodoniMTPosterCompressed",
    "fullName": "Bodoni MT Poster Compressed",
    "family": "Bodoni MT Poster",
    "style": "Poster Compressed"
  },
  {
    "postscriptName": "BookAntiqua",
    "fullName": "Book Antiqua",
    "family": "Book Antiqua",
    "style": "Regular"
  },
  {
    "postscriptName": "BookAntiqua-Bold",
    "fullName": "Book Antiqua Negreta",
    "family": "Book Antiqua",
    "style": "Bold"
  },
  {
    "postscriptName": "BookAntiqua-BoldItalic",
    "fullName": "Book Antiqua Negreta cursiva",
    "family": "Book Antiqua",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "BookAntiqua-Italic",
    "fullName": "Book Antiqua Cursiva",
    "family": "Book Antiqua",
    "style": "Italic"
  },
  {
    "postscriptName": "BookmanOldStyle",
    "fullName": "Bookman Old Style",
    "family": "Bookman Old Style",
    "style": "Regular"
  },
  {
    "postscriptName": "BookmanOldStyle-Bold",
    "fullName": "Bookman Old Style Negreta",
    "family": "Bookman Old Style",
    "style": "Bold"
  },
  {
    "postscriptName": "BookmanOldStyle-BoldItalic",
    "fullName": "Bookman Old Style Negreta cursiva",
    "family": "Bookman Old Style",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "BookmanOldStyle-Italic",
    "fullName": "Bookman Old Style Cursiva",
    "family": "Bookman Old Style",
    "style": "Italic"
  },
  {
    "postscriptName": "BookshelfSymbolSeven",
    "fullName": "Bookshelf Symbol 7",
    "family": "Bookshelf Symbol 7",
    "style": "Regular"
  },
  {
    "postscriptName": "BradleyHandITC",
    "fullName": "Bradley Hand ITC",
    "family": "Bradley Hand ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "BritannicBold",
    "fullName": "Britannic Bold",
    "family": "Britannic",
    "style": "Regular"
  },
  {
    "postscriptName": "Broadway",
    "fullName": "Broadway",
    "family": "Broadway",
    "style": "Regular"
  },
  {
    "postscriptName": "BrushScriptMT",
    "fullName": "Brush Script MT Cursiva",
    "family": "Brush Script MT",
    "style": "Italic"
  },
  {
    "postscriptName": "Calibri",
    "fullName": "Calibri",
    "family": "Calibri",
    "style": "Regular"
  },
  {
    "postscriptName": "Calibri-Bold",
    "fullName": "Calibri Bold",
    "family": "Calibri",
    "style": "Bold"
  },
  {
    "postscriptName": "Calibri-BoldItalic",
    "fullName": "Calibri Bold Italic",
    "family": "Calibri",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Calibri-Italic",
    "fullName": "Calibri Italic",
    "family": "Calibri",
    "style": "Italic"
  },
  {
    "postscriptName": "Calibri-Light",
    "fullName": "Calibri Light",
    "family": "Calibri",
    "style": "Light"
  },
  {
    "postscriptName": "Calibri-LightItalic",
    "fullName": "Calibri Light Italic",
    "family": "Calibri",
    "style": "Light Italic"
  },
  {
    "postscriptName": "CalifornianFB-Bold",
    "fullName": "Californian FB Negreta",
    "family": "Californian FB",
    "style": "Bold"
  },
  {
    "postscriptName": "CalifornianFB-Italic",
    "fullName": "Californian FB Cursiva",
    "family": "Californian FB",
    "style": "Italic"
  },
  {
    "postscriptName": "CalifornianFB-Reg",
    "fullName": "Californian FB",
    "family": "Californian FB",
    "style": "Regular"
  },
  {
    "postscriptName": "CalisMTBol",
    "fullName": "Calisto MT Negreta",
    "family": "Calisto MT",
    "style": "Bold"
  },
  {
    "postscriptName": "CalistoMT",
    "fullName": "Calisto MT",
    "family": "Calisto MT",
    "style": "Regular"
  },
  {
    "postscriptName": "CalistoMT-BoldItalic",
    "fullName": "Calisto MT Negreta cursiva",
    "family": "Calisto MT",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "CalistoMT-Italic",
    "fullName": "Calisto MT Cursiva",
    "family": "Calisto MT",
    "style": "Italic"
  },
  {
    "postscriptName": "Cambria",
    "fullName": "Cambria",
    "family": "Cambria",
    "style": "Regular"
  },
  {
    "postscriptName": "Cambria-Bold",
    "fullName": "Cambria Bold",
    "family": "Cambria",
    "style": "Bold"
  },
  {
    "postscriptName": "Cambria-BoldItalic",
    "fullName": "Cambria Bold Italic",
    "family": "Cambria",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Cambria-Italic",
    "fullName": "Cambria Italic",
    "family": "Cambria",
    "style": "Italic"
  },
  {
    "postscriptName": "CambriaMath",
    "fullName": "Cambria Math",
    "family": "Cambria Math",
    "style": "Regular"
  },
  {
    "postscriptName": "Candara",
    "fullName": "Candara",
    "family": "Candara",
    "style": "Regular"
  },
  {
    "postscriptName": "Candara-Bold",
    "fullName": "Candara Bold",
    "family": "Candara",
    "style": "Bold"
  },
  {
    "postscriptName": "Candara-BoldItalic",
    "fullName": "Candara Bold Italic",
    "family": "Candara",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Candara-Italic",
    "fullName": "Candara Italic",
    "family": "Candara",
    "style": "Italic"
  },
  {
    "postscriptName": "Candara-Light",
    "fullName": "Candara Light",
    "family": "Candara",
    "style": "Light"
  },
  {
    "postscriptName": "Candara-LightItalic",
    "fullName": "Candara Light Italic",
    "family": "Candara",
    "style": "Light Italic"
  },
  {
    "postscriptName": "Cascadia-Code-Bold-Italic",
    "fullName": "Cascadia Code Bold Italic",
    "family": "Cascadia Code",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Cascadia-Code-ExtraLight-Italic",
    "fullName": "Cascadia Code ExtraLight Italic",
    "family": "Cascadia Code",
    "style": "ExtraLight Italic"
  },
  {
    "postscriptName": "Cascadia-Code-Italic",
    "fullName": "Cascadia Code Italic",
    "family": "Cascadia Code",
    "style": "Italic"
  },
  {
    "postscriptName": "Cascadia-Code-Light-Italic",
    "fullName": "Cascadia Code Light Italic",
    "family": "Cascadia Code",
    "style": "Light Italic"
  },
  {
    "postscriptName": "Cascadia-Code-SemiBold-Italic",
    "fullName": "Cascadia Code SemiBold Italic",
    "family": "Cascadia Code",
    "style": "SemiBold Italic"
  },
  {
    "postscriptName": "Cascadia-Code-SemiLight-Italic",
    "fullName": "Cascadia Code SemiLight Italic",
    "family": "Cascadia Code",
    "style": "SemiLight Italic"
  },
  {
    "postscriptName": "Cascadia-Mono-Bold-Italic",
    "fullName": "Cascadia Mono Bold Italic",
    "family": "Cascadia Mono",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Cascadia-Mono-ExtraLight-Italic",
    "fullName": "Cascadia Mono ExtraLight Italic",
    "family": "Cascadia Mono",
    "style": "ExtraLight Italic"
  },
  {
    "postscriptName": "Cascadia-Mono-Italic",
    "fullName": "Cascadia Mono Italic",
    "family": "Cascadia Mono",
    "style": "Italic"
  },
  {
    "postscriptName": "Cascadia-Mono-Light-Italic",
    "fullName": "Cascadia Mono Light Italic",
    "family": "Cascadia Mono",
    "style": "Light Italic"
  },
  {
    "postscriptName": "Cascadia-Mono-SemiBold-Italic",
    "fullName": "Cascadia Mono SemiBold Italic",
    "family": "Cascadia Mono",
    "style": "SemiBold Italic"
  },
  {
    "postscriptName": "Cascadia-Mono-SemiLight-Italic",
    "fullName": "Cascadia Mono SemiLight Italic",
    "family": "Cascadia Mono",
    "style": "SemiLight Italic"
  },
  {
    "postscriptName": "CascadiaCodeRoman",
    "fullName": "Cascadia Code",
    "family": "Cascadia Code",
    "style": "Regular"
  },
  {
    "postscriptName": "CascadiaCodeRoman-Bold",
    "fullName": "Cascadia Code Bold",
    "family": "Cascadia Code",
    "style": "Bold"
  },
  {
    "postscriptName": "CascadiaCodeRoman-ExtraLight",
    "fullName": "Cascadia Code ExtraLight",
    "family": "Cascadia Code",
    "style": "ExtraLight"
  },
  {
    "postscriptName": "CascadiaCodeRoman-Light",
    "fullName": "Cascadia Code Light",
    "family": "Cascadia Code",
    "style": "Light"
  },
  {
    "postscriptName": "CascadiaCodeRoman-SemiBold",
    "fullName": "Cascadia Code SemiBold",
    "family": "Cascadia Code",
    "style": "SemiBold"
  },
  {
    "postscriptName": "CascadiaCodeRoman-SemiLight",
    "fullName": "Cascadia Code SemiLight",
    "family": "Cascadia Code",
    "style": "SemiLight"
  },
  {
    "postscriptName": "CascadiaMonoRoman",
    "fullName": "Cascadia Mono",
    "family": "Cascadia Mono",
    "style": "Regular"
  },
  {
    "postscriptName": "CascadiaMonoRoman-Bold",
    "fullName": "Cascadia Mono Bold",
    "family": "Cascadia Mono",
    "style": "Bold"
  },
  {
    "postscriptName": "CascadiaMonoRoman-ExtraLight",
    "fullName": "Cascadia Mono ExtraLight",
    "family": "Cascadia Mono",
    "style": "ExtraLight"
  },
  {
    "postscriptName": "CascadiaMonoRoman-Light",
    "fullName": "Cascadia Mono Light",
    "family": "Cascadia Mono",
    "style": "Light"
  },
  {
    "postscriptName": "CascadiaMonoRoman-SemiBold",
    "fullName": "Cascadia Mono SemiBold",
    "family": "Cascadia Mono",
    "style": "SemiBold"
  },
  {
    "postscriptName": "CascadiaMonoRoman-SemiLight",
    "fullName": "Cascadia Mono SemiLight",
    "family": "Cascadia Mono",
    "style": "SemiLight"
  },
  {
    "postscriptName": "Castellar",
    "fullName": "Castellar",
    "family": "Castellar",
    "style": "Regular"
  },
  {
    "postscriptName": "Centaur",
    "fullName": "Centaur",
    "family": "Centaur",
    "style": "Regular"
  },
  {
    "postscriptName": "Century",
    "fullName": "Century",
    "family": "Century",
    "style": "Regular"
  },
  {
    "postscriptName": "CenturyGothic",
    "fullName": "Century Gothic",
    "family": "Century Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "CenturyGothic-Bold",
    "fullName": "Century Gothic Negreta",
    "family": "Century Gothic",
    "style": "Bold"
  },
  {
    "postscriptName": "CenturyGothic-BoldItalic",
    "fullName": "Century Gothic Negreta cursiva",
    "family": "Century Gothic",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "CenturyGothic-Italic",
    "fullName": "Century Gothic Cursiva",
    "family": "Century Gothic",
    "style": "Italic"
  },
  {
    "postscriptName": "CenturySchoolbook",
    "fullName": "Century Schoolbook",
    "family": "Century Schoolbook",
    "style": "Regular"
  },
  {
    "postscriptName": "CenturySchoolbook-Bold",
    "fullName": "Century Schoolbook Negreta",
    "family": "Century Schoolbook",
    "style": "Bold"
  },
  {
    "postscriptName": "CenturySchoolbook-BoldItalic",
    "fullName": "Century Schoolbook Negreta cursiva",
    "family": "Century Schoolbook",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "CenturySchoolbook-Italic",
    "fullName": "Century Schoolbook Cursiva",
    "family": "Century Schoolbook",
    "style": "Italic"
  },
  {
    "postscriptName": "Chiller-Regular",
    "fullName": "Chiller",
    "family": "Chiller",
    "style": "Regular"
  },
  {
    "postscriptName": "ColonnaMT",
    "fullName": "Colonna MT",
    "family": "Colonna MT",
    "style": "Regular"
  },
  {
    "postscriptName": "ComicSansMS",
    "fullName": "Comic Sans MS",
    "family": "Comic Sans MS",
    "style": "Regular"
  },
  {
    "postscriptName": "ComicSansMS-Bold",
    "fullName": "Comic Sans MS Negreta",
    "family": "Comic Sans MS",
    "style": "Bold"
  },
  {
    "postscriptName": "ComicSansMS-BoldItalic",
    "fullName": "Comic Sans MS Negreta cursiva",
    "family": "Comic Sans MS",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "ComicSansMS-Italic",
    "fullName": "Comic Sans MS Cursiva",
    "family": "Comic Sans MS",
    "style": "Italic"
  },
  {
    "postscriptName": "Consolas",
    "fullName": "Consolas",
    "family": "Consolas",
    "style": "Regular"
  },
  {
    "postscriptName": "Consolas-Bold",
    "fullName": "Consolas Bold",
    "family": "Consolas",
    "style": "Bold"
  },
  {
    "postscriptName": "Consolas-BoldItalic",
    "fullName": "Consolas Bold Italic",
    "family": "Consolas",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Consolas-Italic",
    "fullName": "Consolas Italic",
    "family": "Consolas",
    "style": "Italic"
  },
  {
    "postscriptName": "Constantia",
    "fullName": "Constantia",
    "family": "Constantia",
    "style": "Regular"
  },
  {
    "postscriptName": "Constantia-Bold",
    "fullName": "Constantia Bold",
    "family": "Constantia",
    "style": "Bold"
  },
  {
    "postscriptName": "Constantia-BoldItalic",
    "fullName": "Constantia Bold Italic",
    "family": "Constantia",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Constantia-Italic",
    "fullName": "Constantia Italic",
    "family": "Constantia",
    "style": "Italic"
  },
  {
    "postscriptName": "CooperBlack",
    "fullName": "Cooper Black",
    "family": "Cooper",
    "style": "Regular"
  },
  {
    "postscriptName": "CopperplateGothic-Bold",
    "fullName": "Copperplate Gothic Bold",
    "family": "Copperplate Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "CopperplateGothic-Light",
    "fullName": "Copperplate Gothic Light",
    "family": "Copperplate Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "Corbel",
    "fullName": "Corbel",
    "family": "Corbel",
    "style": "Regular"
  },
  {
    "postscriptName": "Corbel-Bold",
    "fullName": "Corbel Bold",
    "family": "Corbel",
    "style": "Bold"
  },
  {
    "postscriptName": "Corbel-BoldItalic",
    "fullName": "Corbel Bold Italic",
    "family": "Corbel",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Corbel-Italic",
    "fullName": "Corbel Italic",
    "family": "Corbel",
    "style": "Italic"
  },
  {
    "postscriptName": "CorbelLight",
    "fullName": "Corbel Light",
    "family": "Corbel",
    "style": "Light"
  },
  {
    "postscriptName": "CorbelLight-Italic",
    "fullName": "Corbel Light Italic",
    "family": "Corbel",
    "style": "Light Italic"
  },
  {
    "postscriptName": "CourierNewPS-BoldItalicMT",
    "fullName": "Courier New Negreta cursiva",
    "family": "Courier New",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "CourierNewPS-BoldMT",
    "fullName": "Courier New Negreta",
    "family": "Courier New",
    "style": "Bold"
  },
  {
    "postscriptName": "CourierNewPS-ItalicMT",
    "fullName": "Courier New Cursiva",
    "family": "Courier New",
    "style": "Italic"
  },
  {
    "postscriptName": "CourierNewPSMT",
    "fullName": "Courier New",
    "family": "Courier New",
    "style": "Regular"
  },
  {
    "postscriptName": "CurlzMT",
    "fullName": "Curlz MT",
    "family": "Curlz MT",
    "style": "Regular"
  },
  {
    "postscriptName": "Dubai-Bold",
    "fullName": "Dubai Bold",
    "family": "Dubai",
    "style": "Bold"
  },
  {
    "postscriptName": "Dubai-Light",
    "fullName": "Dubai Light",
    "family": "Dubai",
    "style": "Light"
  },
  {
    "postscriptName": "Dubai-Medium",
    "fullName": "Dubai Medium",
    "family": "Dubai",
    "style": "Medium"
  },
  {
    "postscriptName": "Dubai-Regular",
    "fullName": "Dubai Regular",
    "family": "Dubai",
    "style": "Regular"
  },
  {
    "postscriptName": "Ebrima",
    "fullName": "Ebrima",
    "family": "Ebrima",
    "style": "Regular"
  },
  {
    "postscriptName": "Ebrima-Bold",
    "fullName": "Ebrima Negreta",
    "family": "Ebrima",
    "style": "Bold"
  },
  {
    "postscriptName": "EdwardianScriptITC",
    "fullName": "Edwardian Script ITC",
    "family": "Edwardian Script ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "Elephant-Italic",
    "fullName": "Elephant Cursiva",
    "family": "Elephant",
    "style": "Italic"
  },
  {
    "postscriptName": "Elephant-Regular",
    "fullName": "Elephant",
    "family": "Elephant",
    "style": "Regular"
  },
  {
    "postscriptName": "EngraversMT",
    "fullName": "Engravers MT",
    "family": "Engravers MT",
    "style": "Regular"
  },
  {
    "postscriptName": "ErasITC-Bold",
    "fullName": "Eras Bold ITC",
    "family": "Eras ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "ErasITC-Demi",
    "fullName": "Eras Demi ITC",
    "family": "Eras ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "ErasITC-Light",
    "fullName": "Eras Light ITC",
    "family": "Eras ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "ErasITC-Medium",
    "fullName": "Eras Medium ITC",
    "family": "Eras ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "FelixTitlingMT",
    "fullName": "Felix Titling",
    "family": "Felix Titling",
    "style": "Regular"
  },
  {
    "postscriptName": "FootlightMTLight",
    "fullName": "Footlight MT Light",
    "family": "Footlight MT",
    "style": "Regular"
  },
  {
    "postscriptName": "ForteMT",
    "fullName": "Forte",
    "family": "Forte",
    "style": "Regular"
  },
  {
    "postscriptName": "FranklinGothic-Book",
    "fullName": "Franklin Gothic Book",
    "family": "Franklin Gothic Book",
    "style": "Regular"
  },
  {
    "postscriptName": "FranklinGothic-BookItalic",
    "fullName": "Franklin Gothic Book Cursiva",
    "family": "Franklin Gothic Book",
    "style": "Italic"
  },
  {
    "postscriptName": "FranklinGothic-Demi",
    "fullName": "Franklin Gothic Demi",
    "family": "Franklin Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "FranklinGothic-DemiCond",
    "fullName": "Franklin Gothic Demi Cond",
    "family": "Franklin Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "FranklinGothic-DemiItalic",
    "fullName": "Franklin Gothic Demi Cursiva",
    "family": "Franklin Gothic",
    "style": "Italic"
  },
  {
    "postscriptName": "FranklinGothic-Heavy",
    "fullName": "Franklin Gothic Heavy",
    "family": "Franklin Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "FranklinGothic-HeavyItalic",
    "fullName": "Franklin Gothic Heavy Cursiva",
    "family": "Franklin Gothic",
    "style": "Italic"
  },
  {
    "postscriptName": "FranklinGothic-Medium",
    "fullName": "Franklin Gothic Medium",
    "family": "Franklin Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "FranklinGothic-MediumCond",
    "fullName": "Franklin Gothic Medium Cond",
    "family": "Franklin Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "FranklinGothic-MediumItalic",
    "fullName": "Franklin Gothic Medium Cursiva",
    "family": "Franklin Gothic",
    "style": "Italic"
  },
  {
    "postscriptName": "FreestyleScript-Regular",
    "fullName": "Freestyle Script",
    "family": "Freestyle Script",
    "style": "Regular"
  },
  {
    "postscriptName": "FrenchScriptMT",
    "fullName": "French Script MT",
    "family": "French Script MT",
    "style": "Regular"
  },
  {
    "postscriptName": "Gabriola",
    "fullName": "Gabriola",
    "family": "Gabriola",
    "style": "Regular"
  },
  {
    "postscriptName": "Gadugi",
    "fullName": "Gadugi",
    "family": "Gadugi",
    "style": "Regular"
  },
  {
    "postscriptName": "Gadugi-Bold",
    "fullName": "Gadugi Negreta",
    "family": "Gadugi",
    "style": "Bold"
  },
  {
    "postscriptName": "Garamond",
    "fullName": "Garamond",
    "family": "Garamond",
    "style": "Regular"
  },
  {
    "postscriptName": "Garamond-Bold",
    "fullName": "Garamond Negreta",
    "family": "Garamond",
    "style": "Bold"
  },
  {
    "postscriptName": "Garamond-Italic",
    "fullName": "Garamond Cursiva",
    "family": "Garamond",
    "style": "Italic"
  },
  {
    "postscriptName": "Georgia",
    "fullName": "Georgia",
    "family": "Georgia",
    "style": "Regular"
  },
  {
    "postscriptName": "Georgia-Bold",
    "fullName": "Georgia Negreta",
    "family": "Georgia",
    "style": "Bold"
  },
  {
    "postscriptName": "Georgia-BoldItalic",
    "fullName": "Georgia Negreta cursiva",
    "family": "Georgia",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Georgia-Italic",
    "fullName": "Georgia Cursiva",
    "family": "Georgia",
    "style": "Italic"
  },
  {
    "postscriptName": "Gigi-Regular",
    "fullName": "Gigi",
    "family": "Gigi",
    "style": "Regular"
  },
  {
    "postscriptName": "GillSans-UltraBold",
    "fullName": "Gill Sans Ultra Bold",
    "family": "Gill Sans",
    "style": "Regular"
  },
  {
    "postscriptName": "GillSans-UltraBoldCondensed",
    "fullName": "Gill Sans Ultra Bold Condensed",
    "family": "Gill Sans",
    "style": "Regular"
  },
  {
    "postscriptName": "GillSansMT",
    "fullName": "Gill Sans MT",
    "family": "Gill Sans MT",
    "style": "Regular"
  },
  {
    "postscriptName": "GillSansMT-Bold",
    "fullName": "Gill Sans MT Negreta",
    "family": "Gill Sans MT",
    "style": "Bold"
  },
  {
    "postscriptName": "GillSansMT-BoldItalic",
    "fullName": "Gill Sans MT Negreta cursiva",
    "family": "Gill Sans MT",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "GillSansMT-Condensed",
    "fullName": "Gill Sans MT Condensed",
    "family": "Gill Sans MT",
    "style": "Regular"
  },
  {
    "postscriptName": "GillSansMT-ExtraCondensedBold",
    "fullName": "Gill Sans MT Ext Condensed Bold",
    "family": "Gill Sans MT",
    "style": "Regular"
  },
  {
    "postscriptName": "GillSansMT-Italic",
    "fullName": "Gill Sans MT Cursiva",
    "family": "Gill Sans MT",
    "style": "Italic"
  },
  {
    "postscriptName": "GloucesterMT-ExtraCondensed",
    "fullName": "Gloucester MT Extra Condensed",
    "family": "Gloucester MT",
    "style": "Regular"
  },
  {
    "postscriptName": "GoudyOldStyleT-Bold",
    "fullName": "Goudy Old Style Negreta",
    "family": "Goudy Old Style",
    "style": "Bold"
  },
  {
    "postscriptName": "GoudyOldStyleT-Italic",
    "fullName": "Goudy Old Style Cursiva",
    "family": "Goudy Old Style",
    "style": "Italic"
  },
  {
    "postscriptName": "GoudyOldStyleT-Regular",
    "fullName": "Goudy Old Style",
    "family": "Goudy Old Style",
    "style": "Regular"
  },
  {
    "postscriptName": "GoudyStout",
    "fullName": "Goudy Stout",
    "family": "Goudy Stout",
    "style": "Regular"
  },
  {
    "postscriptName": "Haettenschweiler",
    "fullName": "Haettenschweiler",
    "family": "Haettenschweiler",
    "style": "Regular"
  },
  {
    "postscriptName": "HarlowSolid",
    "fullName": "Harlow Solid Italic",
    "family": "Harlow Solid",
    "style": "Italic"
  },
  {
    "postscriptName": "Harrington",
    "fullName": "Harrington",
    "family": "Harrington",
    "style": "Regular"
  },
  {
    "postscriptName": "HighTowerText-Italic",
    "fullName": "High Tower Text Cursiva",
    "family": "High Tower Text",
    "style": "Italic"
  },
  {
    "postscriptName": "HighTowerText-Reg",
    "fullName": "High Tower Text",
    "family": "High Tower Text",
    "style": "Regular"
  },
  {
    "postscriptName": "Impact",
    "fullName": "Impact",
    "family": "Impact",
    "style": "Regular"
  },
  {
    "postscriptName": "ImprintMT-Shadow",
    "fullName": "Imprint MT Shadow",
    "family": "Imprint MT Shadow",
    "style": "Regular"
  },
  {
    "postscriptName": "InformalRoman-Regular",
    "fullName": "Informal Roman",
    "family": "Informal Roman",
    "style": "Regular"
  },
  {
    "postscriptName": "InkFree",
    "fullName": "Ink Free",
    "family": "Ink Free",
    "style": "Regular"
  },
  {
    "postscriptName": "JavaneseText",
    "fullName": "Javanese Text",
    "family": "Javanese Text",
    "style": "Regular"
  },
  {
    "postscriptName": "Jokerman-Regular",
    "fullName": "Jokerman",
    "family": "Jokerman",
    "style": "Regular"
  },
  {
    "postscriptName": "JuiceITC-Regular",
    "fullName": "Juice ITC",
    "family": "Juice ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "KristenITC-Regular",
    "fullName": "Kristen ITC",
    "family": "Kristen ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "KunstlerScript",
    "fullName": "Kunstler Script",
    "family": "Kunstler Script",
    "style": "Regular"
  },
  {
    "postscriptName": "LatinWide",
    "fullName": "Wide Latin",
    "family": "Wide Latin",
    "style": "Regular"
  },
  {
    "postscriptName": "Leelawadee",
    "fullName": "Leelawadee",
    "family": "Leelawadee",
    "style": "Regular"
  },
  {
    "postscriptName": "Leelawadee-Bold",
    "fullName": "Leelawadee Negreta",
    "family": "Leelawadee",
    "style": "Bold"
  },
  {
    "postscriptName": "LeelawadeeUI",
    "fullName": "Leelawadee UI",
    "family": "Leelawadee UI",
    "style": "Regular"
  },
  {
    "postscriptName": "LeelawadeeUI-Bold",
    "fullName": "Leelawadee UI Negreta",
    "family": "Leelawadee UI",
    "style": "Bold"
  },
  {
    "postscriptName": "LeelawadeeUI-Semilight",
    "fullName": "Leelawadee UI Semilight Normal",
    "family": "Leelawadee UI",
    "style": "Semilight"
  },
  {
    "postscriptName": "LucidaBright",
    "fullName": "Lucida Bright",
    "family": "Lucida Bright",
    "style": "Regular"
  },
  {
    "postscriptName": "LucidaBright-Demi",
    "fullName": "Lucida Bright Demibold",
    "family": "Lucida Bright",
    "style": "Demibold"
  },
  {
    "postscriptName": "LucidaBright-DemiItalic",
    "fullName": "Lucida Bright Demibold Italic",
    "family": "Lucida Bright",
    "style": "Demibold Italic"
  },
  {
    "postscriptName": "LucidaBright-Italic",
    "fullName": "Lucida Bright Italic",
    "family": "Lucida Bright",
    "style": "Italic"
  },
  {
    "postscriptName": "LucidaCalligraphy-Italic",
    "fullName": "Lucida Calligraphy Italic",
    "family": "Lucida Calligraphy",
    "style": "Italic"
  },
  {
    "postscriptName": "LucidaConsole",
    "fullName": "Lucida Console",
    "family": "Lucida Console",
    "style": "Regular"
  },
  {
    "postscriptName": "LucidaFax",
    "fullName": "Lucida Fax",
    "family": "Lucida Fax",
    "style": "Regular"
  },
  {
    "postscriptName": "LucidaFax-Demi",
    "fullName": "Lucida Fax halvfed",
    "family": "Lucida Fax",
    "style": "Demibold"
  },
  {
    "postscriptName": "LucidaFax-DemiItalic",
    "fullName": "Lucida Fax halvfed kursiv",
    "family": "Lucida Fax",
    "style": "Demibold Italic"
  },
  {
    "postscriptName": "LucidaFax-Italic",
    "fullName": "Lucida Fax kursiv",
    "family": "Lucida Fax",
    "style": "Italic"
  },
  {
    "postscriptName": "LucidaHandwriting-Italic",
    "fullName": "Lucida Handwriting kursiv",
    "family": "Lucida Handwriting",
    "style": "Italic"
  },
  {
    "postscriptName": "LucidaSans",
    "fullName": "Lucida Sans",
    "family": "Lucida Sans",
    "style": "Regular"
  },
  {
    "postscriptName": "LucidaSans-Demi",
    "fullName": "Lucida Sans halvfed",
    "family": "Lucida Sans",
    "style": "Demibold Roman"
  },
  {
    "postscriptName": "LucidaSans-DemiItalic",
    "fullName": "Lucida Sans halvfed kursiv",
    "family": "Lucida Sans",
    "style": "Demibold Italic"
  },
  {
    "postscriptName": "LucidaSans-Italic",
    "fullName": "Lucida Sans kursiv",
    "family": "Lucida Sans",
    "style": "Italic"
  },
  {
    "postscriptName": "LucidaSans-Typewriter",
    "fullName": "Lucida Sans Typewriter",
    "family": "Lucida Sans Typewriter",
    "style": "Regular"
  },
  {
    "postscriptName": "LucidaSans-TypewriterBold",
    "fullName": "Lucida Sans Typewriter fed",
    "family": "Lucida Sans Typewriter",
    "style": "Bold"
  },
  {
    "postscriptName": "LucidaSans-TypewriterBoldOblique",
    "fullName": "Lucida Sans Typewriter fed oblik",
    "family": "Lucida Sans Typewriter",
    "style": "Bold Oblique"
  },
  {
    "postscriptName": "LucidaSans-TypewriterOblique",
    "fullName": "Lucida Sans Typewriter oblik",
    "family": "Lucida Sans Typewriter",
    "style": "Oblique"
  },
  {
    "postscriptName": "LucidaSansUnicode",
    "fullName": "Lucida Sans Unicode",
    "family": "Lucida Sans Unicode",
    "style": "Regular"
  },
  {
    "postscriptName": "MS-Gothic",
    "fullName": "MS Gothic",
    "family": "MS Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "MS-PGothic",
    "fullName": "MS PGothic",
    "family": "MS PGothic",
    "style": "Regular"
  },
  {
    "postscriptName": "MS-UIGothic",
    "fullName": "MS UI Gothic",
    "family": "MS UI Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "MSOutlook",
    "fullName": "MS Outlook",
    "family": "MS Outlook",
    "style": "Regular"
  },
  {
    "postscriptName": "MSReferenceSansSerif",
    "fullName": "MS Reference Sans Serif",
    "family": "MS Reference Sans Serif",
    "style": "Regular"
  },
  {
    "postscriptName": "MSReferenceSpecialty",
    "fullName": "MS Reference Specialty",
    "family": "MS Reference Specialty",
    "style": "Regular"
  },
  {
    "postscriptName": "MT-Extra",
    "fullName": "MT Extra",
    "family": "MT Extra",
    "style": "Regular"
  },
  {
    "postscriptName": "MVBoli",
    "fullName": "MV Boli",
    "family": "MV Boli",
    "style": "Regular"
  },
  {
    "postscriptName": "Magneto-Bold",
    "fullName": "Magneto Negreta",
    "family": "Magneto",
    "style": "Bold"
  },
  {
    "postscriptName": "MaiandraGD-Regular",
    "fullName": "Maiandra GD",
    "family": "Maiandra GD",
    "style": "Regular"
  },
  {
    "postscriptName": "MalgunGothic",
    "fullName": "Malgun Gothic",
    "family": "Malgun Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "MalgunGothic-Semilight",
    "fullName": "Malgun Gothic Semilight",
    "family": "Malgun Gothic",
    "style": "Semilight"
  },
  {
    "postscriptName": "MalgunGothicBold",
    "fullName": "Malgun Gothic Bold",
    "family": "Malgun Gothic",
    "style": "Bold"
  },
  {
    "postscriptName": "Marlett",
    "fullName": "Marlett",
    "family": "Marlett",
    "style": "Regular"
  },
  {
    "postscriptName": "MaturaMTScriptCapitals",
    "fullName": "Matura MT Script Capitals",
    "family": "Matura MT Script Capitals",
    "style": "Regular"
  },
  {
    "postscriptName": "Microsoft Himalaya",
    "fullName": "Microsoft Himalaya",
    "family": "Microsoft Himalaya",
    "style": "Regular"
  },
  {
    "postscriptName": "Microsoft-Yi-Baiti",
    "fullName": "Microsoft Yi Baiti",
    "family": "Microsoft Yi Baiti",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftJhengHeiBold",
    "fullName": "Microsoft JhengHei Negreta",
    "family": "Microsoft JhengHei",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftJhengHeiLight",
    "fullName": "Microsoft JhengHei Light",
    "family": "Microsoft JhengHei",
    "style": "Light"
  },
  {
    "postscriptName": "MicrosoftJhengHeiRegular",
    "fullName": "Microsoft JhengHei",
    "family": "Microsoft JhengHei",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftJhengHeiUIBold",
    "fullName": "Microsoft JhengHei UI Negreta",
    "family": "Microsoft JhengHei UI",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftJhengHeiUILight",
    "fullName": "Microsoft JhengHei UI Light",
    "family": "Microsoft JhengHei UI",
    "style": "Light"
  },
  {
    "postscriptName": "MicrosoftJhengHeiUIRegular",
    "fullName": "Microsoft JhengHei UI",
    "family": "Microsoft JhengHei UI",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftNewTaiLue",
    "fullName": "Microsoft New Tai Lue",
    "family": "Microsoft New Tai Lue",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftNewTaiLue-Bold",
    "fullName": "Microsoft New Tai Lue Bold",
    "family": "Microsoft New Tai Lue",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftPhagsPa",
    "fullName": "Microsoft PhagsPa",
    "family": "Microsoft PhagsPa",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftPhagsPa-Bold",
    "fullName": "Microsoft PhagsPa Bold",
    "family": "Microsoft PhagsPa",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftSansSerif",
    "fullName": "Microsoft Sans Serif",
    "family": "Microsoft Sans Serif",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftTaiLe",
    "fullName": "Microsoft Tai Le",
    "family": "Microsoft Tai Le",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftTaiLe-Bold",
    "fullName": "Microsoft Tai Le Bold",
    "family": "Microsoft Tai Le",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftUighur",
    "fullName": "Microsoft Uighur",
    "family": "Microsoft Uighur",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftUighur-Bold",
    "fullName": "Microsoft Uighur Negreta",
    "family": "Microsoft Uighur",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftYaHei",
    "fullName": "Microsoft YaHei",
    "family": "Microsoft YaHei",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftYaHei-Bold",
    "fullName": "Microsoft YaHei Negreta",
    "family": "Microsoft YaHei",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftYaHeiLight",
    "fullName": "Microsoft YaHei Light",
    "family": "Microsoft YaHei",
    "style": "Light"
  },
  {
    "postscriptName": "MicrosoftYaHeiUI",
    "fullName": "Microsoft YaHei UI",
    "family": "Microsoft YaHei UI",
    "style": "Regular"
  },
  {
    "postscriptName": "MicrosoftYaHeiUI-Bold",
    "fullName": "Microsoft YaHei UI Negreta",
    "family": "Microsoft YaHei UI",
    "style": "Bold"
  },
  {
    "postscriptName": "MicrosoftYaHeiUILight",
    "fullName": "Microsoft YaHei UI Light",
    "family": "Microsoft YaHei UI",
    "style": "Light"
  },
  {
    "postscriptName": "Ming-Lt-HKSCS-ExtB",
    "fullName": "MingLiU_HKSCS-ExtB",
    "family": "MingLiU_HKSCS-ExtB",
    "style": "Regular"
  },
  {
    "postscriptName": "Ming-Lt-MSCS-ExtB",
    "fullName": "MingLiU_MSCS-ExtB",
    "family": "MingLiU_MSCS-ExtB",
    "style": "Regular"
  },
  {
    "postscriptName": "MingLiU-ExtB",
    "fullName": "MingLiU-ExtB",
    "family": "MingLiU-ExtB",
    "style": "Regular"
  },
  {
    "postscriptName": "Mistral",
    "fullName": "Mistral",
    "family": "Mistral",
    "style": "Regular"
  },
  {
    "postscriptName": "Modern-Regular",
    "fullName": "Modern No. 20",
    "family": "Modern No. 20",
    "style": "Regular"
  },
  {
    "postscriptName": "MongolianBaiti",
    "fullName": "Mongolian Baiti",
    "family": "Mongolian Baiti",
    "style": "Regular"
  },
  {
    "postscriptName": "MonotypeCorsiva",
    "fullName": "Monotype Corsiva",
    "family": "Monotype Corsiva",
    "style": "Regular"
  },
  {
    "postscriptName": "MyanmarText",
    "fullName": "Myanmar Text",
    "family": "Myanmar Text",
    "style": "Regular"
  },
  {
    "postscriptName": "MyanmarText-Bold",
    "fullName": "Myanmar Text Negreta",
    "family": "Myanmar Text",
    "style": "Bold"
  },
  {
    "postscriptName": "NSimSun",
    "fullName": "NSimSun",
    "family": "NSimSun",
    "style": "Regular"
  },
  {
    "postscriptName": "NiagaraEngraved-Reg",
    "fullName": "Niagara Engraved",
    "family": "Niagara Engraved",
    "style": "Regular"
  },
  {
    "postscriptName": "NiagaraSolid-Reg",
    "fullName": "Niagara Solid",
    "family": "Niagara Solid",
    "style": "Regular"
  },
  {
    "postscriptName": "NirmalaText",
    "fullName": "Nirmala Text",
    "family": "Nirmala Text",
    "style": "Regular"
  },
  {
    "postscriptName": "NirmalaText-Bold",
    "fullName": "Nirmala Text Negreta",
    "family": "Nirmala Text",
    "style": "Bold"
  },
  {
    "postscriptName": "NirmalaText-Semilight",
    "fullName": "Nirmala Text Semilight",
    "family": "Nirmala Text",
    "style": "Semilight"
  },
  {
    "postscriptName": "NirmalaUI",
    "fullName": "Nirmala UI",
    "family": "Nirmala UI",
    "style": "Regular"
  },
  {
    "postscriptName": "NirmalaUI-Bold",
    "fullName": "Nirmala UI Negreta",
    "family": "Nirmala UI",
    "style": "Bold"
  },
  {
    "postscriptName": "NirmalaUI-Semilight",
    "fullName": "Nirmala UI Semilight",
    "family": "Nirmala UI",
    "style": "Semilight"
  },
  {
    "postscriptName": "OCRAExtended",
    "fullName": "OCR A Extended",
    "family": "OCR A",
    "style": "Regular"
  },
  {
    "postscriptName": "OldEnglishTextMT",
    "fullName": "Old English Text MT",
    "family": "Old English Text MT",
    "style": "Regular"
  },
  {
    "postscriptName": "Onyx",
    "fullName": "Onyx",
    "family": "Onyx",
    "style": "Regular"
  },
  {
    "postscriptName": "PMingLiU-ExtB",
    "fullName": "PMingLiU-ExtB",
    "family": "PMingLiU-ExtB",
    "style": "Regular"
  },
  {
    "postscriptName": "PalaceScriptMT",
    "fullName": "Palace Script MT",
    "family": "Palace Script MT",
    "style": "Regular"
  },
  {
    "postscriptName": "PalatinoLinotype-Bold",
    "fullName": "Palatino Linotype Negreta",
    "family": "Palatino Linotype",
    "style": "Bold"
  },
  {
    "postscriptName": "PalatinoLinotype-BoldItalic",
    "fullName": "Palatino Linotype Negreta cursiva",
    "family": "Palatino Linotype",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "PalatinoLinotype-Italic",
    "fullName": "Palatino Linotype Cursiva",
    "family": "Palatino Linotype",
    "style": "Italic"
  },
  {
    "postscriptName": "PalatinoLinotype-Roman",
    "fullName": "Palatino Linotype",
    "family": "Palatino Linotype",
    "style": "Regular"
  },
  {
    "postscriptName": "Papyrus-Regular",
    "fullName": "Papyrus",
    "family": "Papyrus",
    "style": "Regular"
  },
  {
    "postscriptName": "Parchment-Regular",
    "fullName": "Parchment",
    "family": "Parchment",
    "style": "Regular"
  },
  {
    "postscriptName": "Perpetua",
    "fullName": "Perpetua",
    "family": "Perpetua",
    "style": "Regular"
  },
  {
    "postscriptName": "Perpetua-Bold",
    "fullName": "Perpetua Negreta",
    "family": "Perpetua",
    "style": "Bold"
  },
  {
    "postscriptName": "Perpetua-BoldItalic",
    "fullName": "Perpetua Negreta cursiva",
    "family": "Perpetua",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Perpetua-Italic",
    "fullName": "Perpetua Cursiva",
    "family": "Perpetua",
    "style": "Italic"
  },
  {
    "postscriptName": "PerpetuaTitlingMT-Bold",
    "fullName": "Perpetua Titling MT Negreta",
    "family": "Perpetua Titling MT",
    "style": "Bold"
  },
  {
    "postscriptName": "PerpetuaTitlingMT-Light",
    "fullName": "Perpetua Titling MT Light",
    "family": "Perpetua Titling MT",
    "style": "Light"
  },
  {
    "postscriptName": "Playbill",
    "fullName": "Playbill",
    "family": "Playbill",
    "style": "Regular"
  },
  {
    "postscriptName": "PoorRichard-Regular",
    "fullName": "Poor Richard",
    "family": "Poor Richard",
    "style": "Regular"
  },
  {
    "postscriptName": "Pristina-Regular",
    "fullName": "Pristina",
    "family": "Pristina",
    "style": "Regular"
  },
  {
    "postscriptName": "RageItalic",
    "fullName": "Rage Italic",
    "family": "Rage",
    "style": "Regular"
  },
  {
    "postscriptName": "Ravie",
    "fullName": "Ravie",
    "family": "Ravie",
    "style": "Regular"
  },
  {
    "postscriptName": "Rockwell",
    "fullName": "Rockwell",
    "family": "Rockwell",
    "style": "Regular"
  },
  {
    "postscriptName": "Rockwell-Bold",
    "fullName": "Rockwell Negreta",
    "family": "Rockwell",
    "style": "Bold"
  },
  {
    "postscriptName": "Rockwell-BoldItalic",
    "fullName": "Rockwell Negreta cursiva",
    "family": "Rockwell",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Rockwell-Condensed",
    "fullName": "Rockwell Condensed",
    "family": "Rockwell",
    "style": "Regular"
  },
  {
    "postscriptName": "Rockwell-CondensedBold",
    "fullName": "Rockwell Condensed Negreta",
    "family": "Rockwell",
    "style": "Bold"
  },
  {
    "postscriptName": "Rockwell-ExtraBold",
    "fullName": "Rockwell Extra Bold",
    "family": "Rockwell",
    "style": "Regular"
  },
  {
    "postscriptName": "Rockwell-Italic",
    "fullName": "Rockwell Cursiva",
    "family": "Rockwell",
    "style": "Italic"
  },
  {
    "postscriptName": "SansSerifCollection",
    "fullName": "Sans Serif Collection",
    "family": "Sans Serif Collection",
    "style": "Regular"
  },
  {
    "postscriptName": "ScriptMTBold",
    "fullName": "Script MT Bold",
    "family": "Script MT",
    "style": "Regular"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Display",
    "fullName": "Segoe UI Variable Display",
    "family": "Segoe UI Variable Display",
    "style": "Display"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Display-Bold",
    "fullName": "Segoe UI Variable Display Bold",
    "family": "Segoe UI Variable Display",
    "style": "Display Bold"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Display-Light",
    "fullName": "Segoe UI Variable Display Light",
    "family": "Segoe UI Variable Display",
    "style": "Display Light"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Display-Semibold",
    "fullName": "Segoe UI Variable Display Semibold",
    "family": "Segoe UI Variable Display",
    "style": "Display Semibold"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Display-Semilight",
    "fullName": "Segoe UI Variable Display Semilight",
    "family": "Segoe UI Variable Display",
    "style": "Display Semilight"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Small",
    "fullName": "Segoe UI Variable Small",
    "family": "Segoe UI Variable Small",
    "style": "Small"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Small-Bold",
    "fullName": "Segoe UI Variable Small Bold",
    "family": "Segoe UI Variable Small",
    "style": "Small Bold"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Small-Light",
    "fullName": "Segoe UI Variable Small Light",
    "family": "Segoe UI Variable Small",
    "style": "Small Light"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Small-Semibold",
    "fullName": "Segoe UI Variable Small Semibold",
    "family": "Segoe UI Variable Small",
    "style": "Small Semibold"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Small-Semilight",
    "fullName": "Segoe UI Variable Small Semilight",
    "family": "Segoe UI Variable Small",
    "style": "Small Semilight"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Text",
    "fullName": "Segoe UI Variable Text",
    "family": "Segoe UI Variable Text",
    "style": "Text"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Text-Bold",
    "fullName": "Segoe UI Variable Text Bold",
    "family": "Segoe UI Variable Text",
    "style": "Text Bold"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Text-Light",
    "fullName": "Segoe UI Variable Text Light",
    "family": "Segoe UI Variable Text",
    "style": "Text Light"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Text-Semibold",
    "fullName": "Segoe UI Variable Text Semibold",
    "family": "Segoe UI Variable Text",
    "style": "Text Semibold"
  },
  {
    "postscriptName": "Segoe-UI-Variable-Text-Semilight",
    "fullName": "Segoe UI Variable Text Semilight",
    "family": "Segoe UI Variable Text",
    "style": "Text Semilight"
  },
  {
    "postscriptName": "SegoeFluentIcons",
    "fullName": "Segoe Fluent Icons",
    "family": "Segoe Fluent Icons",
    "style": "Regular"
  },
  {
    "postscriptName": "SegoeMDL2Assets",
    "fullName": "Segoe MDL2 Assets",
    "family": "Segoe MDL2 Assets",
    "style": "Regular"
  },
  {
    "postscriptName": "SegoePrint",
    "fullName": "Segoe Print",
    "family": "Segoe Print",
    "style": "Regular"
  },
  {
    "postscriptName": "SegoePrint-Bold",
    "fullName": "Segoe Print Bold",
    "family": "Segoe Print",
    "style": "Bold"
  },
  {
    "postscriptName": "SegoeScript",
    "fullName": "Segoe Script",
    "family": "Segoe Script",
    "style": "Regular"
  },
  {
    "postscriptName": "SegoeScript-Bold",
    "fullName": "Segoe Script Negreta",
    "family": "Segoe Script",
    "style": "Bold"
  },
  {
    "postscriptName": "SegoeUI",
    "fullName": "Segoe UI",
    "family": "Segoe UI",
    "style": "Regular"
  },
  {
    "postscriptName": "SegoeUI-Bold",
    "fullName": "Segoe UI Negreta",
    "family": "Segoe UI",
    "style": "Bold"
  },
  {
    "postscriptName": "SegoeUI-BoldItalic",
    "fullName": "Segoe UI Negreta Cursiva",
    "family": "Segoe UI",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "SegoeUI-Italic",
    "fullName": "Segoe UI Cursiva",
    "family": "Segoe UI",
    "style": "Italic"
  },
  {
    "postscriptName": "SegoeUI-Light",
    "fullName": "Segoe UI Light",
    "family": "Segoe UI",
    "style": "Light"
  },
  {
    "postscriptName": "SegoeUI-LightItalic",
    "fullName": "Segoe UI Light Italic",
    "family": "Segoe UI",
    "style": "Light Italic"
  },
  {
    "postscriptName": "SegoeUI-Semibold",
    "fullName": "Segoe UI Semibold",
    "family": "Segoe UI",
    "style": "Semibold"
  },
  {
    "postscriptName": "SegoeUI-SemiboldItalic",
    "fullName": "Segoe UI Semibold Italic",
    "family": "Segoe UI",
    "style": "Semibold Italic"
  },
  {
    "postscriptName": "SegoeUI-Semilight",
    "fullName": "Segoe UI Semilight",
    "family": "Segoe UI",
    "style": "Semilight"
  },
  {
    "postscriptName": "SegoeUI-SemilightItalic",
    "fullName": "Segoe UI Semilight Italic",
    "family": "Segoe UI",
    "style": "Semilight Italic"
  },
  {
    "postscriptName": "SegoeUIBlack",
    "fullName": "Segoe UI Black",
    "family": "Segoe UI",
    "style": "Black"
  },
  {
    "postscriptName": "SegoeUIBlack-Italic",
    "fullName": "Segoe UI Black Italic",
    "family": "Segoe UI",
    "style": "Black Italic"
  },
  {
    "postscriptName": "SegoeUIEmoji",
    "fullName": "Segoe UI Emoji",
    "family": "Segoe UI Emoji",
    "style": "Regular"
  },
  {
    "postscriptName": "SegoeUIHistoric",
    "fullName": "Segoe UI Historic",
    "family": "Segoe UI Historic",
    "style": "Regular"
  },
  {
    "postscriptName": "SegoeUISymbol",
    "fullName": "Segoe UI Symbol",
    "family": "Segoe UI Symbol",
    "style": "Regular"
  },
  {
    "postscriptName": "ShowcardGothic-Reg",
    "fullName": "Showcard Gothic",
    "family": "Showcard Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "SimSun",
    "fullName": "SimSun",
    "family": "SimSun",
    "style": "Regular"
  },
  {
    "postscriptName": "SimSun-ExtB",
    "fullName": "SimSun-ExtB",
    "family": "SimSun-ExtB",
    "style": "Regular"
  },
  {
    "postscriptName": "SimSun-ExtG",
    "fullName": "SimSun-ExtG",
    "family": "SimSun-ExtG",
    "style": "Regular"
  },
  {
    "postscriptName": "Sitka-Banner",
    "fullName": "Sitka Banner",
    "family": "Sitka Banner",
    "style": "Banner"
  },
  {
    "postscriptName": "Sitka-Banner-Bold",
    "fullName": "Sitka Banner Bold",
    "family": "Sitka Banner",
    "style": "Banner Bold"
  },
  {
    "postscriptName": "Sitka-Banner-Bold-Italic",
    "fullName": "Sitka Banner Bold Italic",
    "family": "Sitka Banner",
    "style": "Banner Bold Italic"
  },
  {
    "postscriptName": "Sitka-Banner-Italic",
    "fullName": "Sitka Banner Italic",
    "family": "Sitka Banner",
    "style": "Banner Italic"
  },
  {
    "postscriptName": "Sitka-Banner-Semibold",
    "fullName": "Sitka Banner Semibold",
    "family": "Sitka Banner",
    "style": "Banner Semibold"
  },
  {
    "postscriptName": "Sitka-Banner-Semibold-Italic",
    "fullName": "Sitka Banner Semibold Italic",
    "family": "Sitka Banner",
    "style": "Banner Semibold Italic"
  },
  {
    "postscriptName": "Sitka-Display",
    "fullName": "Sitka Display",
    "family": "Sitka Display",
    "style": "Display"
  },
  {
    "postscriptName": "Sitka-Display-Bold",
    "fullName": "Sitka Display Bold",
    "family": "Sitka Display",
    "style": "Display Bold"
  },
  {
    "postscriptName": "Sitka-Display-Bold-Italic",
    "fullName": "Sitka Display Bold Italic",
    "family": "Sitka Display",
    "style": "Display Bold Italic"
  },
  {
    "postscriptName": "Sitka-Display-Italic",
    "fullName": "Sitka Display Italic",
    "family": "Sitka Display",
    "style": "Display Italic"
  },
  {
    "postscriptName": "Sitka-Display-Semibold",
    "fullName": "Sitka Display Semibold",
    "family": "Sitka Display",
    "style": "Display Semibold"
  },
  {
    "postscriptName": "Sitka-Display-Semibold-Italic",
    "fullName": "Sitka Display Semibold Italic",
    "family": "Sitka Display",
    "style": "Display Semibold Italic"
  },
  {
    "postscriptName": "Sitka-Heading",
    "fullName": "Sitka Heading",
    "family": "Sitka Heading",
    "style": "Heading"
  },
  {
    "postscriptName": "Sitka-Heading-Bold",
    "fullName": "Sitka Heading Bold",
    "family": "Sitka Heading",
    "style": "Heading Bold"
  },
  {
    "postscriptName": "Sitka-Heading-Bold-Italic",
    "fullName": "Sitka Heading Bold Italic",
    "family": "Sitka Heading",
    "style": "Heading Bold Italic"
  },
  {
    "postscriptName": "Sitka-Heading-Italic",
    "fullName": "Sitka Heading Italic",
    "family": "Sitka Heading",
    "style": "Heading Italic"
  },
  {
    "postscriptName": "Sitka-Heading-Semibold",
    "fullName": "Sitka Heading Semibold",
    "family": "Sitka Heading",
    "style": "Heading Semibold"
  },
  {
    "postscriptName": "Sitka-Heading-Semibold-Italic",
    "fullName": "Sitka Heading Semibold Italic",
    "family": "Sitka Heading",
    "style": "Heading Semibold Italic"
  },
  {
    "postscriptName": "Sitka-Small",
    "fullName": "Sitka Small",
    "family": "Sitka Small",
    "style": "Small"
  },
  {
    "postscriptName": "Sitka-Small-Bold",
    "fullName": "Sitka Small Bold",
    "family": "Sitka Small",
    "style": "Small Bold"
  },
  {
    "postscriptName": "Sitka-Small-Bold-Italic",
    "fullName": "Sitka Small Bold Italic",
    "family": "Sitka Small",
    "style": "Small Bold Italic"
  },
  {
    "postscriptName": "Sitka-Small-Italic",
    "fullName": "Sitka Small Italic",
    "family": "Sitka Small",
    "style": "Small Italic"
  },
  {
    "postscriptName": "Sitka-Small-Semibold",
    "fullName": "Sitka Small Semibold",
    "family": "Sitka Small",
    "style": "Small Semibold"
  },
  {
    "postscriptName": "Sitka-Small-Semibold-Italic",
    "fullName": "Sitka Small Semibold Italic",
    "family": "Sitka Small",
    "style": "Small Semibold Italic"
  },
  {
    "postscriptName": "Sitka-Subheading",
    "fullName": "Sitka Subheading",
    "family": "Sitka Subheading",
    "style": "Subheading"
  },
  {
    "postscriptName": "Sitka-Subheading-Bold",
    "fullName": "Sitka Subheading Bold",
    "family": "Sitka Subheading",
    "style": "Subheading Bold"
  },
  {
    "postscriptName": "Sitka-Subheading-Bold-Italic",
    "fullName": "Sitka Subheading Bold Italic",
    "family": "Sitka Subheading",
    "style": "Subheading Bold Italic"
  },
  {
    "postscriptName": "Sitka-Subheading-Italic",
    "fullName": "Sitka Subheading Italic",
    "family": "Sitka Subheading",
    "style": "Subheading Italic"
  },
  {
    "postscriptName": "Sitka-Subheading-Semibold",
    "fullName": "Sitka Subheading Semibold",
    "family": "Sitka Subheading",
    "style": "Subheading Semibold"
  },
  {
    "postscriptName": "Sitka-Subheading-Semibold-Italic",
    "fullName": "Sitka Subheading Semibold Italic",
    "family": "Sitka Subheading",
    "style": "Subheading Semibold Italic"
  },
  {
    "postscriptName": "Sitka-Text",
    "fullName": "Sitka Text",
    "family": "Sitka Text",
    "style": "Text"
  },
  {
    "postscriptName": "Sitka-Text-Bold",
    "fullName": "Sitka Text Bold",
    "family": "Sitka Text",
    "style": "Text Bold"
  },
  {
    "postscriptName": "Sitka-Text-Bold-Italic",
    "fullName": "Sitka Text Bold Italic",
    "family": "Sitka Text",
    "style": "Text Bold Italic"
  },
  {
    "postscriptName": "Sitka-Text-Italic",
    "fullName": "Sitka Text Italic",
    "family": "Sitka Text",
    "style": "Text Italic"
  },
  {
    "postscriptName": "Sitka-Text-Semibold",
    "fullName": "Sitka Text Semibold",
    "family": "Sitka Text",
    "style": "Text Semibold"
  },
  {
    "postscriptName": "Sitka-Text-Semibold-Italic",
    "fullName": "Sitka Text Semibold Italic",
    "family": "Sitka Text",
    "style": "Text Semibold Italic"
  },
  {
    "postscriptName": "SnapITC-Regular",
    "fullName": "Snap ITC",
    "family": "Snap ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "Stencil",
    "fullName": "Stencil",
    "family": "Stencil",
    "style": "Regular"
  },
  {
    "postscriptName": "Sylfaen",
    "fullName": "Sylfaen",
    "family": "Sylfaen",
    "style": "Regular"
  },
  {
    "postscriptName": "SymbolMT",
    "fullName": "Symbol",
    "family": "Symbol",
    "style": "Regular"
  },
  {
    "postscriptName": "Tahoma",
    "fullName": "Tahoma",
    "family": "Tahoma",
    "style": "Regular"
  },
  {
    "postscriptName": "Tahoma-Bold",
    "fullName": "Tahoma Negreta",
    "family": "Tahoma",
    "style": "Bold"
  },
  {
    "postscriptName": "TempusSansITC",
    "fullName": "Tempus Sans ITC",
    "family": "Tempus Sans ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "TimesNewRomanPS-BoldItalicMT",
    "fullName": "Times New Roman Negreta cursiva",
    "family": "Times New Roman",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "TimesNewRomanPS-BoldMT",
    "fullName": "Times New Roman Negreta",
    "family": "Times New Roman",
    "style": "Bold"
  },
  {
    "postscriptName": "TimesNewRomanPS-ItalicMT",
    "fullName": "Times New Roman cursiva",
    "family": "Times New Roman",
    "style": "Italic"
  },
  {
    "postscriptName": "TimesNewRomanPSMT",
    "fullName": "Times New Roman",
    "family": "Times New Roman",
    "style": "Regular"
  },
  {
    "postscriptName": "Trebuchet-BoldItalic",
    "fullName": "Trebuchet MS Negreta cursiva",
    "family": "Trebuchet MS",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "TrebuchetMS",
    "fullName": "Trebuchet MS",
    "family": "Trebuchet MS",
    "style": "Regular"
  },
  {
    "postscriptName": "TrebuchetMS-Bold",
    "fullName": "Trebuchet MS Negreta",
    "family": "Trebuchet MS",
    "style": "Bold"
  },
  {
    "postscriptName": "TrebuchetMS-Italic",
    "fullName": "Trebuchet MS Cursiva",
    "family": "Trebuchet MS",
    "style": "Italic"
  },
  {
    "postscriptName": "TwCenMT-Bold",
    "fullName": "Tw Cen MT Negreta",
    "family": "Tw Cen MT",
    "style": "Bold"
  },
  {
    "postscriptName": "TwCenMT-BoldItalic",
    "fullName": "Tw Cen MT Negreta cursiva",
    "family": "Tw Cen MT",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "TwCenMT-Condensed",
    "fullName": "Tw Cen MT Condensed",
    "family": "Tw Cen MT",
    "style": "Regular"
  },
  {
    "postscriptName": "TwCenMT-CondensedBold",
    "fullName": "Tw Cen MT Condensed Negreta",
    "family": "Tw Cen MT",
    "style": "Bold"
  },
  {
    "postscriptName": "TwCenMT-CondensedExtraBold",
    "fullName": "Tw Cen MT Condensed Extra Bold",
    "family": "Tw Cen MT",
    "style": "Regular"
  },
  {
    "postscriptName": "TwCenMT-Italic",
    "fullName": "Tw Cen MT Cursiva",
    "family": "Tw Cen MT",
    "style": "Italic"
  },
  {
    "postscriptName": "TwCenMT-Regular",
    "fullName": "Tw Cen MT",
    "family": "Tw Cen MT",
    "style": "Regular"
  },
  {
    "postscriptName": "Verdana",
    "fullName": "Verdana",
    "family": "Verdana",
    "style": "Regular"
  },
  {
    "postscriptName": "Verdana-Bold",
    "fullName": "Verdana Negreta",
    "family": "Verdana",
    "style": "Bold"
  },
  {
    "postscriptName": "Verdana-BoldItalic",
    "fullName": "Verdana Negreta cursiva",
    "family": "Verdana",
    "style": "Bold Italic"
  },
  {
    "postscriptName": "Verdana-Italic",
    "fullName": "Verdana Cursiva",
    "family": "Verdana",
    "style": "Italic"
  },
  {
    "postscriptName": "VinerHandITC",
    "fullName": "Viner Hand ITC",
    "family": "Viner Hand ITC",
    "style": "Regular"
  },
  {
    "postscriptName": "Vivaldii",
    "fullName": "Vivaldi Cursiva",
    "family": "Vivaldi",
    "style": "Italic"
  },
  {
    "postscriptName": "VladimirScript",
    "fullName": "Vladimir Script",
    "family": "Vladimir Script",
    "style": "Regular"
  },
  {
    "postscriptName": "Webdings",
    "fullName": "Webdings",
    "family": "Webdings",
    "style": "Regular"
  },
  {
    "postscriptName": "Wingdings-Regular",
    "fullName": "Wingdings",
    "family": "Wingdings",
    "style": "Regular"
  },
  {
    "postscriptName": "Wingdings2",
    "fullName": "Wingdings 2",
    "family": "Wingdings 2",
    "style": "Regular"
  },
  {
    "postscriptName": "Wingdings3",
    "fullName": "Wingdings 3",
    "family": "Wingdings 3",
    "style": "Regular"
  },
  {
    "postscriptName": "YuGothic-Bold",
    "fullName": "Yu Gothic Bold",
    "family": "Yu Gothic",
    "style": "Bold"
  },
  {
    "postscriptName": "YuGothic-Light",
    "fullName": "Yu Gothic Light",
    "family": "Yu Gothic",
    "style": "Light"
  },
  {
    "postscriptName": "YuGothic-Medium",
    "fullName": "Yu Gothic Medium",
    "family": "Yu Gothic",
    "style": "Medium"
  },
  {
    "postscriptName": "YuGothic-Regular",
    "fullName": "Yu Gothic Regular",
    "family": "Yu Gothic",
    "style": "Regular"
  },
  {
    "postscriptName": "YuGothicUI-Bold",
    "fullName": "Yu Gothic UI Bold",
    "family": "Yu Gothic UI",
    "style": "Bold"
  },
  {
    "postscriptName": "YuGothicUI-Light",
    "fullName": "Yu Gothic UI Light",
    "family": "Yu Gothic UI",
    "style": "Light"
  },
  {
    "postscriptName": "YuGothicUI-Regular",
    "fullName": "Yu Gothic UI Regular",
    "family": "Yu Gothic UI",
    "style": "Regular"
  },
  {
    "postscriptName": "YuGothicUI-Semibold",
    "fullName": "Yu Gothic UI Semibold",
    "family": "Yu Gothic UI",
    "style": "Semibold"
  },
  {
    "postscriptName": "YuGothicUI-Semilight",
    "fullName": "Yu Gothic UI Semilight",
    "family": "Yu Gothic UI",
    "style": "Semilight"
  }
];

workingData.liveData = {
  "backgroundOn": true,
  "backgroundImage": "Angry",
  "banners": [
    {
      "id": "don42klcnx21w3erkxpi",
      "text": "DON'T PRAY FOR ME\nIf you think prayer works, bring your[[font-size:60%]]\n\"THOUGHTS and PRAYERS\"[[font-size:80%]]\n to SOMEONE WHO REALLY NEEDS IT",
      "bannerCSS": {
        "font": "34px/1.3 Arial black",
        "textAlign": "center",
        "color": "#ff5",
        "backgroundColor": "#f00",
        "onBox": true,
        "textShadow": "2px 2px #880"
      },
      "type": "rotating",
      "on": true
    },
    {
      "id": "lj1fgnhok49ay20hmxgn",
      "text": "I AM AN ATHEIST\nchange my mind*[[font-size: 70%]]\n* I don't really need you to change my mind[[font-size: 40%;color:gray;text-align:right;text-shadow:0 0]]",
      "bannerCSS": {
        "padding": "40px",
        "font": "bold 50px \"arial rounded mt\"",
        "textAlign": "center",
        "backgroundColor": "#82e",
        "onBox": true,
        "textShadow": "2px 2px black"
      },
      "type": "rotating",
      "on": true
    },
    {
      "id": "l8jmodrqe4fk36q18d08",
      "text": "What do you think nonbelievers aren't considering?\n* (C) 2025 Bored Atheist. All Rights Reserved.[[font-size: 40%;color:gray;text-align:right;text-shadow:0 0]]",
      "bannerCSS": {
        "padding": "40px",
        "font": "50px/1.1 'Palatino Linotype'",
        "backgroundColor": "#228",
        "onBox": true,
        "textShadow": "2px 2px black"
      },
      "type": "rotating",
      "on": true
    },
    {
      "id": "pd3a0sa8scwegy140878",
      "text": "The worst theist arguments:[[font-size: 120%;text-decoration: underline]]\n\n1. What year is it?\n2. You can't see air \n3. Satan believes in God\n4. Atheists only exist with God",
      "bannerCSS": {
        "padding": "40px",
        "font": "bold 24px/1.4 'Segoe Print',sans-serif",
        "textAlign": "left",
        "backgroundColor": "#282",
        "onBox": true,
        "textShadow": "1px 1px black"
      },
      "type": "rotating",
      "on": false
    },
    {
      "id": "lpokrtniy3",
      "text": "An NDE doesn't make you omnipotent\nwhy should I believe any NDE story[[font-size: 60%]]",
      "bannerCSS": {
        "padding": "40px 30px",
        "font": " 44px/1.3 'Bernard MT Condensed'",
        "textAlign": "center",
        "color": "#ff8",
        "backgroundColor": "#482",
        "onBox": true,
        "textShadow": "2px 2px black"
      },
      "type": "rotating",
      "on": true
    },
    {
      "id": "thfj4tqmlo41a2n6cz6k",
      "text": "ATHEISM IS\nUNSTOPPABLE*!!!\n* The Brandon Martin Memorial Asterisk[[font-size: 30%;color:gray;text-align:right;text-shadow:0 0]]",
      "bannerCSS": {
        "padding": "40px",
        "font": "bold 50px \"arial rounded mt\"",
        "textAlign": "center",
        "color": "#26f",
        "backgroundColor": "white",
        "onBox": true,
        "textShadow": "1px 1px black"
      },
      "type": "rotating",
      "on": false
    },
    {
      "id": "1svu7nnxu8",
      "text": "Slavery is bad[[font-size: 80%]]\nWE ALL* AGREE\nGod** doesn't, though[[font-size: 70%]]\n* I am amazed to learn we all don't[[font-size: 40%;color:gray;text-align:right;text-shadow:0 0]]\n** of the Bible[[font-size: 40%;color:gray;text-align:right;text-shadow:0 0]]",
      "bannerCSS": {
        "padding": "20px",
        "font": "50px/1.3 'Berlin Sans FB'",
        "textAlign": "center",
        "backgroundColor": "#040",
        "onBox": true
      },
      "type": "rotating",
      "on": true
    },
    {
      "id": "z8pu0pnk2bql1x5d2xrk",
      "text": "If God can only do logical things then he doesn't have free will*\n*only omniscient gods need apply[[font-size: 40%;color:gray]]",
      "bannerCSS": {
        "padding": "30px",
        "font": "46px/1.3 Impact",
        "backgroundColor": "#222",
        "onBox": true
      },
      "type": "rotating",
      "on": false
    },
    {
      "id": "3e3leoffqjm8tgrdxg",
      "text": "I BELIEVE\nIN A GOD\nCHANGE MY MIND[[font-size: 70%]]\nOR TELL ME WHY I SHOULD BELIEVE IN YOURS[[font-size: 50%]]",
      "bannerCSS": {
        "font": " 60px \"arial rounded mt\"",
        "textAlign": "center",
        "color": "",
        "backgroundColor": "#AAF",
        "onBox": true,
        "textShadow": "2px 2px black"
      },
      "type": "rotating",
      "on": false
    },
    {
      "id": "puxg1uk3xrj7n2999fcl",
      "text": "Show Me Your God Gives You An Objective Morality\nand he will give you one dollar[[font-size:60%]]",
      "bannerCSS": {
        "padding": "40px",
        "font": "50px/1.3 Cooper",
        "textAlign": "center",
        "onBox": true,
        "textShadow": "1px 1px black"
      },
      "type": "rotating",
      "on": false
    },
    {
      "id": "qrn3yw970d",
      "text": "Your gifts add time to the timer and force me to endure more of this nonsense",
      "bannerCSS": {
        "font": "50px/1.3 Ariel",
        "textAlign": "center",
        "backgroundColor": "green",
        "onBox": true
      },
      "type": "rotating",
      "on": false
    },
    {
      "id": "extkdesg59",
      "text": "It takes more faith to have faith than to not have faith\nand you can quote me on that[[font-size: 70%]]",
      "bannerCSS": {
        "padding": "40px",
        "font": "40px/1.3 sans-serif",
        "textAlign": "center",
        "onBox": true,
        "textShadow": "2px 2px black"
      },
      "type": "rotating",
      "on": true
    },
    {
      "id": "np2rjzecxd",
      "text": "If God's rampage wasn't in the bible, you'd think he was a villain in a bad action movie",
      "bannerCSS": {
        "font": "bold 40px/1.3 \"Agency FB\"",
        "textAlign": "center",
        "color": "#ff8",
        "backgroundColor": "#88f",
        "onBox": true,
        "textShadow": "2px 2px black"
      },
      "type": "rotating",
      "on": true
    },
    {
      "id": "sjdqh5awxl",
      "text": "Evolution has written on our hearts that there is no afterlife",
      "bannerCSS": {
        "font": "bold 50px/1.3 \"Calibri\"",
        "textAlign": "center",
        "backgroundColor": "#400",
        "onBox": true,
        "textShadow": "2px 2px black"
      },
      "type": "rotating",
      "on": false
    }
  ],
  "defaultBannerCSS": {
    "padding": "20px ",
    "font": "50px/1.3 impact",
    "textAlign": "right",
    "color": "white",
    "backgroundColor": "#f89",
    "onBox": false,
    "textShadow": "4px 4px black"
  },
  "displayBanners": true,
  "activeBanner": 12,
  "spots": [
    {
      "id": "6lymdetz1yf",
      "text": "I am 133% angry!!!@![[line-height:1]]\nstats don't lie![[font-size: 40%; transform: translate(10%)]]",
      "bannerCSS": {
        "padding": "60px 20px",
        "font": "bold 70px/1.3  \"Agency FB\"",
        "backgroundColor": "red",
        "onBox": true
      },
      "type": "spot"
    },
    {
      "id": "jdrhx3cda8",
      "text": "My favorite names today![[color:#8ff;font-size:80%]]\n\nOrnalius.Izbëçænstein.Pheadore\nareyoutokkingtome\njambiyay🐉\njigglypuff on the floor",
      "bannerCSS": {
        "color": "",
        "backgroundColor": "#770077",
        "onBox": true
      },
      "type": "spot"
    },
    {
      "id": "8hzswknvgj",
      "text": "The worst theist arguments:\n1. What year is it?\n2. You can't see air \n3. Satan believes in God\n4. Atheists only exist with God",
      "bannerCSS": {
        "textAlign": "left",
        "backgroundColor": "#282"
      },
      "type": "spot"
    },
    {
      "id": "fy8ix4pfughvowunnv6na",
      "text": "Sulfur.",
      "bannerCSS": {
        "padding": "100px"
      },
      "type": "spot"
    },
    {
      "id": "8oonsofz61",
      "text": "Shroudenfreude (/SHROW-den-froy'-da/) n. 1. The amusement you feel at someone defending the Shroud of Turin.",
      "bannerCSS": {
        "padding": "50px",
        "font": "30px/1.4 serif",
        "color": "#444",
        "backgroundColor": "#f8f8f8",
        "onBox": true,
        "textShadow": "0 0 "
      },
      "type": "spot"
    },
    {
      "id": "7qsgjzcugk7gtk4ubi3n",
      "text": "©opyright 2025[[transform: translate( -20%, 100%)]]\nPope Rhizic the Antifascist.[[transform: translate( -20%, 100%)]]\nAll Rights Reserved.[[transform: translate( -20%, 100%)]]",
      "bannerCSS": {
        "padding": "80px",
        "font": "30px serif",
        "textAlign": "left",
        "color": "#444",
        "backgroundColor": "#eee",
        "onBox": true,
        "textShadow": "0 0"
      },
      "type": "spot"
    },
    {
      "id": "kgggs3adazort5pt61kq",
      "text": "I am, in fact, an agnostic atheist.\nThis is not a contradiction.\nPlease refer to your local Google searching contraption for more details.",
      "bannerCSS": {},
      "type": "spot"
    },
    {
      "id": "sn9vacq1eo42xcbjzdcg",
      "text": "soup -> humans it feasible.[[font-size: 50%]]\nWell NOT choosing itself is a choice of free will isn’t?[[font-size: 50%]]\n you're asking people to anger you, sad![[font-size: 50%]]\nyou are ready sinin",
      "bannerCSS": {},
      "type": "spot"
    }
  ],
  "defaultSpotCSS": {
    "padding": "40px 10px",
    "font": "bold 30px/1.4 sans-serif",
    "textAlign": "center",
    "color": "white",
    "backgroundColor": "blue",
    "onBox": true,
    "textShadow": "4px 4px #444"
  },
  "displaySpots": false,
  "activeSpot": 1,
  "timer": {
    "on": true,
    "interval": 12,
    "countdown": 7,
    "waiting": false
  },
  "breakTimer": {
    "on": false,
    "interval": 9,
    "countdown": 1,
    "waiting": true
  },
  "saveToStorage": true
};

workingData.videoScene = {
  "preview": null,
  "live": "mollys back.mp4",
  "opts": {
    "loop": false,
    "autoplay": true
  },
  "files": [
    {
      "name": "NDEs.mp4"
    },
    {
      "name": "abiogenesis.mp4",
      "start": "0:14"
    },
    {
      "name": "dan_historical_jesus.mp4"
    },
    {
      "name": "eat your vegetables.mp4"
    },
    {
      "name": "generic gameshow.mp4"
    },
    {
      "name": "intermission.mp4"
    },
    {
      "name": "mollys back.mp4"
    }
  ]
};

workingData.counterScene = {
  "counters": [
    {
      "id": "3j330wovh6r",
      "name": "Christian mind reading",
      "value": 2,
      "show": true,
      "play": true,
      "lastIncrement": 1762706812309
    },
    {
      "id": "zp6d1x2zxv",
      "name": "\"Agnostic atheist?!\" ",
      "value": 7,
      "show": true,
      "play": true,
      "lastIncrement": 1762702850163
    },
    {
      "id": "4s41lnfw0ol",
      "name": "\"Something from nothing?!\"",
      "value": 2,
      "show": true,
      "play": true,
      "lastIncrement": 1762701021610
    },
    {
      "id": "zbauchxsgwa",
      "name": "Atheists don't exist",
      "value": 1,
      "show": true,
      "play": true,
      "lastIncrement": 1762701124309
    },
    {
      "id": "qqno5sntn9",
      "name": "\"accident\"",
      "value": 13,
      "show": true,
      "play": true,
      "lastIncrement": 1762702010158
    },
    {
      "id": "pc4fi8artum",
      "name": "No hate like Christian love",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762632950311
    },
    {
      "id": "n3m8lqcsjxj",
      "name": "Praying for me",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762632955306
    },
    {
      "id": "tvb3n8foe9",
      "name": "Atheism is a religion",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762634107959
    },
    {
      "id": "8qpatdpsdjy",
      "name": "Angry at God",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762632962417
    },
    {
      "id": "1698tyolzrd",
      "name": "Philbro",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762632942235
    },
    {
      "id": "68vs3r3wy32",
      "name": "Church hurt",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762635255612
    },
    {
      "id": "c2pg06yx8xl",
      "name": "Pascal's wager",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762640111477
    },
    {
      "id": "2jpuylu9cgn",
      "name": "Look at the trees!",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762036080261
    },
    {
      "id": "bjltodl9m2",
      "name": "Slavery is okay (!)",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762029014940
    },
    {
      "id": "3p3fgxbxlyo",
      "name": "Look at the trees! (expert level)",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762461047917
    },
    {
      "id": "dy8jxsi3ze8",
      "name": "More faith to be an atheist",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1761687281612
    },
    {
      "id": "wmju63our6a",
      "name": "The worst arguments",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762034319939
    },
    {
      "id": "m62t0hbdbg",
      "name": "Laws of thermodynamics",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762461679311
    },
    {
      "id": "otrbmblbjmf",
      "name": "Watchmaker fallacy",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1761685554698
    },
    {
      "id": "yxryt2pf53",
      "name": "They're not real Christians",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1761250934423
    },
    {
      "id": "kq8259ossja",
      "name": "Straw man",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1762377942556
    },
    {
      "id": "x02wmvv7g5",
      "name": "No atheists in foxholes",
      "value": 1,
      "show": true,
      "play": true,
      "lastIncrement": 1762705428353
    }
  ],
  "currentDate": "20251109",
  "history": {
    "20250924": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 1
      },
      {
        "name": "Christian mind reading",
        "value": 3
      },
      {
        "name": "Christian Love",
        "value": 1
      }
    ],
    "20250925": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 2
      }
    ],
    "20250927": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 8
      },
      {
        "name": "Christian mind reading",
        "value": 3
      },
      {
        "name": "No hate like Christian love",
        "value": 2
      },
      {
        "name": "Atheists don't exist",
        "value": 1
      }
    ],
    "20250928": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 1
      },
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Why so angry?",
        "value": 2
      },
      {
        "name": "More faith to be an atheist",
        "value": 1
      }
    ],
    "20250929": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 6
      },
      {
        "name": "Christian mind reading",
        "value": 3
      }
    ],
    "20251001": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 4
      },
      {
        "name": "Christian mind reading",
        "value": 2
      },
      {
        "name": "\"Something from nothing?!\"",
        "value": 1
      }
    ],
    "20251002": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 3
      },
      {
        "name": "Christian mind reading",
        "value": 2
      },
      {
        "name": "No hate like Christian love",
        "value": 2
      },
      {
        "name": "The worst arguments",
        "value": 1
      }
    ],
    "20251007": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 2
      }
    ],
    "20251008": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 3
      }
    ],
    "20251009": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 4
      },
      {
        "name": "Christian mind reading",
        "value": 2
      },
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Praying for me",
        "value": 1
      },
      {
        "name": "Atheism is a religion",
        "value": 2
      }
    ],
    "20251010": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 4
      },
      {
        "name": "Christian mind reading",
        "value": 6
      },
      {
        "name": "No hate like Christian love",
        "value": 2
      },
      {
        "name": "Pascal's wager",
        "value": 1
      }
    ],
    "20251011": [
      {
        "name": "Christian mind reading",
        "value": 1
      },
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Angry at God",
        "value": 1
      }
    ],
    "20251012": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 1
      },
      {
        "name": "Christian mind reading",
        "value": 1
      }
    ],
    "20251013": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 1
      }
    ],
    "20251016": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 1
      },
      {
        "name": "Christian mind reading",
        "value": 1
      },
      {
        "name": "The worst arguments",
        "value": 1
      }
    ],
    "20251017": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 2
      },
      {
        "name": "Christian mind reading",
        "value": 2
      },
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "The worst arguments",
        "value": 1
      },
      {
        "name": "Pascal's wager",
        "value": 1
      },
      {
        "name": "Look at the trees!",
        "value": 1
      }
    ],
    "20251019": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 4
      },
      {
        "name": "Christian mind reading",
        "value": 3
      },
      {
        "name": "Pascal's wager",
        "value": 1
      },
      {
        "name": "Look at the trees!",
        "value": 1
      },
      {
        "name": "Slavery is okay (!)",
        "value": 1
      }
    ],
    "20251022": [
      {
        "name": "Christian mind reading",
        "value": 1
      },
      {
        "name": "Atheism is a religion",
        "value": 1
      },
      {
        "name": "Pascal's wager",
        "value": 3
      },
      {
        "name": "Second law of thermodynamics",
        "value": 1
      },
      {
        "name": "Watchmaker fallacy",
        "value": 1
      }
    ],
    "20251023": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 1
      },
      {
        "name": "Christian mind reading",
        "value": 1
      },
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Pascal's wager",
        "value": 1
      },
      {
        "name": "Slavery is okay (!)",
        "value": 1
      },
      {
        "name": "They're not real Christians",
        "value": 1
      }
    ],
    "20251024": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 3
      },
      {
        "name": "Christian mind reading",
        "value": 3
      },
      {
        "name": "No hate like Christian love",
        "value": 2
      },
      {
        "name": "The worst arguments",
        "value": 1
      },
      {
        "name": "Slavery is okay (!)",
        "value": 1
      },
      {
        "name": "Watchmaker fallacy",
        "value": 1
      }
    ],
    "20251026": [
      {
        "name": "Christian mind reading",
        "value": 3
      },
      {
        "name": "No hate like Christian love",
        "value": 2
      },
      {
        "name": "More faith to be an atheist",
        "value": 1
      },
      {
        "name": "\"Something from nothing?!\"",
        "value": 1
      },
      {
        "name": "Pascal's wager",
        "value": 1
      }
    ],
    "20251028": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 2
      },
      {
        "name": "More faith to be an atheist",
        "value": 3
      },
      {
        "name": "Watchmaker fallacy",
        "value": 1
      }
    ],
    "20251029": [
      {
        "name": "Christian mind reading",
        "value": 1
      },
      {
        "name": "\"Something from nothing?!\"",
        "value": 2
      }
    ],
    "20251030": [
      {
        "name": "Christian mind reading",
        "value": 3
      },
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Angry at God",
        "value": 2
      },
      {
        "name": "Slavery is okay (!)",
        "value": 1
      }
    ],
    "20251031": [
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 6
      },
      {
        "name": "Christian mind reading",
        "value": 2
      },
      {
        "name": "\"Something from nothing?!\"",
        "value": 1
      },
      {
        "name": "Pascal's wager",
        "value": 1
      },
      {
        "name": "Look at the trees! (expert level)",
        "value": 1
      }
    ],
    "20251101": [
      {
        "name": "Christian mind reading",
        "value": 7
      },
      {
        "name": "Pascal's wager",
        "value": 1
      },
      {
        "name": "Look at the trees!",
        "value": 2
      },
      {
        "name": "Slavery is okay (!)",
        "value": 1
      }
    ],
    "20251102": [
      {
        "name": "\"Something from nothing?!\"",
        "value": 1
      },
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Christian mind reading",
        "value": 1
      }
    ],
    "20251105": [
      {
        "name": "No hate like Christian love",
        "value": 7
      },
      {
        "name": "Christian mind reading",
        "value": 4
      },
      {
        "name": "Pascal's wager",
        "value": 1
      },
      {
        "name": "Atheism is a religion",
        "value": 3
      },
      {
        "name": "Straw man",
        "value": 2
      },
      {
        "name": "Philbro",
        "value": 1
      }
    ],
    "20251106": [
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Christian mind reading",
        "value": 1
      },
      {
        "name": "Look at the trees! (expert level)",
        "value": 1
      },
      {
        "name": "Laws of thermodynamics",
        "value": 1
      }
    ],
    "20251108": [
      {
        "name": "No hate like Christian love",
        "value": 1
      },
      {
        "name": "Christian mind reading",
        "value": 6
      },
      {
        "name": "\"Agnostic atheist?!\" ",
        "value": 3
      },
      {
        "name": "Praying for me",
        "value": 1
      },
      {
        "name": "Atheism is a religion",
        "value": 1
      },
      {
        "name": "Angry at God",
        "value": 1
      },
      {
        "name": "Philbro",
        "value": 1
      },
      {
        "name": "Church hurt",
        "value": 1
      },
      {
        "name": "Pascal's wager",
        "value": 2
      }
    ]
  }
};

workingData.panelsScene = {
  "active": {
    "panel": "Las Lajas"
  }
};




export default workingData;




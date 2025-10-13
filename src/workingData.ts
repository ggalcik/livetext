import type { CounterScene } from "./features/scenes/Counter/types";

const dataNames = [
    // "MasterViewports", 
    // "fontList", 
    // "liveData", 
    // "videoScene", 
    "counterScene"
] as const;

export interface IWorkingData {
    counterScene?: CounterScene;
}
const workingData:IWorkingData = {};

workingData.counterScene = {
  "counters": [
    {
      "id": "zp6d1x2zxv",
      "name": "\"Agnostic atheist?!\" ",
      "value": 1,
      "show": true,
      "play": true,
      "lastIncrement": 1760274897633
    },
    {
      "id": "3j330wovh6r",
      "name": "Christian mind reading",
      "value": 1,
      "show": true,
      "play": true,
      "lastIncrement": 1760277798245
    },
    {
      "id": "pc4fi8artum",
      "name": "No hate like Christian love",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1760189267185
    },
    {
      "id": "zbauchxsgwa",
      "name": "Atheists don't exist",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1759056546776
    },
    {
      "id": "u1aktjza5mg",
      "name": "Why so angry?",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1759092489240
    },
    {
      "id": "dy8jxsi3ze8",
      "name": "More faith to be an atheist",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1759091063249
    },
    {
      "id": "4s41lnfw0ol",
      "name": "\"Something from nothing?!\"",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1759348566019
    },
    {
      "id": "wmju63our6a",
      "name": "The worst arguments",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1759432942449
    },
    {
      "id": "n3m8lqcsjxj",
      "name": "Praying for me",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1760043507507
    },
    {
      "id": "tvb3n8foe9",
      "name": "Atheism is a religion",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1760040261676
    },
    {
      "id": "c2pg06yx8xl",
      "name": "Pascal's wager",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1760125988444
    },
    {
      "id": "8qpatdpsdjy",
      "name": "Angry at God",
      "value": 0,
      "show": false,
      "play": true,
      "lastIncrement": 1760189208403
    }
  ],
  "currentDate": "20251012",
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
    ]
  }
};


export default workingData;




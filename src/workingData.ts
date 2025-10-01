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
      "value": 8,
      "show": true,
      "play": true,
      "lastChange": "manual",
      "lastIncrement": 1759007446179
    },
    {
      "id": "3j330wovh6r",
      "name": "Christian mind reading",
      "value": 3,
      "show": true,
      "play": false,
      "lastIncrement": 1759007431272
    },
    {
      "id": "pc4fi8artum",
      "name": "No hate like Christian love",
      "value": 2,
      "show": true,
      "play": false,
      "lastIncrement": 1758997580596
    },
    {
      "id": "zbauchxsgwa",
      "name": "Atheists don't exist",
      "value": 1,
      "show": true,
      "play": false,
      "lastIncrement": 1759056546776
    }
  ],
  "history": {
    "20250923": [],
    "20250924": [
      {
        "id": "zp6d1x2zxv",
        "name": "\"Agnostic atheist?!\" ",
        "value": 1,
        "show": true,
        "play": false,
        "lastChange": "manual",
        "lastIncrement": 1758744373422
      },
      {
        "id": "3j330wovh6r",
        "name": "Christian mind reading",
        "value": 3,
        "show": true,
        "play": false,
        "lastIncrement": 1758745020425
      },
      {
        "id": "pc4fi8artum",
        "name": "Christian Love",
        "value": 1,
        "show": true,
        "play": false,
        "lastIncrement": 1758744769892
      }
    ],
    "20250925": [
      {
        "id": "zp6d1x2zxv",
        "name": "\"Agnostic atheist?!\" ",
        "value": 2,
        "show": true,
        "play": false,
        "lastChange": "manual",
        "lastIncrement": 1758835381835
      }
    ],
    "20250926": [],
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
    ]
  }
};

export default workingData;




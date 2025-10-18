import {type JSX} from 'react';

export interface IPanels {
    [key: string]: {
        element: JSX.Element;
        sound: string
    };
}

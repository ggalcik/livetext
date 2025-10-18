import { MasterViewport } from "../../../components/MasterViewport/MasterViewport";

import type { IPanels } from "./types";
import {panels} from './config';

interface IInterstitialProps {
    which: keyof IPanels;
}

const defaultProps: Partial<IInterstitialProps> = {
    which: 'undefined'
}

export default function Interstitial(inProps: IInterstitialProps) {
    const props = { ...defaultProps, ...inProps };


    return (
        <div className="absolute w-full h-full bg-amber-900">

            <MasterViewport name="counter" noResize>
                {panels[props.which].element}

            </MasterViewport>
        </div>
    );
}



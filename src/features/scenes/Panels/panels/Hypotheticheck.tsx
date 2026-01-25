
import paper from './assets/blank-newspaper.jpg';

import {hypothetichecks} from './data';

export function HypotheticheckBackground() {

    return <div className="absolute top-0 left-0 w-full h-full bg-amber-500"
        ></div>
}

export function HypotheticheckAdmin() {

    return <></>;
}

export function Hypotheticheck() {


    // TODO: write used rheazons to storage, choose new ones that don't match, clear used reasons when all exhausted
    const hypotheticheck = hypothetichecks[Math.floor(Math.random() * hypothetichecks.length)]


    return (
        <>
         <div className="absolute w-[106%] h-[120%] top-8 border-10 rounded-[50px] border-red-600/70 bg-amber-400">
            
         </div>       
         <div className="absolute w-full h-[120%] top-0 border-10 rounded-[50px] border-red-400 bg-amber-200">
            <div className='absolute w-full text-center translate-y-[-50%] 
                text-6xl font-["Bauhaus_93"] text-white text-shadow-lg/100
                '>Hypotheticheck</div>
            <div className="absolute top-14  left-0  mx-6
            text-3xl  text-center font-bold font-[Bahnschrift] font-weight-bold font-stretch-semi-condensed text-red-900">
              {hypotheticheck}
                </div>

        </div>

      </>
    );
}
import { useCallback, useEffect, useRef, useState } from 'react';
// import aaaamennnn from '../../../../../src/local/soundboard/aaaamennnn.mp3';
// import gregorius from './assets/in_nominae_gregorius_no.png';
// import christolyzer from './assets/christolyzer.png';
import christolyzer from './assets/christolyzer_booting.png';
import christolyzerFail from './assets/christolyzer_red.png';
import christolyzerDarkLogo from './assets/christolyzer_darklogo2.png';
import christolyzerOffLogo from './assets/christolyzer_offlogo.png';
// import christolyzerDarkLogo from './assets/christolyzer_darklogo.png';
import christolyzerDarkScreen from './assets/christolyzer_darkscreen.png';
import christolyzerBooting from './assets/christolyzer_booting.png';
import christolyzerBootingTop from './assets/christolyzer_booting_readout.png';
import beepboop from './assets/beepboop.mp3';
import yesBeep from './assets/yes.mp3';
import noBeep from './assets/NO.mp3';
import failBuzz from './assets/fail.mp3';
import computerBoot from './assets/computer_boot.mp3';
import computerAmbient from './assets/computer_ambient2.ogg';
import computerBeep from './assets/computer_beep.mp3';
import computerClicks from './assets/computer_clicks.mp3';

import './Christolyzer.css';
import { randomSample, textToHtmlBreaks } from '../../../../helpers/helpers';
import { Button } from '../../../../components/Button';
import { christolyzerQuestions } from './data';

const VOLUME = 0.3;


export function ChristolyzerAdmin() {

    return <div className="absolute w-full h-full overflow-hidden">


    </div>
}

export function ChristolyzerBackground() {

    return <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/2 -left-1/2 scale-300 w-full h-full
     bg-blue-800 bg-no-repeat bg-cover bg-center"
        >

        </div>
    </div>
}

type QuizStage = 'init' | 1 | 2 | 3 | 4 | 5 | 'deciding' | 'fail';

const followingStage: Record<QuizStage, QuizStage | null> = {
    'init': 1,
    1: 2,
    2: 3,
    3: 4,
    4: 'deciding',
    5: 'deciding',
    'deciding': 'fail',
    'fail': null
}

type Choice = 'YES' | 'NO';

const yesnoBeep: Record<Choice, string> = {
    YES: yesBeep,
    NO: noBeep
}


export function Christolyzer() {
    const defaultDisplay = `Need to discern whether you're talking to a true Christian? Answer four questions to find out!

    Press "YES" to begin.`
    const helpDisplay = 'The Christ-O-Lyzer will ask four questions, and return the result "True Christian" if all answers are correct (based on responses previously provided by true Christians).';

    const [computing, setComputing] = useState(false);
    const [confirmingReset, setConfirmingReset] = useState(false);
    const [showingHelp, setShowingHelp] = useState(false);
    const [quizStage, setQuizStage] = useState<QuizStage>('init');
    const [pendingStage, setPendingStage] = useState<QuizStage | null>(null);
    const [isClearingDisplayText, setIsClearingDisplayText] = useState(false);
    const [isReadoutAnimatingIn, setIsReadoutAnimatingIn] = useState(false);
    const isQuestion = typeof quizStage === 'number';
    const [chosen, setChosen] = useState<null | Choice>(null);
    const [questionList, setQuestionList] = useState<string[]>(() => randomSample(christolyzerQuestions, 5));

    const beepboopRef = useRef<HTMLAudioElement | null>(null);
    const yesnoBeepRef = useRef<HTMLAudioElement | null>(null);
    const computerBootRef = useRef<HTMLAudioElement | null>(null);
    const computerAmbientRef = useRef<HTMLAudioElement | null>(null);
    const computerBeepRef = useRef<HTMLAudioElement | null>(null);
    const computerClicksRef = useRef<HTMLAudioElement | null>(null);
    const ambientStartTimerRef = useRef<number | null>(null);
    const computerClicksTimerRef = useRef<number | null>(null);
    const hasBootedRef = useRef(false);

    const scheduleComputerClicks = useCallback(() => {
        const delay = 8000 + Math.random() * 7000;
        computerClicksTimerRef.current = window.setTimeout(() => {
            if (computerClicksRef.current) {
                computerClicksRef.current.currentTime = 0;
                computerClicksRef.current.play().catch((err) => {
                    console.warn("Could not play computer clicks:", err);
                });
            }
            scheduleComputerClicks();
        }, delay);
    }, []);

    const startAmbient = useCallback(() => {
        if (computerAmbientRef.current) {
            computerAmbientRef.current.play().catch((err) => {
                console.warn("Could not play computer ambient:", err);
            });
        }

        if (computerClicksTimerRef.current === null) {
            scheduleComputerClicks();
        }
    }, [scheduleComputerClicks]);

    const stopAmbient = useCallback(() => {
        if (ambientStartTimerRef.current !== null) {
            window.clearTimeout(ambientStartTimerRef.current);
            ambientStartTimerRef.current = null;
        }

        if (computerClicksTimerRef.current !== null) {
            window.clearTimeout(computerClicksTimerRef.current);
            computerClicksTimerRef.current = null;
        }

        computerAmbientRef.current?.pause();
        computerClicksRef.current?.pause();
    }, []);

    useEffect(() => {
        let frameOne = 0;
        let frameTwo = 0;

        frameOne = window.requestAnimationFrame(() => {
            frameTwo = window.requestAnimationFrame(() => {
                setIsReadoutAnimatingIn(true);
            });
        });

        return () => {
            window.cancelAnimationFrame(frameOne);
            window.cancelAnimationFrame(frameTwo);
        };
    }, []);

    useEffect(() => {
        const computingStartTimer = window.setTimeout(() => {
            setComputing(true);
        }, 8000);

        const computingStopTimer = window.setTimeout(() => {
            setComputing(false);
        }, 10000);

        return () => {
            window.clearTimeout(computingStartTimer);
            window.clearTimeout(computingStopTimer);
            setComputing(false);
        };
    }, []);
    
    useEffect(() => {
        computerBootRef.current = new Audio(computerBoot);
        computerAmbientRef.current = new Audio(computerAmbient);
        computerBeepRef.current = new Audio(computerBeep);
        computerClicksRef.current = new Audio(computerClicks);

        computerBootRef.current.volume = VOLUME;
        computerAmbientRef.current.volume = VOLUME;
        computerBeepRef.current.volume = VOLUME;
        computerClicksRef.current.volume = VOLUME;
        computerAmbientRef.current.loop = true;

        hasBootedRef.current = true;
        computerBootRef.current.play().catch((err) => {
            console.warn("Could not play computer boot:", err);
        });

        ambientStartTimerRef.current = window.setTimeout(() => {
            computerBootRef.current?.pause();
            startAmbient();
        }, 11000);

        return () => {
            stopAmbient();
            computerBootRef.current?.pause();
            computerBeepRef.current?.pause();
        };
    }, [startAmbient, stopAmbient]);

    useEffect(() => {
        if (!hasBootedRef.current) return;

        if (quizStage === 'fail') {
            stopAmbient();
            return;
        }

        if (quizStage === 'init') {
            startAmbient();
        }
    }, [quizStage, startAmbient, stopAmbient]);
    useEffect(() => {
        if (!beepboopRef.current) {
            beepboopRef.current = new Audio(beepboop);
            beepboopRef.current.loop = true;
            beepboopRef.current.volume = VOLUME;
        }


        if (computing) {
            beepboopRef.current.play().catch((err) => {
                console.warn("Could not play sound:", err);
            });
        } else {
            beepboopRef.current.pause();
        }

        return () => {
            beepboopRef.current?.pause();
        };

    }, [computing])

    function getDisplayText() {
        if (quizStage === 'init') return defaultDisplay;
        if (quizStage === 'fail') return `*** NOT A TRUE CHRISTIAN
        
     Sorry, at least one response was incorrect and did not represent previous responses by true Christians.`;
        if (quizStage === 'deciding') return `
        
        Tabulating...`;
        if (typeof quizStage === 'number') return questionList[quizStage - 1];

        return "-- kzzktzt --";

    }

    function handleHelp() {
        setShowingHelp((previous) => !previous);
    }

    function handleReset() {
        setQuizStage('init');
        setPendingStage(null);
        setIsClearingDisplayText(false);
        setComputing(false);
        setConfirmingReset(false);
        setShowingHelp(false);
        setChosen(null);
        selectQuestions();
    }

    function handleChoice(choice: Choice) {

        yesnoBeepRef.current = new Audio(yesnoBeep[choice]);
        yesnoBeepRef.current.volume = VOLUME;
        yesnoBeepRef.current.play();

        if (quizStage !== 'init') {
            setChosen(choice);
            setTimeout(() => { prepNextStage(true) }, 1000);
            return;
        }

        prepNextStage(false);
    }

    function prepNextStage(shouldCompute: boolean = true) {
        const nextStage = followingStage[quizStage];
        if (quizStage !== 'init') setComputing(true);
        setPendingStage(nextStage);
        setIsClearingDisplayText(true);

        if (shouldCompute) {
            setComputing(true);
        }
    }

    function handleTextClearDone() {
        const delay = quizStage === 'init' ? 0 : 500;
        setTimeout(handleAdvanceStage, delay);
    }

    function playComputerBeep() {
        if (!computerBeepRef.current) return;

        computerBeepRef.current.currentTime = 0;
        computerBeepRef.current.play().catch((err) => {
            console.warn("Could not play computer beep:", err);
        });
    }

    function handleAdvanceStage() {
        if (!pendingStage) return;
        setChosen(null);
        setQuizStage(pendingStage);

        if (typeof pendingStage === 'number' ) {
        // if (typeof pendingStage === 'number' || pendingStage === 'deciding') {
        // if (pendingStage === 2 || pendingStage === 3 || pendingStage === 4 || pendingStage === 5 || pendingStage === 'deciding') {
            playComputerBeep();
        }

        if (pendingStage === 'deciding') {
            setTimeout(() => { 
                setQuizStage('fail');
                setComputing(false);
                yesnoBeepRef.current = new Audio(failBuzz);
                yesnoBeepRef.current.play();
            }, 3000);
        }

        setComputing(pendingStage === 'deciding');
        setPendingStage(null);
        setIsClearingDisplayText(false);
    }

    function selectQuestions() {
        setQuestionList(randomSample(christolyzerQuestions, 5));
    }

    let readoutStatus:string|null = null;
    if (typeof quizStage === 'number') readoutStatus = "Question "+quizStage;
    if (quizStage === 'fail') readoutStatus = "** FAIL **";

    return <div className="absolute w-full h-full overflow-hidden text-white animate-bootUp">

        <div className='theMainBox relative' >
            <img className="relative z-10 w-full" src={christolyzerBooting} />
            <img className="absolute animate-logoTopUp z-9 top-0 w-full" src={christolyzerBootingTop} />
            {/* <img className="relative z-10 w-full" src={christolyzer} /> */}
            {quizStage === 'fail' && <img className="absolute animate-blink z-10 w-full top-0" src={christolyzerFail} />}
            <img className="animate-logoFlicker absolute z-10 w-full top-0 pointer-events-none" src={christolyzerDarkLogo} />
            <img className="animate-logoPowerOn absolute z-10 w-full top-0 pointer-events-none" src={christolyzerOffLogo} />
            <img className="animate-screenOn absolute z-10 w-full top-0 pointer-events-none" src={christolyzerDarkScreen} />

            <div className={`theReadoutWrapper absolute z-1 top-0 left-0 w-full h-full pt-[12%] pl-[14%] pr-[15%] ${isReadoutAnimatingIn ? 'animate-logoTopUp' : ''}`}>
                <div className='theReadoutBox relative border w-full h-[14%] overflow-hidden'>
                     <div className='absolute w-full h-full bg-black'></div>
                    {computing && <div className='relative w-full h-full animate-computing'></div>}
                    {readoutStatus && !computing && <div className='relative text-green-300 font-["Press_Start_2P"] text-3xl p-[3%] w-full animate-slideIn'>{readoutStatus}</div>}
                </div>
            </div>

            <div className={`theDisplayWrapper animate-textOn absolute z-10 top-[40%] left-0 w-full overflow-hidden pl-[12%] pr-[13%] h-[35%]
                font-['Press_Start_2P'] text-gray-500`}>
                {!showingHelp &&
                    <div
                        className={`mainDisplay relative h-full ${isClearingDisplayText ? 'displayTextClear' : ''}`}
                        onAnimationEnd={handleTextClearDone}
                    >
                        <div className='displayText h-full'>
                            <div dangerouslySetInnerHTML={{ __html: textToHtmlBreaks(getDisplayText()) }} />
                            {isQuestion &&
                            <>
                                <div className='absolute bottom-0 flex w-full h-[35%]'>
                                    <div className={`flex w-1/2 h-full items-center justify-center text-xl ${chosen === 'YES' ? 'bg-gray-500 text-white' : ''}`}>YES</div>
                                    <div className={`flex w-1/2 h-full items-center justify-center text-xl ${chosen === 'NO' ? 'bg-gray-500 text-white' : ''}`}>NO</div>
                                </div>
                                <div className='absolute -bottom-20 flex w-full h-[35%]'>
Processing...
                                </div>

                            </>
                            }
                        </div>
                    </div>
                }
                {showingHelp && <div className='theHelpDisplay'>{helpDisplay}</div>}

            </div>

            <div className="absolute z-20 bottom-[4%] left-[14%] flex h-[14%] w-[72%] items-center">
                <div className="flex basis-[80%] justify-center gap-6 pr-2 font-bold">
                    <Button
                        type="button"
                        size="lg"
                        disabled={showingHelp || quizStage === 'fail' || quizStage === 'deciding'}
                        className="inline-flex h-16 min-w-[7rem] items-center justify-center !bg-green-600 px-10 py-0 font-sans text-xl leading-none text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_3px_0_rgba(0,0,0,0.35)] hover:!bg-green-500 active:translate-y-0.5 active:shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_1px_0_rgba(0,0,0,0.35)]"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleChoice('YES');
                        }}
                    >
                        YES
                    </Button>
                    <Button
                        type="button"
                        variant="c"
                        size="lg"
                        disabled={showingHelp || typeof quizStage !== 'number'}
                        className="inline-flex h-16 min-w-[7rem] items-center justify-center px-10 py-0 font-sans text-xl leading-none text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_3px_0_rgba(0,0,0,0.35)] active:translate-y-0.5 active:shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_1px_0_rgba(0,0,0,0.35)]"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleChoice('NO');
                        }}
                    >
                        NO
                    </Button>
                </div>

                <div className="flex basis-[20%] flex-col items-start gap-1 pl-2">
                    <Button
                        type="button"
                        variant={confirmingReset ? "c" : undefined}
                        disabled={showingHelp}
                        className={`inline-flex w-[80%] items-center justify-center px-2 font-sans text-sm leading-none text-white ${confirmingReset ? "" : "!bg-blue-700 hover:!bg-blue-600"}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            setConfirmingReset((previous) => !previous);
                        }}
                    >
                        {confirmingReset ? "Cancel" : "Reset"}
                    </Button>
                    <Button
                        type="button"
                        variant={confirmingReset ? "c" : undefined}
                        className={`inline-flex w-[80%] items-center justify-center px-2 font-sans text-sm leading-none text-white ${confirmingReset ? "" : "!bg-blue-700 hover:!bg-blue-600"} ${showingHelp ? "ring-blue-300" : ""}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            if (confirmingReset) {
                                handleReset();
                                return;
                            }
                            handleHelp();
                        }}
                    >
                        {confirmingReset ? "Reset" : "?"}
                    </Button>
                </div>
            </div>
        </div>
    </div>
}

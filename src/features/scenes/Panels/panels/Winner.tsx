import { useEffect, useRef } from 'react';
import { z } from 'zod';
import { Button } from '../../../../components/Button';
import { MasterViewport } from '../../../../components/MasterViewport/MasterViewport';
import { usePersistentState } from '../../../../hooks/usePersistentState';

const winnerPanelStorageKey = 'winnerPanel' as const;

const IWinnerPanelSchema = z.object({
    playing: z.boolean(),
});

const defaultWinnerPanel = {
    playing: false,
};

export function WinnerBackground() {
    return <div className="absolute top-0 left-0 w-full h-full bg-black"></div>;
}

export function WinnerAdmin() {
    const [winnerPanel, setWinnerPanel] = usePersistentState({
        storageKey: winnerPanelStorageKey,
        schema: IWinnerPanelSchema,
        fallback: defaultWinnerPanel,
    });

    function togglePlayback() {
        setWinnerPanel((previous) => ({ ...previous, playing: !previous.playing }));
    }

    return (
        <div className="">
            <Button onClick={togglePlayback}>
                {winnerPanel.playing ? 'Pause' : 'Play'}
            </Button>
            <div className="text-2xl [&>*]:max-w-[50vw]">
                <div>YOU'RE A WINNER!</div>

                <div>You have beat a random online atheist in verbal combat and you win tonight's showcase of prizes!</div>

                <div>Starting with - a deluxe TV stand by Broyhill Furniture! <br />Broyhill -- when only perfection will do.</div>

                <div>A year's supply of Rice-a-Roni, the San Francisco Treat!</div>

                <div>You'll also receive a copy of our home game!</div>

                <div>And - finally - our grand prize - One Debate Token!</div>

                <div>The Debate Token can be redeemed at our gift shop for a variety of prizes we assume you'd enjoy, such as:</div>

                <div>A hardbound edition of Kierkergaard's Concluding Unscientific Postscript to Philosphical Fragments, <br />or Concluding Unscientific Postscript to Philosophical Fragments, Abridged.</div>

                <div>Or a dinette set by Broyhill Furniture!  <br />Broyhill -- when only perfection will do.</div>

                <div>All of these prizes are now yours as a very special boy who has won an argument on the internet. Congratulations!</div>

            </div>
        </div>
    );
}

export function Winner() {
    const [winnerPanel, setWinnerPanel] = usePersistentState({
        storageKey: winnerPanelStorageKey,
        schema: IWinnerPanelSchema,
        fallback: defaultWinnerPanel,
    });
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (winnerPanel.playing) {
            video.play().catch((error) => {
                console.warn('Unable to play winner video:', error);
                setWinnerPanel((previous) => ({ ...previous, playing: false }));
            });
            return;
        }

        video.pause();
    }, [winnerPanel.playing, setWinnerPanel]);

    return (
        <MasterViewport name="panel Winner" needCtrl>
            <div className="w-full">
                <video
                    ref={videoRef}
                    src="/src/local/video/winner.mp4"
                    className="block w-full h-auto"
                    playsInline
                    onEnded={() => setWinnerPanel((previous) => ({ ...previous, playing: false }))}
                />
            </div>
        </MasterViewport>
    );
}

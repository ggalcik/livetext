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
        <div className="flex flex-col gap-4">
            <Button onClick={togglePlayback}>
                {winnerPanel.playing ? 'Pause' : 'Play'}
            </Button>
            <div className="text-4xl"></div>
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

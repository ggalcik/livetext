import { useState } from "react";
import { Accordion } from "../Accordion/Accordion";
import { Button } from "../../components/Button";
import type { ObsMessage } from "../../components/Relay/messages";
import { useRelay } from "../../components/Relay/useRelay";
import { OBS_BLIPS, type ObsBlipConfig, type ObsBlipName } from "./ObsBlipRegistry";
import type { BlipVariant } from "../Blip/types";

export default function ObsSourceAccordion() {
  const [activeBlip, setActiveBlip] = useState<{
    blip: ObsBlipName;
    eventId: string;
    variant?: string;
  } | null>(null);

  const { send, status } = useRelay({
    onMessage(message) {
      if (message.type !== "blip/status") return;
      if (message.status === "started") {
        setActiveBlip({
          blip: message.blip,
          eventId: message.eventId,
          variant: message.variant,
        });
      } else {
        setActiveBlip((current) => current?.eventId === message.eventId ? null : current);
      }
    },
  });

  const toggleBlip = (blip: ObsBlipName, requestedVariant?: string) => {
    if (status !== "connected") return;

    const config = OBS_BLIPS[blip] as ObsBlipConfig;
    const variant = requestedVariant ?? config.defaultVariant;
    const isMainButton = requestedVariant === undefined;
    const isActive = activeBlip?.blip === blip && (
      isMainButton || activeBlip.variant === variant
    );
    const eventId = isActive ? activeBlip.eventId : crypto.randomUUID();
    const command: ObsMessage = {
      type: isActive ? "blip/stop" : "blip/play",
      blip,
      eventId,
      variant,
    };
    send(command);
  };

  const sendBlipAction = (blip: ObsBlipName, action: string) => {
    if (status !== "connected") return;
    const message: ObsMessage = { type: "blip/action", blip, action };
    send(message);
  };

  const activeConfig = activeBlip
    ? OBS_BLIPS[activeBlip.blip] as ObsBlipConfig
    : null;
  const ExtendedComponent = activeConfig?.extendedComponent;

  return (
    <Accordion label="OBS source">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold">Blips</span>
          <span className={status === "connected" ? "text-green-700" : "text-red-700"}>
            relay: {status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 bg-green-200 p-2">
          {(Object.entries(OBS_BLIPS) as [ObsBlipName, ObsBlipConfig][])
            .map(([blip, config]) => {
              const isActive = activeBlip?.blip === blip;

              return (
                <div key={blip} className="group relative">
                  <Button
                    size="lg"
                    mode={isActive ? "activated" : undefined}
                    className="ring-black"
                    disabled={status !== "connected"}
                    onClick={() => toggleBlip(blip)}
                  >
                    {config.label ?? blip}
                  </Button>
                  {config.variants && (
                    <div className={`absolute left-0 top-full z-20 min-w-full pt-1 ${
                      isActive && activeBlip.variant ? "block" : "hidden group-hover:block"
                    }`}>
                      <div className="flex flex-col gap-1 rounded-lg bg-green-100 p-1 shadow-lg ring-1 ring-black/15">
                        {config.variants.map((variantEntry: BlipVariant) => {
                          const variant = typeof variantEntry === "string"
                            ? variantEntry
                            : variantEntry.variant;
                          const isVariantActive =
                            activeBlip?.blip === blip && activeBlip.variant === variant;

                          return (
                            <Button
                              key={`${blip}_${variant}`}
                              size="lg"
                              variant="b"
                              mode={isVariantActive ? "activated" : undefined}
                              className="whitespace-nowrap ring-black"
                              onClick={() => toggleBlip(blip, variant)}
                            >
                              {variant}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        {activeBlip && ExtendedComponent && (
          <div className="border-t border-black/20 bg-green-50 p-2">
            <ExtendedComponent
              sendAction={(action) => sendBlipAction(activeBlip.blip, action)}
            />
          </div>
        )}
        <div className="text-xs text-gray-600">
          Browser source: <code>http://localhost:5173/OBS</code>
        </div>
      </div>
    </Accordion>
  );
}

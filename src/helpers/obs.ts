import OBSWebSocket from "obs-websocket-js";

let client: OBSWebSocket | undefined;
let connecting: Promise<OBSWebSocket> | undefined;
let pending: Promise<unknown> = Promise.resolve();

async function getClient() {
    if (client) return client;
    if (connecting) return connecting;
    connecting = (async () => {
        const connection = new OBSWebSocket();
        await connection.connect(
            import.meta.env.VITE_OBS_WEBSOCKET_URL ?? "ws://127.0.0.1:4455",
            import.meta.env.VITE_OBS_WEBSOCKET_PASSWORD,
        );
        connection.once("ConnectionClosed", () => {
            if (client === connection) client = undefined;
        });
        client = connection;
        return connection;
    })();
    try {
        return await connecting;
    } finally {
        connecting = undefined;
    }
}

type SceneItem = { sourceName: string; sceneItemId: number; isGroup?: boolean };
type LocatedItem = SceneItem & { parent: string };

async function findItems(
    obs: OBSWebSocket,
    parent: string,
    names: Set<string>,
    isGroup = false,
): Promise<LocatedItem[]> {
    const { sceneItems } = await obs.call(
        isGroup ? "GetGroupSceneItemList" : "GetSceneItemList",
        { sceneName: parent },
    );
    const items = sceneItems as SceneItem[];
    const matches = items.filter(item => names.has(item.sourceName))
        .map(item => ({ ...item, parent }));
    for (const item of items) {
        if (item.isGroup) matches.push(...await findItems(obs, item.sourceName, names, true));
    }
    return matches;
}

/** Sets named sources/groups in the current program scene, including sources inside groups.
 * Include a group name explicitly to change the group's own visibility as well.
 * Calls run in order so a quick hide/show cannot finish with the source hidden.
 * Rejects on OBS errors or missing names; callers decide how to report failures.
 * Supply groupName to target only direct children of that group.
 */
export function setCurrentSceneSourcesVisible(
    sourceNames: readonly string[],
    visible: boolean,
    groupName?: string,
): Promise<void> {
    const names = new Set(sourceNames);
    const operation = pending.then(async () => {
        if (!names.size) return;
        const obs = await getClient();
        const { currentProgramSceneName } = await obs.call("GetCurrentProgramScene");
        const matches = await findItems(obs, currentProgramSceneName, names);
        const items = groupName === undefined ? matches : matches.filter(item => item.parent === groupName);
        const missing = [...names].filter(name => !items.some(item => item.sourceName === name));
        if (missing.length) throw new Error(`OBS sources not found in ${currentProgramSceneName}${groupName ? ` / ${groupName}` : ""}: ${missing.join(", ")}`);
        await Promise.all(items.map(item => obs.call("SetSceneItemEnabled", {
            sceneName: item.parent,
            sceneItemId: item.sceneItemId,
            sceneItemEnabled: visible,
        })));
    });
    pending = operation.catch(() => undefined);
    return operation;
}

/** Controls the main LiveText capture inside Basic without changing the group itself. */
export function setLivetextCaptureVisible(visible: boolean): Promise<void> {
    return setCurrentSceneSourcesVisible(["livetext capture"], visible, "Basic");
}

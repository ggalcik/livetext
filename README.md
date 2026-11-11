# React + TypeScript + Vite

## OBS source visibility

`src/helpers/obs.ts` exports `setCurrentSceneSourcesVisible(names, visible)`.
It connects directly to OBS WebSocket, independently of the browser-overlay relay,
and uses the current program (live) scene. Enable OBS's WebSocket server first.
The default address is `ws://127.0.0.1:4455`; configure
`VITE_OBS_WEBSOCKET_URL` and `VITE_OBS_WEBSOCKET_PASSWORD` in `.env.local` if needed,
then restart the dev server. Vite environment values are included in the client bundle.

```ts
await setCurrentSceneSourcesVisible(["livetext capture"], false);
await setCurrentSceneSourcesVisible(["Overlay group", "livetext capture"], true);
// Restrict matches to direct children of a particular group:
await setCurrentSceneSourcesVisible(["livetext capture"], false, "Basic");
// Preferred shortcut for the main capture (used by Forever):
await setLivetextCaptureVisible(false); // Basic → livetext capture
```

Sources inside groups are found automatically. Include the group name as well
when its own visibility should change; showing a child alone does not show a hidden
parent group. All occurrences with a matching name are affected. Nested scene
sources are not traversed. Missing names and OBS errors reject the returned promise.
Calls are serialized to preserve hide/show order.

Run the helper checks with `node --test tests/obs.test.cjs`.

## Banner OBS output

The OBS checkbox between the banner timers is saved in `liveData` (off by default).
With the banner scene selected and OBS checked, the `/OBS` browser source receives
only the visible banner and/or spot, including their text and combined CSS.
Playback stays in the local display; the relay includes only the active wheel's
interval and remaining seconds alongside the current content.
The overlay requests the current presentation again when it reconnects.

OBS routing hides `Basic`'s `livetext capture` while banner OBS output is active,
and restores it when OBS is unchecked or another display scene is selected.
Keep the `/OBS` browser source enabled in OBS. The overlay renders banners, spots,
and their countdown wheels. Breaks show the fixed Angry graphic in both displays;
the old background picker is no longer used.

Run the banner routing and payload checks with `node --test tests/banner-obs.test.cjs`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

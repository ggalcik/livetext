// copypaste to devtools
(() => {
  const snapshot = Object.fromEntries(Object.entries(localStorage));
  const script = `/* ===== localStorage snapshot =====
   date: ${new Date().toISOString()}
   origin: ${location.origin}
================================= */
(() => {
  const snapshot = ${JSON.stringify(snapshot, null, 2)};
  // localStorage.clear();
  Object.entries(snapshot).forEach(([k, v]) => localStorage.setItem(k, v));
  console.log("localStorage restored", Object.keys(snapshot));
})();`;
  // @ts-ignore
  copy(script);
  console.log("Restore script copied to clipboard.");
})();

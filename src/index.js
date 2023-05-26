const root =
  (typeof globalThis !== "undefined" && globalThis) ||
  (typeof self !== "undefined" && self) ||
  (typeof global !== "undefined" && global);

const polyfillEvent = () => {
  try {
    new root.Event('');
  } catch (error) {
    return true;
  }
  return false;
};

const polyfillEventTarget = () => {
  try {
    new root.EventTarget();
  } catch (error) {
    return true;
  }
  return false;
}

if (polyfillEvent()) {
  import('./event').then(module => {
    root.Event = module.default;
  });
}

if (polyfillEventTarget()) {
  import('./event-target').then(module => {
    root.EventTarget = module.default;
  });
}

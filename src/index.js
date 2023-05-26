import EventTargetPolyfill from './event-target';
import EventPolyfill from "./event";

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

if (polyfillEvent()) root.Event = EventPolyfill;
if (polyfillEventTarget()) root.EventTarget = EventTargetPolyfill;

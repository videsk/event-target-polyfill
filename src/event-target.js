function EventTargetPolyfill() {
  this.__listeners = new Map();
}

EventTargetPolyfill.prototype = Object.create(Object.prototype);

EventTargetPolyfill.prototype.addEventListener = function (type, listener, options) {
  if (arguments.length < 2) throw new TypeError(`Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);

  const actualType = type.toString();
  if (!this.__listeners.has(actualType)) this.__listeners.set(actualType, new Map());

  const listenersForType = this.__listeners.get(actualType);
  if (!listenersForType.has(listener)) listenersForType.set(listener, options);
}

EventTargetPolyfill.prototype.removeEventListener = function (type, listener, options) {
  if (arguments.length < 2) throw new TypeError(`Failed to execute 'removeEventListener' on 'EventTarget': 2 arguments required, but only ${arguments.length} present.`);

  const actualType = type.toString();
  if (!this.__listeners.has(actualType)) return;

  const listenersForType = this.__listeners.get(actualType);
  if (listenersForType.has(listener)) listenersForType.delete(listener);
}

EventTargetPolyfill.prototype.dispatchEvent = function (event) {
  if (!(event instanceof Event)) throw new TypeError( `Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.`);

  const type = event.type;
  const listenerForType = this.__listeners.get(type);

  if (!listenerForType) return true;

  for (const [listener, options] of listenerForType.entries()) {
    try {
      if (typeof listener === 'function') listener.call(this, event);
      else if (listener && typeof listener.handleEvent === 'function') listener.handleEvent(event);
    } catch (error) {
      /**
       * Note:
       *
       * We need to report the error to the global error handling event,
       * but we do not want to break the loop that is executing the events.
       * Unfortunately, this is the best we can do, which isn't great, because the
       * native EventTarget will actually do this synchronously before moving to the next
       * event in the loop.
       */
      setTimeout(() => {
        throw error;
      });
    }
    if (options && options.once) listenerForType.delete(listener);
  }
  return true;
}

export default EventTargetPolyfill;

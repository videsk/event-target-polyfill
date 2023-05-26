function EventPolyfill (type, options) {
  this.bubbles = !!options && !!options.bubbles;
  this.cancelable = !!options && !!options.cancelable;
  this.composed = !!options && !!options.composed;
  this.type = type;
}

export default EventPolyfill;

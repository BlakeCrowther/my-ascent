/**
 * When timeline cards and photos fade in. Each reveals once and then stays:
 * fading out again on the way past made phones flicker as momentum scrolling
 * and the collapsing toolbar nudged elements back and forth across the edge.
 * The bottom margin waits until an element is a little way onto the screen.
 */
export const REVEAL = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -10% 0px",
} as const;

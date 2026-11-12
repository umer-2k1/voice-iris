/*!
 * Voice orb by UV · https://github.com/umer-2k1/voice-iris
 * Copyright (c) 2026 UV · MIT License (see LICENSE). Keep this notice in copies.
 */

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Whether the visitor has asked for reduced motion. False on the server. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

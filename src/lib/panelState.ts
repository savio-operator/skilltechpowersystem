// Shared mutable ref bridging GSAP (ChMachine) → Three.js (SolarPanel3D)
// GSAP writes progress; useFrame reads it every tick.
export const panelState = { scrollProgress: 0 }

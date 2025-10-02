import type { Appearance } from "@clerk/types";

// Centralized Clerk appearance aligned to the app's Mocha theme
// Uses warm earthy tones defined in globals.css
export const clerkAppearance: Appearance = {
  elements: {
    drawerRoot: "z-[100]",
  },
};

export default clerkAppearance;




export const ASSISTANT_CONFIG = {
  MODEL_ID: 'gemini-2.5-flash',
  MAX_MESSAGE_LENGTH: 500,
  MAX_MESSAGES: 10,
  RATE_LIMIT: {
    MAX_REQUESTS: 10,
    WINDOW_MS: 60_000,
  },
  LAUNCHER: {
    /** Show launcher if WebGL event never fires */
    FALLBACK_MS: 8_000,
    /** Matches chat panel outer padding (p-4/p-6) + form padding (p-4) */
    BUTTON_POSITION_CLASS: 'fixed bottom-8 right-8 z-50 sm:bottom-10 sm:right-10',
  },
} as const

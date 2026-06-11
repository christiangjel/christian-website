export const ASSISTANT_CONFIG = {
  MODEL_ID: 'gemini-2.5-flash',
  MAX_MESSAGE_LENGTH: 500,
  MAX_MESSAGES: 10,
  /** Suggestions beyond this count are hidden below the `sm` breakpoint via CSS */
  MOBILE_SUGGESTED_PROMPT_COUNT: 2,
  RATE_LIMIT: {
    MAX_REQUESTS: 10,
    WINDOW_MS: 60_000,
  },
  LAUNCHER: {
    /** Show launcher if WebGL event never fires */
    FALLBACK_MS: 8_000,
    /** Aligns with chat panel send button (overlay padding + form inset) */
    BUTTON_POSITION_CLASS:
      'fixed bottom-10 right-10 z-50 sm:bottom-12 sm:right-12',
  },
} as const

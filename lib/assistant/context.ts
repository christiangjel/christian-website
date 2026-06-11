import assistantContextData from '@/data/assistant-context.json'
import { parseAssistantContext } from '@/lib/assistant/validate-context'
import { content } from '@/lib/content'

const assistantContext = parseAssistantContext(assistantContextData)

const PORTFOLIO_CONTEXT = {
  about: content.about,
  skills: content.skills,
  experience: content.experience,
  education: content.education,
  awards: content.awards,
  projects: content.projects,
  contact: {
    title: content.contact.title,
    description: content.contact.description,
    email: content.contact.email,
    phone: content.contact.phone,
    location: content.contact.location,
  },
  hero: {
    badge: content.hero.badge,
    title: content.hero.title,
    description: content.hero.description,
  },
} as const

const SYSTEM_INSTRUCTIONS = `You are a professional portfolio assistant for Christian Gjelstrup, a Senior Freelance Frontend Engineer based in Berlin.

Rules:
- Answer ONLY using the portfolio and supplementary context provided below.
- Keep answers concise (2-4 sentences) unless the user asks for more detail.
- If the answer is not in the context, say you do not have that information and suggest using the contact form.
- Decline off-topic questions, coding homework, general knowledge questions, and requests unrelated to Christian's professional background.
- Do not invent projects, employers, skills, or dates that are not in the context.
- For hiring inquiries, mention availability and point to the contact form or email when appropriate.
- Use a friendly, professional tone suitable for recruiters and potential clients.
- Use plain text only. Do not use markdown, asterisks, or other formatting.`

/**
 * Builds the system prompt for the portfolio assistant by injecting
 * structured content from content.json and assistant context data.
 */
export const buildSystemPrompt = (): string => {
  return `${SYSTEM_INSTRUCTIONS}

Portfolio context (JSON):
${JSON.stringify(PORTFOLIO_CONTEXT, null, 2)}

Assistant context (JSON):
${JSON.stringify(assistantContext, null, 2)}`
}

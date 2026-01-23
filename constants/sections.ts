export const SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  CONTACT: 'contact'
} as const

export type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS]

export const SECTION_IDS: readonly SectionId[] = Object.values(SECTIONS)

export const SECTION_ORDER: readonly SectionId[] = [
  SECTIONS.HERO,
  SECTIONS.ABOUT,
  SECTIONS.SKILLS,
  SECTIONS.PROJECTS,
  SECTIONS.EXPERIENCE,
  SECTIONS.EDUCATION,
  SECTIONS.CONTACT
] as const

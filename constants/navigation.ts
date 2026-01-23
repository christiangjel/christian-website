import { SECTIONS, type SectionId } from './sections'

export type NavigationItem = {
  title: string
  href: SectionId
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { title: 'About', href: SECTIONS.ABOUT },
  { title: 'Skills', href: SECTIONS.SKILLS },
  { title: 'Projects', href: SECTIONS.PROJECTS },
  { title: 'Experience', href: SECTIONS.EXPERIENCE },
  { title: 'Contact', href: SECTIONS.CONTACT }
] as const

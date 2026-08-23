import assistantContextData from '@/data/assistant-context.json'
import { SITE_CONFIG } from '@/constants'
import { localizePath } from '@/constants/locales'
import { getContent } from '@/lib/content'
import type { Content, ExperienceItem, Project } from '@/types/content'

type SupplementaryContext = {
  profile: {
    summary: string
    title: string
    website: string
    github: string
    linkedin: string
    workArrangement: string[]
  }
  freelance: {
    since: string
    availability: string
  }
  coreCompetencies: Record<string, string[]>
  additionalTechnologies: string[]
  cmsAndPlatforms: string[]
  industries: string[]
}

const supplementaryContext = assistantContextData as SupplementaryContext

const formatList = (items: readonly string[]): string =>
  items.map((item) => `- ${item}`).join('\n')

const formatExperienceItem = (item: ExperienceItem): string => {
  const company = item.companyLink
    ? `[${item.company}](${item.companyLink})`
    : item.company

  const lines = [`### ${item.title}`, `- **Period:** ${item.date}`]

  if (company) {
    lines.push(`- **Company:** ${company}`)
  }

  if (item.description) {
    lines.push(`- **Details:** ${item.description}`)
  }

  return lines.join('\n')
}

const formatProject = (project: Project): string => {
  const lines = [
    `### ${project.title}`,
    `- **Role:** ${project.role}`,
    `- **Client:** ${project.client}`,
    `- **Agency:** ${project.agency}`,
    `- **Description:** ${project.description}`,
    `- **Link:** ${project.link}`,
  ]

  if (project.awards?.length) {
    lines.push(`- **Awards:** ${project.awards.join(', ')}`)
  }

  return lines.join('\n')
}

const buildAboutSection = (content: Content): string =>
  [`## ${content.about.title}`, ...content.about.paragraphs].join('\n\n')

const buildSkillsSection = (content: Content): string => {
  const categories = content.skills.categories
    .map(
      (category) =>
        `### ${category.name}\n${formatList(category.items)}`
    )
    .join('\n\n')

  const softSkills = content.skills.softSkills?.length
    ? `\n\n### Additional skills\n${formatList(content.skills.softSkills)}`
    : ''

  return [`## ${content.skills.title}`, categories + softSkills].join('\n\n')
}

const buildExperienceSection = (content: Content): string => {
  const roles = content.experience.items.map(formatExperienceItem).join('\n\n')
  const languages = content.experience.languages?.length
    ? `\n\n### ${content.experience.languagesHeading}\n${content.experience.languages
        .map((language) => `- ${language.name}: ${language.level}`)
        .join('\n')}`
    : ''

  return [`## ${content.experience.title}`, roles + languages].join('\n\n')
}

const buildEducationSection = (content: Content): string => {
  const items = content.education.items
    .map(
      (item) =>
        [
          `### ${item.title}`,
          `- **Period:** ${item.date}`,
          `- **Institution:** ${item.institution}`,
          `- **Details:** ${item.description}`,
          `- **Link:** ${item.link}`,
        ].join('\n')
    )
    .join('\n\n')

  return [`## ${content.education.title}`, items].join('\n\n')
}

const buildAwardsSection = (content: Content): string => {
  const items = content.awards.items
    .map(
      (award) =>
        `- **${award.year}** — ${award.title} (${award.project}) — ${award.link}`
    )
    .join('\n')

  return [`## ${content.awards.title}`, items].join('\n\n')
}

const buildProjectsSection = (content: Content): string => {
  const categories = content.projects.categories
    .map(
      (category) =>
        `### ${category.label}\n\n${category.items.map(formatProject).join('\n\n')}`
    )
    .join('\n\n')

  return [`## ${content.projects.title}`, categories].join('\n\n')
}

const buildWebShopSection = (content: Content): string => {
  const categories = content.webShop.categories
    .map((category) => {
      const lines = [`### ${category.label}`, category.headline]

      if (category.paragraphs?.length) {
        lines.push(...category.paragraphs)
      }

      if (category.bullets?.length) {
        lines.push(formatList(category.bullets))
      }

      if (category.items?.length) {
        lines.push(
          category.items
            .map((item) => `- **${item.title}:** ${item.description}`)
            .join('\n')
        )
      }

      if (category.plans?.length) {
        lines.push(
          category.plans
            .map((plan) => {
              const planLines = [`#### ${plan.name}`]

              if (plan.priceLines?.length) {
                planLines.push(formatList(plan.priceLines))
              }

              if (plan.description) {
                planLines.push(plan.description)
              }

              if (plan.bullets?.length) {
                planLines.push(formatList(plan.bullets))
              }

              return planLines.join('\n')
            })
            .join('\n\n')
        )
      }

      if (category.demos?.length) {
        lines.push(
          category.demos.map((demo) => `- [${demo.label}](${demo.url})`).join('\n')
        )
      }

      if (category.closing) {
        lines.push(category.closing)
      }

      if (category.closingHeadline) {
        lines.push(`#### ${category.closingHeadline}`)
      }

      if (category.closingParagraphs?.length) {
        lines.push(...category.closingParagraphs)
      }

      return lines.join('\n\n')
    })
    .join('\n\n')

  return [`## ${content.webShop.title}`, categories].join('\n\n')
}

const buildContactSection = (content: Content): string => {
  const social = content.contact.social
    .map((item) => `- [${item.name}](${item.url})`)
    .join('\n')

  return [
    `## ${content.contact.title}`,
    content.contact.description,
    `- **Email:** ${content.contact.email}`,
    `- **Phone:** ${content.contact.phone}`,
    `- **Location:** ${content.contact.location}`,
    social,
  ].join('\n\n')
}

const buildSupplementarySection = (): string => {
  const { profile, freelance, coreCompetencies, additionalTechnologies, cmsAndPlatforms, industries } =
    supplementaryContext

  const competencyBlocks = Object.entries(coreCompetencies).map(
    ([name, items]) =>
      `### ${name.replace(/([A-Z])/g, ' $1').trim()}\n${formatList(items)}`
  )

  return [
    '## Professional profile',
    profile.summary,
    `- **Title:** ${profile.title}`,
    `- **Website:** ${profile.website}`,
    `- **GitHub:** ${profile.github}`,
    `- **LinkedIn:** ${profile.linkedin}`,
    `- **Work arrangement:** ${profile.workArrangement.join('; ')}`,
    `- **Freelance since:** ${freelance.since}`,
    `- **Availability:** ${freelance.availability}`,
    '## Core competencies',
    competencyBlocks.join('\n\n'),
    '## Additional technologies',
    formatList(additionalTechnologies),
    '## CMS and platforms',
    formatList(cmsAndPlatforms),
    '## Industries',
    formatList(industries),
  ].join('\n\n')
}

/**
 * Builds a single Markdown document containing the full English portfolio.
 */
export const buildPortfolioMarkdown = (): string => {
  const content = getContent('en')
  const baseUrl = SITE_CONFIG.BASE_URL

  return [
    `# ${content.meta.title}`,
    '',
    `> ${content.meta.description}`,
    '',
    `- **Site:** ${baseUrl}`,
    `- **Languages:** [English](${baseUrl}), [Danish](${baseUrl}${localizePath('da')}), [German](${baseUrl}${localizePath('de')})`,
    `- **Repository:** ${SITE_CONFIG.REPO_URL}`,
    '',
    buildAboutSection(content),
    buildSkillsSection(content),
    buildExperienceSection(content),
    buildEducationSection(content),
    buildAwardsSection(content),
    buildProjectsSection(content),
    buildWebShopSection(content),
    buildContactSection(content),
    buildSupplementarySection(),
  ].join('\n\n')
}

import type { SectionId } from '@/constants'

export type SocialLink = {
  name: string
  url: string
  icon: 'linkedin' | 'xing' | 'github'
}

export type ContactFormFieldErrors = {
  required: string
  minLength?: string
  maxLength?: string
  pattern?: string
  invalid?: string
}

export type ContactFormField = {
  label: string
  placeholder: string
  errors: ContactFormFieldErrors
}

export type ContactFormFields = {
  name: ContactFormField
  email: ContactFormField
  subject: ContactFormField
  message: ContactFormField
}

export type ContactFormSubmit = {
  label: string
  sending: string
  ariaLabel: string
  ariaLabelSending: string
}

export type ContactForm = {
  success: string
  validationError: string
  submissionError: string
  fields: ContactFormFields
  submit: ContactFormSubmit
}

export type Contact = {
  title: string
  description: string
  email: string
  phone: string
  location: string
  form: ContactForm
  social: SocialLink[]
}

export type SkillCategory = {
  name: string
  items: string[]
}

export type Skills = {
  title: string
  categories: SkillCategory[]
  softSkills?: string[]
  ariaLabels: {
    categories: string
  }
}

export type ExperienceItem = {
  date: string
  title: string
  description?: string
  company?: string
  companyLink?: string
}

export type Language = {
  name: string
  level: string
}

export type Experience = {
  title: string
  languagesHeading: string
  items: ExperienceItem[]
  languages?: Language[]
  ariaLabels: {
    timeline: string
    company: string
  }
}

export type EducationItem = {
  date: string
  title: string
  institution: string
  description: string
  link: string
}

export type Education = {
  title: string
  items: EducationItem[]
  ariaLabels: {
    history: string
  }
}

export type Award = {
  year: string
  title: string
  project: string
  link: string
}

export type Awards = {
  title: string
  items: Award[]
}

export type Project = {
  title: string
  role: string
  client: string
  agency: string
  description: string
  awards?: string[]
  link: string
}

export type ProjectCategory = {
  name: string
  label: string
  items: Project[]
}

export type Projects = {
  title: string
  categories: ProjectCategory[]
  viewMore: string
  ariaLabels: {
    viewMore: string
  }
  card: {
    labels: {
      role: string
      client: string
      agency: string
      awards: string
    }
    ariaLabels: {
      awards: string
      viewProject: string
    }
  }
}

export type WebShopDemo = {
  label: string
  url: string
  ariaLabel: string
}

export type WebShopBullet = {
  title: string
  description: string
  comingSoon?: boolean
}

export type WebShopPlan = {
  name: string
  description: string
}

export type WebShopCategory = {
  name: string
  label: string
  headline: string
  body: string
  demosHeading?: string
  demos?: WebShopDemo[]
  bullets?: WebShopBullet[]
  plans?: WebShopPlan[]
}

export type WebShop = {
  title: string
  categories: WebShopCategory[]
  cta: {
    contact: {
      label: string
      ariaLabel: string
    }
  }
  ariaLabels: {
    demos: string
    comingSoon: string
  }
}

export type NotFound = {
  title: string
  heading: string
  description: string
  goHome: string
  getInTouch: string
  ariaLabels: {
    goHome: string
    getInTouch: string
  }
}

export type Assistant = {
  title: string
  description: string
  welcome: string
  loading: string
  placeholder: {
    mobile: string
    desktop: string
  }
  openButton: {
    label: string
    ariaLabel: string
  }
  closeButton: {
    ariaLabel: string
  }
  sendButton: {
    label: string
    ariaLabel: string
  }
  suggestedPrompts: string[]
  suggestedPromptsMobile: string[]
  errors: {
    rateLimit: string
    quotaExceeded: string
    generic: string
    unavailable: string
    maxMessages: string
  }
  ariaLabels: {
    chatPanel: string
    messages: string
    suggestedPrompts: string
    input: string
  }
}

export type ErrorBoundaryContent = {
  heading: string
  description: string
  goHome: string
  refreshPage: string
  errorDetails: string
  ariaLabels: {
    goHome: string
    refreshPage: string
  }
}

export type Content = {
  meta: {
    title: string
    description: string
  }
  hero: {
    badge: string
    title: string
    description: string
    ariaLabels: {
      navigation: string
    }
    buttons: {
      getInTouch: {
        label: string
        ariaLabel: string
      }
      viewWork: {
        label: string
        ariaLabel: string
      }
      downloadCV: {
        label: string
        ariaLabel: string
      }
      askAi: {
        label: string
        ariaLabel: string
      }
    }
  }
  assistant: Assistant
  about: {
    title: string
    paragraphs: string[]
  }
  contact: Contact
  skills: Skills
  experience: Experience
  education: Education
  awards: Awards
  projects: Projects
  webShop: WebShop
  header: {
    skipToContent: string
    firstName: string
    lastName: string
    logoAriaLabel: string
  }
  footer: {
    copyright: string
  }
  navigation: {
    items: { href: SectionId; title: string }[]
    ariaLabels: {
      main: string
      mobile: string
      navigateTo: string
      openMenu: string
      closeMenu: string
    }
  }
  notFound: NotFound
  errorBoundary: ErrorBoundaryContent
}

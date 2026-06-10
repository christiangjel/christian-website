export type AssistantExtra = {
  profile: {
    title: string
    workArrangement: string[]
    website: string
    github: string
    linkedin: string
    summary: string
  }
  freelance: {
    since: string
    availability: string
  }
  coreCompetencies: {
    frontendArchitecture: string[]
    uiEngineering: string[]
    qualityAndPerformance: string[]
    collaboration: string[]
  }
  additionalTechnologies: string[]
  cmsAndPlatforms: string[]
  industries: string[]
  projectSupplements: {
    project: string
    details: string
  }[]
  campaignsAndProducts: {
    name: string
    client: string
    agency: string
    period?: string
    details: string
  }[]
  clientEngagements: {
    client: string
    engagementType: string
    period: string
    note: string
  }[]
  employerReferences: {
    employer: string
    author: string
    authorRole: string
    date: string
    referenceCoversPeriod: string
    totalFreelanceEngagement: string
    engagementClarification: string
    role: string
    employerDescription: string
    projectHighlights: string[]
    strengthsNoted: string[]
    recommendation: string
  }[]
}

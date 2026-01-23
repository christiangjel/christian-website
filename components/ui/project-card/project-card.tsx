'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/lib/content'

type ProjectCardProps = {
  title: string
  role: string
  client: string
  agency: string
  description: string
  awards?: string[]
  link?: string
}

const ProjectCard = React.memo<ProjectCardProps>(
  ({ title, role, client, agency, description, awards, link = '#' }) => {
    const hasAwards = awards && awards.length > 0

    return (
      <Link
        href={link}
        className='block'
        target='_blank'
        rel='noopener noreferrer'
        aria-label={content.projects.card.ariaLabels.viewProject.replace(
          '{title}',
          title
        )}
      >
        <Card className='h-full border-mint/20 bg-background transition-colors backdrop-blur hover:border-mint hover:bg-mint/5 hover:shadow-md supports-[backdrop-filter]:bg-background/60'>
          <CardContent className='p-6'>
            <h3 className='mb-2 text-lg font-bold group-hover:text-mint-dark'>
              {title}
            </h3>
            <dl>
              <div className='mb-1'>
                <dt className='inline font-medium'>
                  {content.projects.card.labels.role}
                </dt>
                <dd className='inline text-muted-foreground'>{role}</dd>
              </div>
              <div className='mb-1'>
                <dt className='inline font-medium'>
                  {content.projects.card.labels.client}
                </dt>
                <dd className='inline text-muted-foreground'>{client}</dd>
              </div>
              <div className='mb-4'>
                <dt className='inline font-medium'>
                  {content.projects.card.labels.agency}
                </dt>
                <dd className='inline text-muted-foreground'>{agency}</dd>
              </div>
            </dl>
            <p className='text-muted-foreground'>{description}</p>
            {hasAwards && (
              <div className='mt-4'>
                <h4 className='mb-2 text-md font-bold'>
                  {content.projects.card.labels.awards}
                </h4>
                <ul
                  className='list-inside list-disc text-muted-foreground'
                  aria-label={content.projects.card.ariaLabels.awards}
                >
                  {awards.map((award) => (
                    <li key={award}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'

export { ProjectCard }

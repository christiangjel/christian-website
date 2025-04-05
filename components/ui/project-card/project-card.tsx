'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface ProjectCardProps {
  title: string
  role: string
  client: string
  agency: string
  description: string
  awards?: string[]
  link?: string
}

export const ProjectCard = ({
  title,
  role,
  client,
  agency,
  description,
  awards,
  link = '#'
}: ProjectCardProps) => {
  return (
    <Link
      href={link}
      className='block'
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`View project: ${title}`}
    >
      <Card className='border-mint/20 h-full transition-colors hover:border-mint hover:bg-mint/5 hover:shadow-md bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <CardContent className='p-6'>
          <h3 className='font-bold text-lg mb-2 group-hover:text-mint-dark'>
            {title}
          </h3>
          <dl>
            <div className='mb-1'>
              <dt className='font-medium inline'>Role: </dt>
              <dd className='text-muted-foreground inline'>{role}</dd>
            </div>
            <div className='mb-1'>
              <dt className='font-medium inline'>Client: </dt>
              <dd className='text-muted-foreground inline'>{client}</dd>
            </div>
            <div className='mb-4'>
              <dt className='font-medium inline'>Agency: </dt>
              <dd className='text-muted-foreground inline'>{agency}</dd>
            </div>
          </dl>
          <p className='text-muted-foreground'>{description}</p>
          {awards && awards.length > 0 && (
            <div className='mt-4'>
              <h4 className='font-bold text-md mb-2'>Awards:</h4>
              <ul
                className='list-disc list-inside text-muted-foreground'
                aria-label='Project awards'
              >
                {awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

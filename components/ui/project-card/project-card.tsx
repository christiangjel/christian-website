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
    <Link href={link} className='block' target='_blank'>
      <Card className='border-mint/20 h-full transition-colors hover:border-mint hover:bg-mint/5 hover:shadow-md bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <CardContent className='p-6'>
          <h3 className='font-bold text-lg mb-2 group-hover:text-mint-dark'>
            {title}
          </h3>
          <p className='text-muted-foreground mb-1'>
            <span className='font-medium'>Role:</span> {role}
          </p>
          <p className='text-muted-foreground mb-1'>
            <span className='font-medium'>Client:</span> {client}
          </p>
          <p className='text-muted-foreground mb-4'>
            <span className='font-medium'>Agency:</span> {agency}
          </p>
          <p className='text-muted-foreground'>{description}</p>
          {awards && awards.length > 0 && (
            <div className='mt-4'>
              <h4 className='font-bold text-md mb-2'>Awards:</h4>
              <ul className='list-disc list-inside text-muted-foreground'>
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

'use client'

import { Mail, Phone, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ContactForm from '@/components/ui/forms/contact-form'
import { ContactInfoItem } from '@/components/ui/contact-info-item'
import { LocationIcon } from '@/components/ui/icons/location-icon'
import { XingIcon } from '@/components/ui/icons/xing-icon'
import { content } from '@/lib/content'
import { SECTIONS } from '@/constants'
import { obfuscateEmail } from '@/lib/utils'

export const Contact = () => {
  return (
    <section id={SECTIONS.CONTACT} className='py-14'>
      <h2 className='mb-12 text-3xl font-bold tracking-tight'>
        {content.contact.title}
      </h2>
      <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
        <div>
          <p className='mb-8 text-muted-foreground'>
            {content.contact.description}
          </p>
          <div className='space-y-4'>
            <ContactInfoItem
              icon={<Mail className='h-5 w-5 text-mint' />}
              label='Email'
              value={obfuscateEmail(content.contact.email)}
              href={`mailto:${content.contact.email}`}
              isLink
            />
            <ContactInfoItem
              icon={<Phone className='h-5 w-5 text-mint' />}
              label='Phone'
              value={content.contact.phone}
              href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
              isLink
            />
            <ContactInfoItem
              icon={<LocationIcon className='text-mint' />}
              label='Location'
              value={content.contact.location}
            />
            <div className='mt-4 flex flex-wrap gap-4'>
              {content.contact.social.map((item, index) => (
                <Button
                  key={index}
                  variant='outline'
                  className='flex items-center gap-2'
                  asChild
                >
                  <Link href={item.url} target='_blank'>
                    {item.icon === 'linkedin' && (
                      <Linkedin className='h-4 w-4' />
                    )}
                    {item.icon === 'github' && <Github className='h-4 w-4' />}
                    {item.icon === 'xing' && <XingIcon className='mr-2' />}
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

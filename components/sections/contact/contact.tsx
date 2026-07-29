'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ContactForm } from '@/components/ui/forms/contact-form'
import { ContactInfoItem } from '@/components/ui/contact-info-item'
import { LocationIcon } from '@/components/ui/icons/location-icon'
import { XingIcon } from '@/components/ui/icons/xing-icon'
import { SectionReveal } from '@/components/ui/section-reveal/section-reveal'
import { useContent } from '@/components/layout/locale/locale-provider'
import { useRevealMotion } from '@/hooks/useRevealMotion'
import { SECTIONS } from '@/constants'
import { obfuscateEmail } from '@/lib/utils'

export const Contact = () => {
  const content = useContent()
  const { fadeUpVariants } = useRevealMotion()

  return (
    <section id={SECTIONS.CONTACT} className='py-14'>
      <SectionReveal stagger>
        <motion.h2
          className='mb-12 text-3xl font-bold tracking-tight'
          variants={fadeUpVariants}
        >
          {content.contact.title}
        </motion.h2>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
          <motion.div variants={fadeUpVariants}>
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
                {content.contact.social.map((item) => (
                  <Button
                    key={item.name}
                    variant='outline'
                    className='flex items-center gap-2 transition-[filter,border-color] duration-300 hover:brightness-110'
                    asChild
                  >
                    <Link
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
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
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <ContactForm />
          </motion.div>
        </div>
      </SectionReveal>
    </section>
  )
}

import type { ReactNode } from 'react'

type ContactInfoItemProps = {
  icon: ReactNode
  label: string
  value: string
  href?: string
  isLink?: boolean
}

export const ContactInfoItem = ({
  icon,
  label,
  value,
  href,
  isLink = false
}: ContactInfoItemProps) => {
  const content = isLink ? (
    <a
      href={href}
      className='text-muted-foreground transition-colors hover:text-mint active:text-mint focus:text-mint visited:text-mint focus-visible:outline-none'
    >
      {value}
    </a>
  ) : (
    <p className='text-muted-foreground'>{value}</p>
  )

  return (
    <div className='flex items-start gap-3'>
      <div className='mt-0.5'>{icon}</div>
      <div>
        <h3 className='font-bold'>{label}</h3>
        {content}
      </div>
    </div>
  )
}

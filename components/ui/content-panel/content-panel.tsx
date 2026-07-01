import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BulletList } from '@/components/ui/bullet-list'
import { Card, CardContent } from '@/components/ui/card'
import { content } from '@/lib/content'
import type { WebShopCategory } from '@/types/content'

type ContentPanelProps = {
  category: WebShopCategory
}

/**
 * Static outlined panel for Webshop tab content.
 * Renders intro paragraphs, a green bullet list, feature items,
 * pricing plans, demo buttons, and an optional closing paragraph.
 */
export const ContentPanel = ({ category }: ContentPanelProps) => {
  const hasParagraphs = category.paragraphs && category.paragraphs.length > 0
  const hasBullets = category.bullets && category.bullets.length > 0
  const hasItems = category.items && category.items.length > 0
  const hasPlans = category.plans && category.plans.length > 0
  const hasDemos = category.demos && category.demos.length > 0

  return (
    <Card className='border-mint/20 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <CardContent className='space-y-6 p-6'>
        <h3 className='text-lg font-bold'>{category.headline}</h3>

        {hasParagraphs && (
          <div className='space-y-4'>
            {category.paragraphs!.map((paragraph) => (
              <p key={paragraph} className='text-muted-foreground'>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {hasBullets && <BulletList items={category.bullets!} />}

        {hasItems && (
          <div className='space-y-4'>
            {category.items!.map((item) => (
              <p key={item.title} className='text-muted-foreground'>
                <span className='text-foreground'>{item.title}:</span>{' '}
                {item.description}
              </p>
            ))}
          </div>
        )}

        {hasPlans && (
          <div className='grid gap-6 sm:grid-cols-2'>
            {category.plans!.map((plan) => (
              <div key={plan.name} className='space-y-3'>
                <div>
                  <p className='font-bold text-foreground'>{plan.name}</p>
                  {plan.subtitle && (
                    <p className='text-sm text-muted-foreground'>
                      {plan.subtitle}
                    </p>
                  )}
                </div>
                {plan.description && (
                  <p className='text-muted-foreground'>{plan.description}</p>
                )}
                {plan.bullets && plan.bullets.length > 0 && (
                  <BulletList items={plan.bullets} />
                )}
              </div>
            ))}
          </div>
        )}

        {hasDemos && (
          <div className='space-y-3'>
            {category.demosIntro && (
              <p className='text-foreground'>{category.demosIntro}</p>
            )}
            <div
              className='flex flex-wrap gap-3'
              role='group'
              aria-label={content.webShop.ariaLabels.demos}
            >
              {category.demos!.map((demo) => (
                <Button
                  key={demo.url}
                  asChild
                  className='bg-mint text-mint-foreground transition-opacity hover:opacity-90'
                >
                  <a
                    href={demo.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={demo.ariaLabel}
                  >
                    <ExternalLink className='h-4 w-4' aria-hidden='true' />
                    {demo.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}

        {category.closing && (
          <p className='text-muted-foreground'>{category.closing}</p>
        )}
      </CardContent>
    </Card>
  )
}

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContentPanel } from '@/components/ui/content-panel/content-panel'
import { content } from '@/lib/content'

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))

describe('ContentPanel', () => {
  const overview = content.webShop.categories.find((c) => c.name === 'overview')!
  const features = content.webShop.categories.find((c) => c.name === 'features')!
  const technology = content.webShop.categories.find(
    (c) => c.name === 'technology'
  )!
  const pricing = content.webShop.categories.find((c) => c.name === 'pricing')!

  it('renders overview body and inline demo link', () => {
    render(<ContentPanel category={overview} />)

    const demo = overview.demos![0]!

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      overview.headline
    )
    expect(screen.getByText(overview.body)).toBeInTheDocument()
    expect(screen.getByText(`${demo.prefix}:`)).toHaveClass('text-foreground')

    const demoLink = screen.getByRole('link', { name: demo.ariaLabel })
    expect(demoLink).toHaveAttribute('href', demo.url)
    expect(demoLink).toHaveTextContent(demo.label)
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders feature lines', () => {
    render(<ContentPanel category={features} />)

    const branding = features.items![0]!

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      features.headline
    )
    expect(screen.getByText(`${branding.title}:`)).toHaveClass('text-foreground')
    expect(screen.getByText(branding.description)).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders technology as headline and body only', () => {
    render(<ContentPanel category={technology} />)

    expect(screen.getByText(technology.headline)).toBeInTheDocument()
    expect(screen.getByText(technology.body)).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders pricing plans before the closing body text', () => {
    render(<ContentPanel category={pricing} />)

    const saasPlan = pricing.plans![0]!
    const lifetimePlan = pricing.plans![1]!

    expect(screen.getByText(`${saasPlan.name}:`)).toHaveClass('text-foreground')
    expect(screen.getByText(`${lifetimePlan.name}:`)).toHaveClass(
      'text-foreground'
    )
    expect(screen.getByText(saasPlan.description)).toBeInTheDocument()
    expect(screen.getByText(lifetimePlan.description)).toBeInTheDocument()
    expect(screen.getByText(pricing.body)).toBeInTheDocument()

    const cardText = screen.getByRole('region').textContent ?? ''
    const saasIndex = cardText.indexOf(saasPlan.description)
    const closingIndex = cardText.indexOf(pricing.body)
    expect(saasIndex).toBeGreaterThan(-1)
    expect(closingIndex).toBeGreaterThan(saasIndex)
  })
})

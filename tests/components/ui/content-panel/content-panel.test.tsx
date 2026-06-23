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

  it('renders overview body and external demo link', () => {
    render(<ContentPanel category={overview} />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      overview.headline
    )
    expect(screen.getByText(overview.body)).toBeInTheDocument()
    expect(screen.getByText(overview.demosHeading!)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 4 })).not.toBeInTheDocument()

    const demoLink = screen.getByRole('link', {
      name: overview.demos![0]!.ariaLabel
    })
    expect(demoLink).toHaveAttribute('href', overview.demos![0]!.url)
    expect(demoLink).toHaveAttribute('target', '_blank')
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders feature bullets with coming soon labels', () => {
    render(<ContentPanel category={features} />)

    expect(screen.getByText(features.body)).toBeInTheDocument()

    expect(
      screen.getAllByText(
        `(${content.webShop.ariaLabels.comingSoon.toLowerCase()})`
      )
    ).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(
      features.bullets!.length
    )
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

    expect(screen.getByText(`${saasPlan.name}: ${saasPlan.description}`)).toBeInTheDocument()
    expect(
      screen.getByText(`${lifetimePlan.name}: ${lifetimePlan.description}`)
    ).toBeInTheDocument()
    expect(screen.getByText(pricing.body)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 4 })).not.toBeInTheDocument()

    const cardText = screen.getByRole('region').textContent ?? ''
    const saasIndex = cardText.indexOf(saasPlan.description)
    const closingIndex = cardText.indexOf(pricing.body)
    expect(saasIndex).toBeGreaterThan(-1)
    expect(closingIndex).toBeGreaterThan(saasIndex)
  })
})

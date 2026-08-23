import { content } from '@/lib/content'
import { SITE_CONFIG } from '@/constants'

export const LlmMarkdownHint = () => {
  const markdownUrl = `${SITE_CONFIG.BASE_URL}/index.md`

  return (
    <p className='sr-only' aria-hidden='true'>
      {content.llm.markdownHint.replace('{url}', markdownUrl)}
    </p>
  )
}

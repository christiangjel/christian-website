# Project Rules

This directory contains the coding standards, patterns, and conventions for the Christian Gjelstrup portfolio website project.

## Rule Files

All rules are in `.mdc` format with frontmatter metadata for Cursor's rule system. See [Cursor Rules Documentation](https://cursor.com/docs/context/rules) for details.

- **[typescript.mdc](./typescript.mdc)** - TypeScript conventions, type declarations, and type safety (Always Apply)
- **[react.mdc](./react.mdc)** - React component patterns, server vs client components, hooks (Always Apply)
- **[file-organization.mdc](./file-organization.mdc)** - Directory structure, file naming, and organization (Always Apply)
- **[imports.mdc](./imports.mdc)** - Import organization, path aliases, and grouping (Always Apply)
- **[content.mdc](./content.mdc)** - Content management and centralization (Always Apply)
- **[constants.mdc](./constants.mdc)** - Constants organization and configuration (Always Apply)
- **[error-handling.mdc](./error-handling.mdc)** - Error handling, logging, and graceful degradation (Always Apply)
- **[performance.mdc](./performance.mdc)** - Performance optimization, React.memo, useCallback (Apply to TS/TSX files)
- **[accessibility.mdc](./accessibility.mdc)** - Accessibility guidelines, ARIA labels, semantic HTML (Always Apply)
- **[testing.mdc](./testing.mdc)** - Testing conventions, patterns, and organization (Apply to test files)
- **[code-style.mdc](./code-style.mdc)** - Code formatting, naming conventions, and style guidelines (Always Apply)

## Quick Reference

### Most Important Rules

1. **Always use `type` instead of `interface`**
2. **Prefer `unknown` + validation over `any` / `as` at runtime boundaries**
3. **Prefer `satisfies` over `as` for config and JSON**
4. **All user-facing text must be in `data/content.json`**
5. **Use `@/` path alias for all internal imports**
6. **Use `logger` utility instead of `console.*`**
7. **Use stable keys (not array index) for React lists**
8. **Default to Server Components, use `'use client'` only when needed**
9. **Use `cn()` utility for conditional Tailwind classes**
10. **Always include `rel='noopener noreferrer'` for external links**

## Project Structure

```
components/     - React components (sections, ui, layout)
hooks/          - Custom React hooks
constants/      - Constants and configuration
lib/            - Utility functions
types/          - TypeScript type definitions
data/           - Static data (content.json)
tests/          - Test files
```

## How to Use

Cursor IDE will automatically load these rules from the `.cursor/rules/` directory. Rules use the `.mdc` format with frontmatter metadata:

- **Always Apply**: Rules with `alwaysApply: true` are included in every chat session
- **Apply Intelligently**: Rules with `description` are applied when Agent determines they're relevant
- **Apply to Specific Files**: Rules with `globs` patterns are applied when working with matching files

Each file focuses on a specific area, making it easy to maintain and update rules as the project evolves. See [Cursor Rules Documentation](https://cursor.com/docs/context/rules) for more details.

# CLAUDE.md - ICA Knowledge Center

## Identity
You are working on the **ICA Knowledge Center** project for Primak Digital.
- **Client:** ICA (Israel Center for Addiction)
- **Domain:** Addiction recovery knowledge platform
- **Owner:** Yaniv Primak, CEO Primak Digital

## Critical: Read HQ First
Before any work, check the central Primak HQ:
- **HQ Document:** https://docs.google.com/document/d/1o5kbH1Wmqfl5VztJbCYjQExreHZEXhZYH2w4sQVZud4/edit
- **Focus on:** Active Context → ICA tasks
- **Check:** Handoffs section for pending context from Claude.ai

## Project Context

### Tech Stack
| Technology | Version/Details |
|------------|-----------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Database | Supabase |
| Deployment | Vercel |

### Critical Requirements
| Requirement | Details |
|-------------|---------|
| RTL | Full Hebrew RTL support required |
| Accessibility | WCAG 2.1 AA compliance |
| Performance | Core Web Vitals optimized |
| Responsive | Mobile-first design |

### Design System
- **Theme:** Premium dark mode, glassmorphism effects
- **Typography:** Hebrew-optimized fonts (Heebo, Assistant)
- **Animations:** 60fps, subtle transitions
- **Colors:** Dark backgrounds, accent colors for CTAs

## Project Structure
```
ica-knowledge-center/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # Base UI (shadcn)
│   │   └── features/    # Feature-specific components
│   ├── lib/             # Utilities & helpers
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles & Tailwind config
├── public/              # Static assets
├── docs/                # Documentation
└── CLAUDE.md            # This file
```

## Git Workflow

### Branch Naming
```
feature/ICA-[number]-[short-description]
bugfix/ICA-[number]-[short-description]
hotfix/ICA-[number]-[short-description]
docs/[description]
```

### Commit Messages (Conventional Commits)
```
feat(component): add ContentCard with RTL support
fix(rtl): correct text alignment in sidebar navigation
style(ui): update button hover states
docs(readme): add setup instructions
refactor(hooks): simplify useAuth logic
test(card): add unit tests for ContentCard
```

### PR Process
1. Create feature branch from `main`
2. Make changes, commit with conventional commits
3. Push and create PR
4. Ensure all checks pass
5. Request review if needed
6. Squash and merge

## Handoff Protocol

### When Starting Work Session
1. **Read HQ First:** Open https://docs.google.com/document/d/1o5kbH1Wmqfl5VztJbCYjQExreHZEXhZYH2w4sQVZud4/edit
2. **Check Active Context:** Look for ICA-related tasks
3. **Review Handoffs:** Check if Claude.ai left pending context
4. **Pull Latest:** `git pull origin main`

### When Ending Work Session
1. **Commit All Changes:** Use conventional commit format
2. **Push to Remote:** `git push origin [branch]`
3. **Update HQ Document:**
   - Mark completed tasks as ✅
   - Add any blockers to Open Decisions
   - Write Handoff entry if switching to another tool
4. **Report Summary:** Tell user what was done and what's next

### Handoff Entry Format (for HQ Document)
```
| [YYYY-MM-DD HH:MM] | Claude Code | [Target Tool] | [Context Summary] | [Key Files] | 🟡 Pending |
```

## Quality Checklist
Before considering any task complete:
- [ ] TypeScript strict mode passes (`npm run type-check`)
- [ ] ESLint clean (`npm run lint`)
- [ ] Prettier formatted (`npm run format`)
- [ ] RTL tested with actual Hebrew content
- [ ] Mobile responsive verified (320px - 1920px)
- [ ] Accessibility checked (keyboard nav, screen reader)
- [ ] No console errors in browser
- [ ] Performance acceptable (Lighthouse > 90)

## Common Commands
```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server

# Quality
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run type-check   # TypeScript check
npm run test         # Run tests

# Git
git status           # Check status
git pull origin main # Get latest
git push             # Push changes
```

## Resources
| Resource | Location |
|----------|----------|
| Primak HQ | https://docs.google.com/document/d/1o5kbH1Wmqfl5VztJbCYjQExreHZEXhZYH2w4sQVZud4/edit |
| Design System | Refer to primak-design-dna skill |
| RTL Guidelines | Refer to primak-rtl-excellence skill |
| Project Board | GitHub Issues/Projects |

## Contact
- **Project Owner:** Yaniv Primak
- **Company:** Primak Digital Ltd.
- **Client:** ICA (Israel Center for Addiction)

---
*CLAUDE.md v1.0 - ICA Knowledge Center - Primak Digital*
*Last Updated: 2026-01-31*

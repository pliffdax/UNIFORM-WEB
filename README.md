This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. To learn more about Tailwind CSS, check out the following resources:

- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS features and API.
- [Tailwind CSS GitHub repository](https://github.com/tailwindlabs/tailwindcss)

## CI/CD

Проект настроен с использованием GitHub Actions для Continuous Integration и Continuous Deployment.

### Continuous Integration (CI)

При создании PR или коммита автоматически проверяется:

- ✅ **Форматирование кода** (Prettier)
- ✅ **Линтинг** (ESLint)
- ✅ **Проверка типов** (TypeScript)
- ✅ **Сборка проекта** (Next.js build)
- ✅ **Тесты** (Jest + Playwright)
- ✅ **Соответствие коммитов** (Conventional Commits)

### Continuous Deployment (CD)

При push в ветку `main` или `master`:

- ✅ Автоматически проверяется что код собирается
- ✅ Автоматически деплоится на Render (если настроен)

### Настройка

1. **Branch Protection**: См. [.github/BRANCH_PROTECTION.md](.github/BRANCH_PROTECTION.md)
2. **Deployment**: См. [.github/DEPLOYMENT.md](.github/DEPLOYMENT.md)

### Локальные команды

```bash
# Проверка форматирования
pnpm format:check

# Форматирование кода
pnpm format

# Проверка линтинга
pnpm lint:check

# Проверка типов
pnpm type-check

# Запуск всех проверок (как в CI)
pnpm ci
```

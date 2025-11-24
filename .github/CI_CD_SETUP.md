# Полная инструкция по настройке CI/CD

## Что было сделано

✅ Созданы GitHub Actions workflows для CI и CD
✅ Добавлены скрипты для проверки кода в package.json
✅ Настроены проверки: Prettier, ESLint, TypeScript, Build, Tests
✅ Настроена проверка Conventional Commits

## Что нужно сделать вручную

### 1. Настройка Branch Protection в GitHub

**Важно:** Это критически важно для того, чтобы нельзя было смерджить PR без прохождения CI!

Следуйте инструкциям в файле [BRANCH_PROTECTION.md](BRANCH_PROTECTION.md)

### 2. Настройка деплоя на Render

#### Вариант A: Автоматический деплой через Render (Рекомендуется)

Если Render уже подключен к вашему GitHub репозиторию:

1. В Render Dashboard откройте настройки вашего сервиса
2. Убедитесь что:
   - **Auto-Deploy** включен
   - Выбрана правильная ветка (main или master)
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm start`
3. Render автоматически будет деплоить при каждом push в main/master

**В этом случае CD workflow будет просто проверять что код собирается.**

#### Вариант B: Деплой через Render API (GitHub Actions)

Если вы хотите чтобы GitHub Actions сам деплоил через API:

1. Получите Render API Key:
   - Render Dashboard → Settings → API Keys → Create API Key
2. Получите Service ID:
   - Откройте ваш сервис в Render → Settings → Service ID (или из URL)
3. Добавьте secrets в GitHub:
   - Репозиторий → Settings → Secrets and variables → Actions
   - Добавьте `RENDER_API_KEY` и `RENDER_SERVICE_ID`

### 3. Проверка работы

1. Создайте тестовый PR:

   ```bash
   git checkout -b test-ci
   # Сделайте небольшое изменение
   git commit -m "test: проверка CI"
   git push origin test-ci
   ```

2. Создайте PR на GitHub и проверьте:
   - ✅ Все проверки CI должны пройти
   - ✅ Нельзя будет смерджить пока не пройдут все проверки (если настроен branch protection)

3. После мерджа в main:
   - ✅ CD workflow должен запуститься
   - ✅ Render должен автоматически задеплоить новую версию

## Ответы на вопросы

### "Я уже задеплоил на Render - это значит задача выполнена?"

**Нет, не полностью.** Задача требует:

1. ✅ Деплой на сервер (это у вас есть)
2. ❌ **Автоматический деплой** при коммите в main (нужно настроить)
3. ❌ **CI проверки** перед мерджем PR (нужно настроить branch protection)
4. ❌ **Проверка стиля коммитов** (уже настроено через commitlint)

### "Что от меня хотят?"

Требуется настроить:

1. **CI (Continuous Integration)**:
   - Автоматические проверки при создании PR
   - Невозможность смерджить PR без прохождения проверок
   - ✅ Это уже настроено через GitHub Actions workflows

2. **CD (Continuous Deployment)**:
   - Автоматический деплой при коммите в main
   - ✅ Workflow создан, нужно убедиться что Render настроен на авто-деплой

3. **Branch Protection**:
   - Обязательные проверки перед мерджем
   - ❌ Нужно настроить вручную в GitHub Settings

## Чеклист для завершения настройки

- [ ] Настроен Branch Protection в GitHub (см. BRANCH_PROTECTION.md)
- [ ] Проверено что Render настроен на Auto-Deploy
- [ ] Проверено что Build command в Render: `pnpm install && pnpm build`
- [ ] Проверено что Start command в Render: `pnpm start`
- [ ] Создан тестовый PR и проверено что CI работает
- [ ] Проверено что нельзя смерджить PR без прохождения CI
- [ ] Проверено что после мерджа в main происходит деплой

## Полезные ссылки

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Documentation](https://render.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

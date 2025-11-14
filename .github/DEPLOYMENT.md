# Настройка Continuous Deployment (CD)

## Вариант 1: Автоматический деплой через Render Webhook (Рекомендуется)

Render может автоматически деплоить при push в основную ветку, если настроен webhook.

### Настройка в Render:

1. Перейдите в ваш сервис на Render Dashboard
2. Откройте настройки сервиса (Settings)
3. В разделе **Build & Deploy**:
   - Убедитесь что **Auto-Deploy** включен
   - Выберите ветку (обычно `main` или `master`)
4. В разделе **Notifications** или **Webhooks**:
   - Добавьте GitHub webhook (если доступно)
   - Или Render автоматически отслеживает изменения через GitHub интеграцию

### Настройка GitHub Secrets (для ручного деплоя через API):

Если вы хотите использовать GitHub Actions для деплоя через Render API:

1. Перейдите в репозиторий → **Settings** → **Secrets and variables** → **Actions**
2. Добавьте следующие secrets:
   - `RENDER_API_KEY` - API ключ из Render Dashboard (Settings → API Keys)
   - `RENDER_SERVICE_ID` - ID вашего сервиса (можно найти в URL или настройках)

## Вариант 2: Деплой через Render API (GitHub Actions)

Если вы настроили secrets, GitHub Actions будет автоматически деплоить при push в main/master.

## Проверка работы CD:

1. Создайте коммит в ветку `main` или `master`
2. GitHub Actions запустит workflow `CD`
3. Render автоматически получит изменения и задеплоит новую версию
4. Проверьте логи в Render Dashboard

## Важно:

- ✅ Если вы уже задеплоили на Render, это хорошо, но нужно настроить автоматизацию
- ✅ CD workflow проверяет что код собирается перед деплоем
- ✅ Render должен быть подключен к вашему GitHub репозиторию
- ✅ Убедитесь что в Render настроен правильный build command: `pnpm install && pnpm build`
- ✅ Убедитесь что в Render настроен правильный start command: `pnpm start`

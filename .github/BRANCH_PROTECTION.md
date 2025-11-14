# Настройка Branch Protection в GitHub

Для того чтобы можно было смерджить PR только после прохождения CI, необходимо настроить Branch Protection Rules.

## Инструкция по настройке:

1. Перейдите в ваш репозиторий на GitHub
2. Откройте **Settings** → **Branches**
3. В разделе **Branch protection rules** нажмите **Add rule** или **Edit** (если правило уже существует)
4. В поле **Branch name pattern** укажите:
   - `main` или `master` (в зависимости от вашей основной ветки)
5. Включите следующие опции:
   - ✅ **Require a pull request before merging**
     - ✅ **Require approvals** (опционально, можно установить минимум 1)
   - ✅ **Require status checks to pass before merging**
     - ✅ **Require branches to be up to date before merging**
     - В списке статусов выберите:
       - `lint-and-format / Lint & Format Check`
       - `build / Build`
       - `test / Run Tests`
       - `commitlint / Check Commit Messages` (опционально)
   - ✅ **Require conversation resolution before merging** (опционально)
   - ✅ **Do not allow bypassing the above settings** (рекомендуется)

6. Нажмите **Save changes**

## Что это даст:

- ❌ Невозможно будет смерджить PR, если не прошли все проверки CI
- ❌ Невозможно будет смерджить PR, если есть незакрытые комментарии
- ✅ Все коммиты в main/master будут проходить проверки перед мерджем
- ✅ Код будет соответствовать стандартам качества

## Альтернативный вариант (через GitHub CLI):

```bash
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["lint-and-format / Lint & Format Check","build / Build","test / Run Tests"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

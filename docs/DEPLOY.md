# Деплой (сборка → Git → обновление на сервере)

## Локально: одна команда

```bash
npm run deploy
```

Скрипт по порядку:

1. **Сборка** — `deploy:local` (восстановление `index.html`, `npm run build`, копирование `dist/` в корень).
2. **Git** — `git add -A`, `git commit`, `git push origin main`.
3. **Webhook** — GET-запрос на `DEPLOY_WEBHOOK_URL`, если переменная задана.

Сообщение коммита по умолчанию — текущая дата/время. Своё сообщение:

```bash
npm run deploy -- "Исправлена вёрстка голосовых сообщений"
```

### Включение обновления на сервере по запросу

Задайте URL, который на сервере запускает обновление из git (см. ниже):

```bash
# Windows (PowerShell)
$env:DEPLOY_WEBHOOK_URL="https://post-ads.ru/deploy.php?token=YOUR_SECRET"; npm run deploy

# Linux / macOS
DEPLOY_WEBHOOK_URL=https://post-ads.ru/deploy.php?token=YOUR_SECRET npm run deploy
```

Можно прописать в `.env.local` (не коммитить) или в настройках CI.

---

## На сервере (post-ads.ru)

### 1. Скрипт обновления

В корне проекта на сервере уже есть `scripts/server-pull-and-deploy.sh`. Запуск вручную:

```bash
cd ~/stroy/public_html   # или ваш путь к проекту
bash scripts/server-pull-and-deploy.sh
```

Скрипт выполняет: `git pull origin main`, `npm install`, `npm run deploy:local`.

### 2. Webhook (обновление по запросу с локальной машины)

1. Скопируйте пример PHP на сервер:
   - из репозитория: `scripts/deploy-webhook.php.example`
   - на сервер: в корень проекта как `deploy.php` (или в подпапку, тогда измените URL).

2. Откройте `deploy.php` и задайте:
   - `$secretToken` — свой секретный токен (тот же подставьте в `DEPLOY_WEBHOOK_URL`).
   - `$projectRoot` — путь к корню проекта на сервере (если `deploy.php` не в корне).

3. Выдайте права на выполнение скрипту:
   ```bash
   chmod +x scripts/server-pull-and-deploy.sh
   ```

4. Проверка в браузере или curl:
   ```bash
   curl "https://post-ads.ru/deploy.php?token=YOUR_SECRET"
   ```

После этого при запуске `npm run deploy` с заданным `DEPLOY_WEBHOOK_URL` сервер будет автоматически подтягивать код из git и пересобирать проект.

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

URL webhook задаётся в файле **`.env.deploy`** (в корне проекта, не коммитится). Если файл есть, `npm run deploy` сам подхватит `DEPLOY_WEBHOOK_URL` и вызовет сервер после push.

Токен для webhook сгенерирован и записан в **`scripts/SERVER_DEPLOY_TOKEN.txt`** (не коммитится). Тот же токен нужно указать на сервере в `deploy.php` (см. ниже).

Ручная установка переменной (если нет `.env.deploy`):

```bash
# Windows (PowerShell)
$env:DEPLOY_WEBHOOK_URL="https://post-ads.ru/deploy.php?token=YOUR_SECRET"; npm run deploy

# Linux / macOS
DEPLOY_WEBHOOK_URL=https://post-ads.ru/deploy.php?token=YOUR_SECRET npm run deploy
```

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
   - **`$secretToken`** — токен из файла **`scripts/SERVER_DEPLOY_TOKEN.txt`** (локально, тот же что в `.env.deploy`).
   - **`$projectRoot`** — путь к корню проекта на сервере (если `deploy.php` в корне сайта, оставьте `__DIR__`).

3. Выдайте права на выполнение скрипту:
   ```bash
   chmod +x scripts/server-pull-and-deploy.sh
   ```

4. Проверка в браузере или curl:
   ```bash
   curl "https://post-ads.ru/deploy.php?token=YOUR_SECRET"
   ```

5. **Если webhook возвращает 500 и «dubious ownership»:** один раз на сервере (с sudo) выполните:
   ```bash
   sudo git config --system --add safe.directory /home/d/dsc23ytp/stroy/public_html
   ```
   Подставьте свой путь к проекту. После этого webhook будет работать от пользователя веб-сервера (www-data).

После этого при запуске `npm run deploy` с заданным `DEPLOY_WEBHOOK_URL` сервер будет автоматически подтягивать код из git и пересобирать проект.

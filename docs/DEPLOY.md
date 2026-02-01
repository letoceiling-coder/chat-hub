# Инструкция по деплою

## OSPanel: Document Root = chat-hub

Если Document Root указывает на `C:\OSPanel\domains\messendger-dising-2\chat-hub`:

1. Выполните **`npm run deploy:local`** — соберёт проект и скопирует файлы в корень chat-hub
2. Откройте сайт в браузере (например, `http://messendger-dising-2.loc`)

**Для разработки после deploy:** `index.html` будет перезаписан. Чтобы вернуть режим разработки:
```bash
git checkout index.html
```

### Вариант A: В корне домена (example.com/)
1. Выполните `npm run build`
2. Скопируйте **содержимое** папки `dist/` в корень сайта
3. Убедитесь, что в Apache включён `mod_rewrite` и `AllowOverride All`

### Вариант B: В подпапке (example.com/chat-hub/)
1. В `vite.config.ts` задайте `base: "/chat-hub/"`
2. Выполните `npm run build`
3. Скопируйте содержимое `dist/` в папку `chat-hub` на сервере

## Ошибка "Expected a JavaScript module script but server responded with MIME type"

**Причины:**
- Сервер не находит `/assets/index-xxx.js` и отдаёт index.html вместо него
- Неверный Document Root — сервер смотрит не в ту папку
- Приложение в подпапке, а base остался `/`

**Решение:**
1. Проверьте, что в корне сайта есть папка `assets/` с файлами `.js` и `.css`
2. Откройте в браузере `https://ваш-сайт/assets/index-XXX.js` — должен загрузиться JS, а не HTML
3. Если приложение в подпапке — см. Вариант B выше

## Apache: необходимые модули
```apache
# Включить mod_rewrite
a2enmod rewrite

# В конфиге виртуального хоста:
<Directory /path/to/your/site>
    AllowOverride All
    Options -MultiViews
    DirectoryIndex index.html
</Directory>
```

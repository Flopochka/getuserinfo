# Portable System Information Tool

Этот инструмент собирает информацию о системе, сохраняет её в JSON-файл и отображает в виде HTML-таблицы с возможностью скачивания и отправки по почте.

## Возможности
- Сбор информации о системе: ОС, архитектура, имя хоста, имя пользователя, CPU, память, сеть, диски и разделы.
- Сохранение данных в `hard_data.json`.
- Визуализация данных в виде таблицы в браузере (`index.html`).
- Кнопки для скачивания данных и отправки их по почте.
- Поддержка запуска как скрипта Node.js и как standalone-экзешника (через [pkg](https://github.com/vercel/pkg)).

## Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Сбор информации о системе
```bash
node main.js
```

После выполнения появится файл `hard_data.json` и обновится HTML-таблица.

### 3. Открытие интерфейса
Откройте `index.html` (или сгенерированный файл) в браузере.

### 4. Сборка standalone-экзешника
```bash
npm install -g pkg
pkg main.js --output sysinfo.exe
# или с указанием платформы и имени файла:
pkg main.js --targets node18-win-x64 --output sysinfo.exe
```

### 5. Использование standalone-версии
Запустите `sysinfo.exe` — появится файл `hard_data.json` и обновится HTML.

## Структура проекта
- `main.js` — сбор информации о системе
- `index.html`/`index_template.html` — визуализация данных
- `hard_data.json` — собранные данные

## Зависимости
- Node.js
- [systeminformation](https://www.npmjs.com/package/systeminformation)
- [pkg](https://github.com/vercel/pkg) (для сборки standalone)

## Лицензия
MIT 
# Portable System Information Tool

Простой автономный инструмент для сбора и отображения системной информации в виде HTML-таблицы. Работает без сервера, поддерживает Windows и Linux, собирается в один exe-файл. При запуске exe автоматически собирает данные о системе, формирует HTML-отчёт и открывает его в браузере. Вся логика и шаблон встроены в сборку.

## Сборка exe-файла

### Windows
```bash
pkg main.js --targets node18-win-x64 --output sysinfo.exe
```

### Linux
```bash
pkg main.js --targets node18-linux-x64 --output sysinfo
``` 
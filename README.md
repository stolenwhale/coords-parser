# coords-parser
Консольный парсер координат по адресу на Electron.

- На основании списка адресов из файла excel парсит координаты и записывает в тот же excel. 
- Написан для составления адресных программ носителей для рекламных агенств. 
- Для парсинга использует geocode API от Google. Для обращения к серверу нужен ключ. API платное (5 долларов за каждую 1000 запросов).
<hr>

### Установка:
1. Сделайте форк проекта. Установите npm пакеты:
```javascript
  npm i
```
2. В корне проекта в файле **keys.js.example** введите ваш токен от Google Geocode API. Переименуйте файл в **keys.js**
```javascript
    module.exports = {
        TOKEN: 'ВВЕДИТЕ ВАШ КЛЮЧ'
    }
```
3. Запустите команду для создания билда:

```javascript
  npm run build-win // для приложений на win7-win10
  npm run build-mac // для приложений на MacOS
  npm run build-linux // Для приложений на Linux
```
4. В папке "release-builds" создастся дериктория с работающим приложением.






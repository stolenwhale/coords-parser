# coords-parser
Консольный парсер координат по адресу на Node.js.

- На основании списка адресов из файла excel парсит координаты и записывает в тот же excel. 
- Полезна для составления адресных программ носителей для рекламных агенств. 
- Для парсинга использует geocode API от Google. Для обращения к серверу нужен ключ. API платное (5 долларов за каждую 1000 запросов).
- Также есть версия для бесплатного использования. В таком случае обращается к geocode API Locationiq. Для использования парсера необходим уникальный токен-ключ, который можно получить после регистрации на [сайте API](https://locationiq.com). Бесплатная версия имеет ограничение по количеству запросов. 
- Точность полученых координат будет иметь незначительную погрешность в зависимости от используемого API.
<hr>

### Установка:
1. Установите [Node.js](https://nodejs.org/ru/) и npm-пакеты в папку программы. 
2. Внесите токен-ключ от одного из API в app.js (если у вас есть ключ от Google API) или app-free.js (если у вас есть ключ Locationiq API).
```javascript
  ...
  const myKey = 'ВВЕДИТЕ ВАШ КЛЮЧ';
  ...
```
3. Для упрощения работы с консолью отредактируйте файл 'Запустить.bat': 
- во второй строчке изменить расположение папки с парсером.
- в третьей строчке пропишите исполняемый скрипт в зависимости от выбранного API: app.js или app-free.js.
<br>
<hr>
После этого парсер готов к работе для пользователя любого уровня: 

### Как использовать:
1. Внесите все необходимые адреса в первую колонку excel-файла "Адресная программа", после этого закройте excel.
2. Запустите программу двойным щелчком по файлу "Запустить.bat". Откроется окно терминала, дождитесь окончания работы.
3. После завершения терминал закроется автоматически. Все координаты будут записаны в соответствующие ячейки рядом с адресами.






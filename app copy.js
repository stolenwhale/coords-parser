const Excel = require("exceljs");
const rp = require("request-promise");

const myKey = 'ВВЕДИТЕ ВАШ КЛЮЧ';

console.log("Я родился и начал работу");

// инициализация excel-файла
const workbook = new Excel.Workbook();
workbook.xlsx.readFile("Адресная программа.xlsx").then(function() {
  let addresses = [];
  const worksheet = workbook.getWorksheet("Адресная программа");

  // считываем все адреса из первого столбца excel-файла
  const columnToRead = worksheet.getColumn(1);
  const totalRowQuantity = columnToRead.values.length - 1;
  for (let i = 2; i <= totalRowQuantity; i++) {
    addresses.push(columnToRead.values[i]);
  }

  // делаем запрос на сервер с задержкой с помощью бесплатного API для геокодинга: https://locationiq.com
    let i = 0,
    lat = [],
    lng = [];

  async function sendRequest() {
    const url = "https://eu1.locationiq.com/v1/search.php";
    const options = {
      method: "GET",
      url: url,
      qs: {
        key: myKey, 
        q: addresses[i],
        format: "json",
        limit: 1
      },
      json: true
    };

    rp(options).then(function(response) {
      lat.push(response[0].lat);
      lng.push(response[0].lon);

      // записываем результаты в excel-файл
      const columnToWrite = worksheet.getColumn(2);
      for (let count = 0; count < addresses.length; count++) {
        worksheet.getRow(count + 2).getCell(2).value = lat[count];
        worksheet.getRow(count + 2).getCell(3).value = lng[count];
      }
      return workbook.xlsx.writeFile("Адресная программа.xlsx");
    });

    console.log(".");
    
    i++;
    if (i < addresses.length) {

      // в бесплатной версии API разрешены 2 запроса в секунду
      setTimeout(sendRequest, 600);
    }
  }
  sendRequest();
});


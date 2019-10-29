const Excel = require("exceljs"),
      rp = require("request-promise");

const myKey = 'ВВЕДИТЕ ВАШ КЛЮЧ';


console.log("Я родился и начал работу");

// инициализация excel-файла
const workbook = new Excel.Workbook();
workbook.xlsx.readFile("Адресная программа.xlsx").then(function() {
  let addresses = [];
  const worksheet = workbook.getWorksheet("Координаты");

  // считываем все адреса из первого столбца excel-файла
  const columnToRead = worksheet.getColumn(1);
  const totalRowQuantity = columnToRead.values.length - 1;
  for (let i = 2; i <= totalRowQuantity; i++) {
    addresses.push(columnToRead.values[i]);
  }

  // делаем запрос на сервер с задержкой с помощью бесплатного API для геокодинга: https://locationiq.com
    let i = 0,
        coords = [];

  (async function sendRequest() {
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
    coords.push({lat: response[0].lat, lng: response[0].lon});

      console.log(".");
      i++;
      if (i < addresses.length) {
       // Из-за ограничений количества запросов в единицу времени искуственно создаю задержку между запросами: 
        setTimeout(sendRequest, 700);
      } else {
        // после получения ответа по всем адресам записываем результаты в Excel:
        writeToExcel();  
      }
    });
  })();
 
 
  function writeToExcel() {
    console.log("Сохраняю");
    worksheet.getColumn(2);
    for (let count = 0; count < addresses.length; count++) {
      worksheet.getRow(count + 2).getCell(2).value = coords[count]["lat"];
      worksheet.getRow(count + 2).getCell(3).value = coords[count]["lng"];
    }
    return workbook.xlsx.writeFile("Адресная программа.xlsx");
  }
});


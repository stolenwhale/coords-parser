const Excel = require("exceljs"),
      rp = require("request-promise");

console.log("Я родился и начал работу. Подождите, пока я закончу");
const myKey = 'ВВЕДИТЕ ВАШ КЛЮЧ'

// инициализация excel-файла
const workbook = new Excel.Workbook();
workbook.xlsx.readFile("Адресная программа.xlsx").then(function() {
  let addresses = [];
  const worksheet = workbook.getWorksheet("Координаты");

  // считываем все адреса из первого столбца
  const columnToRead = worksheet.getColumn(1);
  const totalRowQuantity = columnToRead.values.length - 1;
  for (let i = 2; i <= totalRowQuantity; i++) {
    addresses.push(columnToRead.values[i]);
  }

  // делаем запрос на сервер с задержкой:
  let i = 0,
    coords = [];

  (async function sendRequest() {
    const url = "https://maps.googleapis.com/maps/api/geocode/json";
    const options = {
      method: "GET",
      url: url,
      qs: {
        address: 'Санкт-Петербург ' + addresses[i],
        key: myKey
      },
      json: true
    };

    rp(options).then(function(response) {
      coords.push(response["results"][0]["geometry"]["location"]);

      console.log(".");
      i++;
      if (i < addresses.length) {
        setTimeout(sendRequest, 100);
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


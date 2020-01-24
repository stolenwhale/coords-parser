const axios = require("axios").default;
const { TOKEN } = require("../keys");
const copy = require("copy-to-clipboard");

window.addEventListener("DOMContentLoaded", () => {
  const notification = document.getElementById("notification");
  const adressesTextarea = document.getElementById("addresses");
  const getCoordsButton = document.getElementById("get-coords");
  const copyCoordsButton = document.getElementById("copy-coords");
  const coordsTable = document.getElementById("coords-table");
  const coordsRows = coordsTable.children.item(1);

  getCoordsButton.onclick = getCoords;
  copyCoordsButton.onclick = copyToClipboard;

  function getCoords() {
    if (adressesTextarea.value === "") {
      showError("Введите хотя бы один адрес");
    } else {
      hideNotification();
      showMessage("Подождите, пока данные загрузятся");
      getCoordsButton.style.display = "none";
      adressesTextarea.style.display = "none";
      coordsTable.style.display = "table";

      const adressesArray = adressesTextarea.value.split("\n");
      for (let i = 0; i <= adressesArray.length; i++) {
        (function(index) {
          setTimeout(function() {
            if (i !== adressesArray.length) {
              // coordsRows.innerHTML += `<tr><td>${adressesArray[i]}</td><td>${i}</td><td>${i}</td></tr>`;

              axios
                .get("https://maps.googleapis.com/maps/api/geocode/json", {
                  params: {
                    key: TOKEN,
                    address: adressesArray[i]
                  }
                })
                .then(function(response) {
                  let coords = response.data.results[0].geometry.location;
                  coordsRows.innerHTML += `<tr><td>${adressesArray[i]}</td><td>${coords.lat}</td><td>${coords.lng}</td></tr>`;
                })
                .catch(function(e) {
                  console.log(e);
                  coordsRows.innerHTML += `<tr><td>В процессе парсинга по адресу <b>${adressesArray[i]}</b> возникла ошибка. Измените адрес и попробуйте снова или обратитесь к администратору.</td></tr>`;
                });
            } else {
              showMessage(
                "Загружено успешно. \n Теперь вы можете скопировать координаты в буфер обмена.\n Для загрузки новых координат нажмите Ctrl + R"
              );
              copyCoordsButton.style.display = "inline-block";
            }
          }, i * 700);
        })(i);
      }
    }
  }

  function copyToClipboard() {
    copy(coordsTable.innerText, {
      format: "text/plain"
    });
  }

  function showError(message) {
    adressesTextarea.style.border = "1px solid #6c0018";
    notification.style.opacity = "1";
    notification.style.color = "#6c0018";
    notification.innerText = message;
  }

  function showMessage(message) {
    notification.style.opacity = "1";
    notification.innerText = message;
  }

  function hideNotification() {
    adressesTextarea.style.border = "1px solid #a9a9a9";
    notification.style.color = "#000000";
    notification.style.opacity = "0";
    notification.innerText = "";
  }
});

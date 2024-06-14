const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');



const url = "https://www.cbnucoop.com/service/restaurant/";

request(url, (error, response, body) => {
  if (error) throw error;

  let $ = cheerio.load(body);

  try {
    let menu_data = {};

    $('table').find('tr').each(function (index, elem) {
      if (index % 6 === 0) {
        // 요일 추출
        let krDay = $(this).find('th').text().trim();

        menu_data[krDay] = {};
      } else {
        let corner = $(this).find('th').text().trim();
        let items = [];

        $(this).find('td .card-body .side').each(function () {
          items.push($(this).text().trim());
        });

        let day = Object.keys(menu_data).pop();
        menu_data[day][corner] = items;
      }
    });

    fs.writeFileSync('menu_data.json', JSON.stringify(menu_data, null, 2));
    console.log("Menu data has been saved!");

    // Flask 서버로 데이터 전송
    request.post({
      url: 'http://127.0.0.1:5000/update_menu',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(menu_data)
    }, (error, response, body) => {
      if (error) throw error;
      console.log("Menu data has been sent to the Flask server!");
    });

  } catch (error) {
    console.error(error);
  }
});

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = "https://www.cbnucoop.com/service/restaurant/";

request(url, (error, response, body) => {
  if (error) throw error;

  let $ = cheerio.load(body);

  try {
    let hanbit_lunch_data = {};

    // 한빛식당의 점심코너를 찾기 위한 각 날짜의 식별자
    const dates = ["06.10(월요일)", "06.11(화요일)", "06.12(수요일)", "06.13(목요일)", "06.14(금요일)"];

    // 최신 날짜의 데이터를 추출 (마지막 날짜가 최신)
    const latest_date = dates[dates.length - 1];
    let menu_items = [];
    $(`#table-18-8-16-${dates.length - 1} .card-body .side`).each((i, elem) => {
      menu_items.push($(elem).text().trim());
    });
    hanbit_lunch_data[latest_date] = menu_items;

    console.log("Latest Hanbit Lunch Menu Data: ", hanbit_lunch_data);

    fs.writeFileSync('hanbit_lunch_data.json', JSON.stringify(hanbit_lunch_data, null, 2));
    console.log("Hanbit lunch data has been saved!");

    // Flask 서버로 데이터 전송
    request.post({
      url: 'http://127.0.0.1:5000/update_menu',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hanbit_lunch_data)
    }, (error, response, body) => {
      if (error) throw error;
      console.log("Hanbit lunch data has been sent to the Flask server!");
    });

  } catch (error) {
    console.error(error);
  }
});

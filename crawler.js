const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const url = "https://www.cbnucoop.com/service/restaurant/";

request(url, (error, response, body) => {
  if (error) throw error;

  let $ = cheerio.load(body);

  try {
    let hanbit_lunch_data = {};

    // �Ѻ��Ĵ��� �����ڳʸ� ã�� ���� �� ��¥�� �ĺ���
    const dates = ["06.10(������)", "06.11(ȭ����)", "06.12(������)", "06.13(�����)", "06.14(�ݿ���)"];

    // �ֽ� ��¥�� �����͸� ���� (������ ��¥�� �ֽ�)
    const latest_date = dates[dates.length - 1];
    let menu_items = [];
    $(`#table-18-8-16-${dates.length - 1} .card-body .side`).each((i, elem) => {
      menu_items.push($(elem).text().trim());
    });
    hanbit_lunch_data[latest_date] = menu_items;

    console.log("Latest Hanbit Lunch Menu Data: ", hanbit_lunch_data);

    fs.writeFileSync('hanbit_lunch_data.json', JSON.stringify(hanbit_lunch_data, null, 2));
    console.log("Hanbit lunch data has been saved!");

    // Flask ������ ������ ����
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

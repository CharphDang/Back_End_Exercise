// 提供请求的
const originRequest = require('request');
// node版本的jquery
const cheerio = require('cheerio');
// 转码解码
const iconv = require('iconv-lite');

function request(url, callback) {
  const options = {
    url: url,
    encoding: null
  };
  originRequest(url, options, callback);
}

for (let i = 100553; i < 100563; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`;
  request(url, function(err, res, body) {
    const html = iconv.decode(body, 'gb2312');
    const $ = cheerio.load(html);
    console.log(
      $('div#Zoom table:nth-of-type(1)')
        .find('a')
        .attr('href')
    );
  });
}

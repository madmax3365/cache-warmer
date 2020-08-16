const { getUrls } = require('./db.js');
const https = require('https');
const async = require('async');

const crawl = async (origin) => {
	const regularWebp = [];
	const regularPng = [];
	const hdWebp = [];
	const hdPng = [];

	const urls = await getUrls();
	for (const url of urls) {
		for (const item of url.regular) {
			regularWebp.push(function (callback) {
				https.get(item, {
					headers: {
						'accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
						'accept-encoding': 'gzip, deflate, br',
						'accept-language': 'en,ru-RU;q=0.9,ru;q=0.8,en-US;q=0.7',
						'referer': 'https://rostrotuar.ru/',
						'sec-fetch-dest': 'image',
						'sec-fetch-mode': 'no-cors',
						'sec-fetch-site': 'same-site',
						'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
					}
				}, function (res) {
					callback(null, res.statusCode);
				}).end()
			});
			regularPng.push(function (callback) {
				https.get(item, {
					headers: {
						'Accept': 'image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5',
						'Referer': 'https://rostrotuar.ru/',
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
						'Accept-Language': 'en-us',
						'Accept-Encoding': 'gzip, deflate, br',
						'Connection': 'keep-alive',
					}
				}, function (res) {
					callback(null, res.statusCode);
				}).end()
			});
		}
		for (const item of url.hd) {
			hdWebp.push(function (callback) {
				https.get(item, {
					headers: {
						'accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
						'accept-encoding': 'gzip, deflate, br',
						'accept-language': 'en,ru-RU;q=0.9,ru;q=0.8,en-US;q=0.7',
						'referer': 'https://rostrotuar.ru/',
						'sec-fetch-dest': 'image',
						'sec-fetch-mode': 'no-cors',
						'sec-fetch-site': 'same-site',
						'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
					}
				}, function (res) {
					callback(null, res.statusCode);
				}).end()
			});
			hdPng.push(function (callback) {
				https.get(item, {
					headers: {
						'Accept': 'image/png,image/svg+xml,image/*;q=0.8,video/*;q=0.8,*/*;q=0.5',
						'Referer': 'https://rostrotuar.ru/',
						'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
						'Accept-Language': 'en-us',
						'Accept-Encoding': 'gzip, deflate, br',
						'Connection': 'keep-alive',
					}
				}, function (res) {
					callback(null, res.statusCode);
				}).end()
			});
		}
	}
	console.time("regularWebp")
	async.parallelLimit(regularWebp, 80, function (err, results) {
		if (err) {
			console.log("Err regularWebp - ", err)
		} else {
			console.log("Success regularWebp")
		}
		console.timeEnd("regularWebp")
		console.time("regularPng")
		async.parallelLimit(regularPng, 80, function (err, results) {
			if (err) {
				console.log("Err regularPng - ", err)
			} else {
				console.log("Success regularPng")
			}
			console.timeEnd("regularPng")
			console.time("hdWebp")
			async.parallelLimit(hdWebp, 80, function (err, results) {
				if (err) {
					console.log("Err hdWebp - ", err)
				} else {
					console.log("Success hdWebp")
				}
				console.timeEnd("hdWebp")
				console.time("hdPng")
				async.parallelLimit(hdPng, 80, function (err, results) {
					if (err) {
						console.log("Err hdPng - ", err)
					} else {
						console.log("Success hdPng")
					}
					console.timeEnd("hdPng")
				});
			});
		});
	});

};

module.exports = crawl;



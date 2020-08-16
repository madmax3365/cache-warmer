const MongoClient = require('mongodb');
const url = 'mongodb://localhost:27017/';

const getUrls = async () => {
	const client = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).catch((err) => {
		console.log(err);
	});

	if (!client) {
		return false;
	}
	let res = false;
	try {
		const db = client.db('rostrotuar');

		let collection = db.collection('image');

		res = (await collection.find().project({ meta: 1 }).toArray()).map(el => {
			const { other } = el.meta.sizes;
			const item = {
				regular: [],
				hd: []
			}
			for (const key in other) {
				if (other.hasOwnProperty(key) && !key.includes('Hq')) {
					const { url } = other[key];
					if (key.includes('Hd')) {
						item.hd.push(url)
					} else {
						item.regular.push(url)
					}
				}
			}

			return item;
		}).flat();
	} catch (err) {
		console.log(err);
		res = false;
	} finally {
		client.close();
		return res;
	}
};

module.exports = { getUrls }
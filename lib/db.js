import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
	if (err) throw err;
	var dbo = db.db('rostrotuar');
	dbo
		.collection('customers')
		.find(query)
		.toArray(function (err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
		});
});

export const getUrls = async () => {
	const client = await MongoClient.connect(url, {
		useNewUrlParser: true,
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

		res = await collection.find().toArray();
	} catch (err) {
		console.log(err);
		res = false;
	} finally {
		client.close();
		return res;
	}
};

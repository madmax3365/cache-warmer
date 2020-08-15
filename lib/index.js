import { getUrls } from './db';

const crawl = async (origin) => {
	const urls = await getUrls();
	console.log(urls);
};

export default crawl;

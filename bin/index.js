#!/usr/bin/env node
import crawl from '../lib/index.js';

const args = process.argv.splice(process.execArgv.length + 2);
const site = `https://${args[0]}`;

crawl(site);

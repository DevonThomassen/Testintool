import { IncomingMessage, ServerResponse } from "http";

// Import classes
import HttpClient from './src/httpClient';
import HttpResult from './src/httpResult';
import SitemapCrawler from './src/sitemapCrawler';
import User from './src/user';

// Import modules
const Url = require('url'),
  Http = require('http'),
  Args = require('minimist')(process.argv.slice(2)),
  Env = require('dotenv').config({ path: './.env' }).parsed;

const defaultPort: number = 80,
  port: number = Args.P || Args.port || Env.PORT || defaultPort;

Http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const data = Url.parse(req.url, true).query;
  const user = new User(`data.user`, `data.pass`);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, { "Content-Type": "application/json" });

  const client = new HttpClient(user);
  const sitemapCrawler = new SitemapCrawler(client, (results: HttpResult[], errors: String[]) => {
    results = results.map((result, i) => {
      return Object.assign({ num: i + 1 }, result);
    });
    res.write(JSON.stringify({
      results: results,
      errors: errors
    }));
    res.end();
  });

  sitemapCrawler.crawlSitemap(data.url || 'none');
}).listen(port, () => {
  console.log(`Running API on port ${port}...`);
});
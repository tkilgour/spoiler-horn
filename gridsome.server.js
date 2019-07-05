const fs = require('fs');
const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const marked = require('marked');
const rawJSON = fs.readFileSync('./spoilerTopics.json');
const spoilerTopics = JSON.parse(rawJSON);
const parser = new Parser();

module.exports = function (api) {
  api.loadSource(async store => {
    const { data: html } = await axios.get('https://overcast.fm/itunes1001591287/reconcilable-differences');
    const $ = cheerio.load(html);

    const { items } = await parser.parseURL('https://www.relay.fm/rd/feed');
    
    const contentType = store.addContentType({
      typeName: 'Shows'
    });

    for (const item of items) {
      const showNotes = item.content.toLowerCase();
      const spoilerIndex = showNotes.indexOf('spoiler');
      const splitURL = item.link.split('/');
      const epId = splitURL[splitURL.length - 1];

      if (spoilerIndex > -1) {
        const timestamps = showNotes.match(/\d*:?\d+:\d+/gi);
        const saniTitle = item.title.replace('Reconcilable Differences ', '');

        const ocEpisode = $(`.title.singleline:contains(${epId})`);
        const ocURL = ocEpisode.closest('a').attr('href');
        const overcastId = ocURL.slice(1, ocURL.length);

        const snippet = marked(item.itunes.summary)

        contentType.addNode({
          id: epId,
          overcastId: overcastId,
          title: saniTitle,
          link: item.link,
          timestamps: timestamps,
          content: item['content:encoded'],
          date: item.pubDate,
          topic: spoilerTopics[epId],
          snippet
        })
      }
    }
  });
}

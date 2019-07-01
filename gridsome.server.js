// 'title',
// 'link',
// 'pubDate',
// 'content:encoded',
// 'enclosure',
// 'content',
// 'contentSnippet',
// 'guid',
// 'isoDate',
// 'itunes'

const fs = require('fs');
const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const xmlString = fs.readFileSync('./recdiffs.xml', 'utf8')
const parser = new Parser();

module.exports = function (api) {
  api.loadSource(async store => {
    console.log('before overcast call');
    const { data: html } = await axios.get('https://overcast.fm/itunes1001591287/reconcilable-differences');
    console.log('after overcast call', html.length);
    const $ = cheerio.load(html);

    // console.log('before relay call');
    // const { items } = await parser.parseURL('https://www.relay.fm/rd/feed');
    // const { data: xml } = await axios.get('https://www.relay.fm/rd/feed');
    // console.log('after relay call', xml.length);
    
    const { items } = await parser.parseString(xmlString);
    
    const contentType = store.addContentType({
      typeName: 'Shows'
    })

    for (const item of items) {
      const showNotes = item.content.toLowerCase();
      const spoilerIndex = showNotes.indexOf('spoiler')
      const splitURL = item.link.split('/');
      const epId = splitURL[splitURL.length - 1];

      if (spoilerIndex > -1) {
        const timestamps = showNotes.match(/\d*:?\d+:\d+/gi);

        const ocEpisode = $(`.title.singleline:contains(${epId})`)
        const overcastId = ocEpisode.closest('a').attr('href')

        contentType.addNode({
          id: epId,
          overcastId: overcastId,
          title: item.title,
          link: item.link,
          timestamps: timestamps,
          content: item.content,
          date: item.pubDate,
          itunes: item.itunes
        })
      }
    }
  });
}

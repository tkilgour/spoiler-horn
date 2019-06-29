// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

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

let Parser = require('rss-parser');
let parser = new Parser();

module.exports = function (api) {
  api.loadSource(async store => {
    const { items } = await parser.parseURL('https://www.relay.fm/rd/feed');

    const contentType = store.addContentType({
      typeName: 'Shows'
    })
    
    for (const item of items) {
      const showNotes = item.content.toLowerCase();

      const spoilerIndex = showNotes.indexOf('spoiler')
      const splitURL = item.link.split('/');
      const id = splitURL[splitURL.length - 1];

      if (spoilerIndex > -1) {
        const timestamps = showNotes.match(/\d*:?\d+:\d+/gi);
        
        contentType.addNode({
          id: id,
          title: item.title,
          link: item.link,
          timestamps: timestamps,
          content: item.content,
          date: item.pubDate,
          itunes: item.itunes
        })
      }
    }
  })

  // api.createPages(({ createPage }) => {
  //   // Use the Pages API here: https://gridsome.org/docs/pages-api
  // })
}

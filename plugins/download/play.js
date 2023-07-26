const { getInfo, chooseFormat } = require('ytdl-core')
const { search } = require('yt-search')
exports.run = {
   usage: ['play'],
   hidden: ['lagu', 'song', 'music'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
         client.sendReact(m.chat, '🕒', m.key)
         const srch = await search(m.text).then((res) => res.videos[0]);
         let yt = await getInfo(srch.url)
         let { url, quality, contentLength } = chooseFormat(yt.formats, { quality: "highestaudio", filter: "audioonly" })
         let caption = `
${yt.videoDetails.title} 

${yt.videoDetails.author.name} (${yt.videoDetails.author.user_url})

${yt.videoDetails.description}
`;
         client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(yt.videoDetails.thumbnails.slice(-1)[0].url)
         }).then(async () => {
            client.sendFile(m.chat, url, yt.videoDetails.title, '', m, {
               document: false,
               APIC: await Func.fetchBuffer(yt.videoDetails.thumbnails.slice(-1)[0].url)
            })
         })
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true,
   cache: true,
   location: __filename
}

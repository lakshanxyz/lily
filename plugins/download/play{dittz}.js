const fetch = require('node-fetch');
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
           let heh = await fetch("https://tiktod.eu.org/youtube/search?v=" + text)
           let result = await (await heh.json()).result[0]
           if (!heh) return m.reply('Video/Audio Tidak Ditemukan')
          let tktd = await fetch("https://tiktod.eu.org/youtube/download?v=" + result.url)
          let json = await tktd.json()
         var caption = ` *乂  Y T - P L A Y*\n\n
◦ *Title* : ${result.title}
◦ *Published* : ${result.published}
◦ *Duration* : ${result.duration.timestamp}
◦ *Views* : ${result.views}
◦ *Description* : ${result.description}\n\n
ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ me...ッ`
client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            ads: true,
            title: `SATSUKI - ${result.title}`,
            url: result.url,
            body: result.description,
            thumbnail: await Func.fetchBuffer(result.thumbnail)
         })
         await client.sendFile(m.chat, json.result.audio, result.title + ".mp3", '', m)
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

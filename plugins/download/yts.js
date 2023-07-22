const yts = require('yt-search')
const axios = require('axios')
exports.run = {
    usage: ['ytsearch'],
    hidden: ['yts'],
    use: 'query',
    category: 'downloader',
    async: async (m, {
       client,
       text,
       isPrefix,
       command,
       Func,
       Scraper
    }) => {
   try {
      global.yts = global.yts ? global.yts : []
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
      const check = global.yts.find(v => v.jid == m.sender)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await (await yts(text)).all
         if (!json || json.length < 1) return client.reply(m.chat, global.status.fail, m)
         if (!check) {
            global.yts.push({
               jid: m.sender,
               results: json.map(v => v.url),
               created_at: new Date * 1
            })
         } else check.results = json.map(v => v.url)
         let p = `~「 Youtube Search 」~\n\n`        
         json.map((v, i) => {
            p += `${i+1}. Title : ${v.title}\n`
            p += `◦ Duration : ${v.timestamp}\n`
            p += `◦ Type : ${v.type}\n`
            p += `◦ Ago : ${v.ago}\n`
            p += `◦ Views : ${(v.views)}\n`
            p += `◦ Link : ${v.url}\n`
            p += `◦ Description : ${v.description}\n\n`
         }).join('\n\n')
         p += global.footer
         client.sendMessageModify(m.chat, p, m, {
            ads: true,
            largeThumb: true,
            url: global.db.setting.link
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

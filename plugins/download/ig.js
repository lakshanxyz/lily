const { igdl } = require('btch-downloader')
exports.run = {
    usage: ['ig'],
    hidden: ['igdl','instagram'],
    use: 'link',
    category: 'downloader',
    async: async (m, {
       client,
       args,
       isPrefix,
       command
    }) => {
       try {
          if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.instagram.com/p/CK0tLXyAzEI'), m)
          if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return client.reply(m.chat, global.status.invalid, m)
          client.sendReact(m.chat, '🕒', m.key)
          let old = new Date()
          let json = await igdl(Func.ttFixed(args[0]))
          //if (!json.url.length) return client.reply(m.chat, Func.jsonFormat(json), m)
         //json.url.map(async v => {
         for (let i of json) {
            client.sendFile(m.chat, i.url, '', `🍟 Fetching : ${((new Date - old) * 1)} ms`, m)
            await Func.delay(1500)
         //})
         }
       } catch (e) {
          console.log(e)
          return client.reply(m.chat, global.status.error, m)
       }
    },
    error: false,
    limit: true,
    cache: true,
    location: __filename
 }

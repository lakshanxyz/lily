const { fbdown } = require('btch-downloader')
exports.run = {
    usage: ['fb'],
    hidden: ['fbdl', 'fbvid'],
    use: 'link',
    category: 'downloader',
    async: async (m, {
       client,
       args,
       isPrefix,
       command
    }) => {
       try {
          if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://fb.watch/7B5KBCgdO3'), m)
          if (!args[0].match(/(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
          client.sendReact(m.chat, '🕒', m.key)
          let json = await fbdown(Func.ttFixed(args[0]))
          if (!json.HD && !json.Normal_video) return client.reply(m.chat, Func.jsonFormat(json), m)
          if (json.HD) return client.sendFile(m.chat, json.HD, Func.filename('mp4'), `◦ Quality : HD`, m)
          if (json.Normal_video) return client.sendFile(m.chat, json.Normal_video, Func.filename('mp4'), `◦ Quality : SD`, m)
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
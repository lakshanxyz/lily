const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

async function uploader(buffer) {
  const { ext } = await fromBuffer(buffer);
  let form = new FormData();
  form.append('file', buffer, 'tmp.' + ext);
  let res = await fetch('https://cdn.btch.bz/upload', {
    method: 'POST',
    body: form
  });
  let img = await res.json();
  if (img.error) throw img.error;
  return 'https://cdn.btch.bz' + img[0].src;
}

exports.run = {
    usage: ['tourl', 'upload'],
    use: 'reply file',
    category: 'converter',
    async: async (m, {
        client,
        text,
        isPrefix,
        command
    }) => {
        try {
            let q = m.quoted ? m.quoted : m;
            let mime = (q.msg || q).mimetype || '';
            if (!mime) return client.reply(m.chat, Func.texted('bold', `Reply Media.`), m);
            if (!(/^image\/.+/.test(mime) || /^video\/.+/.test(mime))) return client.reply(m.chat, Func.texted('bold', `Only for photo or video.`), m);
            let img = await q.download();
            let link = await uploader(img);
            let cap = `${link}\n${img.length} Byte(s)`;
            client.reply(m.chat, cap, m);
        } catch (e) {
            return client.reply(m.chat, Func.jsonFormat(e), m);
        }
    },
    error: false,
    limit: true,
    location: __filename
};

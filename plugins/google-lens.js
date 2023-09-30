import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'
const {
    generateSerpApiUrl
} = await (await import('../lib/serpapi.js'));

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    let [urutan] = args
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'No media found'
    let media = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? uploadImage : uploadFile)(media)
    await m.reply(wait)
    try {
        const param = {
            api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
            engine: 'google_lens',
            url: link
        };
        let all = await generateSerpApiUrl(param)
        let data = all.visual_matches
        if (!urutan) return m.reply("Input query!\n*Example:*\n.goolens [nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.goolens [nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.goolens [nomor]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1]
        let caption = `🔍 *[ HASIL ]*

📋 *Deskripsi:* ${out.title || 'Tidak ada'}
📍 *Source:* ${out.source || 'Tidak ada'}
⭐ *Link:* ${out.link || 'Tidak ada'}
📝 *Thumbnail:* ${out.thumbnail || 'Tidak ada'}
`;

        await m.reply(caption)
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["goolens *[nomor]*"]
handler.tags = ["search"]
handler.command = /^(goolens)$/i
export default handler
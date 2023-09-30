import {
    createProdia
} from "prodia";

const apiKey = "df165bab-9893-4f02-92bf-e8b09592b43a";
const prodia = createProdia({
    apiKey,
});

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    const input_data = await prodia.listModels();

    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n.txt2img [nomor]|[query]")

    await m.reply(wait)
    try {
        let data = input_data.map((item, index) => ({
            title: item.replace(/[_-]/g, ' ').replace(/\..*/, ''),
            id: item
        }));
        if (!urutan) return m.reply("Input query!\n*Example:*\n.txt2img [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.txt2img [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.txt2img [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id

        const generateImageParams = {
            prompt: encodeURIComponent(tema),
            model: out,
            upscale: true
        };
        const openAIResponse = await prodia.generate(generateImageParams);

        if (openAIResponse) {
            const result = await prodia.wait(openAIResponse);
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: result.imageUrl
                },
                caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["txt2img *[nomor]|[query]*"]
handler.tags = ["ai"]
handler.command = /^(txt2img)$/i
export default handler
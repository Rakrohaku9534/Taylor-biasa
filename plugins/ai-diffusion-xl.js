import {
    HuggingFaceBuffer
} from '../lib/huggingface.js';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else return m.reply("Masukkan pesan!")
    await m.reply(wait)
    try {
        const MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';
        const openAIResponse = await HuggingFaceBuffer(MODEL, text);

        if (openAIResponse) {
            await m.reply(openAIResponse)
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        await m.reply(eror);
    }
}
handler.help = ["diffusionxl"]
handler.tags = ["fun"]
handler.command = /^diffusionxl$/i
export default handler
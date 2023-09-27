import fetch from "node-fetch"

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
    } else throw "Input Teks"
    await m.reply(wait)
    try {
            let res = await ChatGptV2(text)
            await m.reply(res.answer)
        } catch (e) {
        try {
            let res = await ChatGptV3(text)
            await m.reply(res[0].generated_text)
            } catch (e) {
            throw eror
            }
        }
}
handler.help = ["chatgpt"]
handler.tags = ["internet"]
handler.command = /^chatgpt$/i

export default handler

/* New Line */
async function ChatGptV2(query) {
  try {
    const response = await fetch(`https://api.caonm.net/api/ai/o.php?msg=${query}`);
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
async function ChatGptV3(query) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer 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",
                },
                body: JSON.stringify({
                    inputs: query
                }),
            }
        );

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}
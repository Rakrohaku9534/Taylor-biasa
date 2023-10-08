import fetch from 'node-fetch';

const getaliciaResponse = async (q, u) => {
  try {
    const response = await fetch(`https://api.azz.biz.id/api/alicia?q=${q}&user=${u}&key=global`);
    const data = await response.json();
    return data.respon;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handler = async (m, { text }) => {
  if (!text) throw 'Contoh: .alicia Pesan yang ingin Anda sampaikan kepada asisten AI';

  m.reply(wait);
  
  try {
    
    const response = await getaliciaResponse(text, m.name);

    m.reply(response);
  } catch (error) {
    console.error('Error:', error);
    m.reply(eror);
  }
};

handler.help = ['alicia'];
handler.tags = ['ai'];
handler.command = /^(alicia)$/i;

export default handler;
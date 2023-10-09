import fetch from 'node-fetch';

export async function before(m) {
  const { characterai } = global.db.data.chats[m.chat] || {};
  if (m.isBaileys || !characterai || !m.text) return false;

  const text = m.text.replace(/[^\x00-\x7F]/g, '').trim();
  if (!text) return false;

  const characterNames = [
    "Homer Simpson","The Rock","Joe Rogan","Darth Vader","Logan Paul",
    "Snoop Dogg","Howard Stern","Tony Stark","Peter Griffin","Elon Musk",
    "Eminem","Jerry Seinfeld","Spongebob Squarepants","Billie Eilish",
    "Sherlock Holmes","Batman","Jimmy Fallon","Socrates","Harry Potter",
    "Andrew Tate","Santa Claus"
  ];

  const words = text.split(' ');

  if (words.length === 3 && words[0].toLowerCase() === 'character' && !isNaN(words[2])) {
    const characterNumber = parseInt(words[2]) - 1;
    if (characterNumber >= 0 && characterNumber < characterNames.length) {
      characterai.name = characterNames[characterNumber];
    } else {
      await this.reply(m.chat, `*Nomor karakter tidak valid*`, m);
      await this.reply(m.chat, `*List nama karakter:*\n${characterNames.join(', ')}`, m);
      return true;
    }
  } else {
    await this.reply(m.chat, `*Format input tidak benar. Gunakan format: "character set nomor"*`, m);
    await this.reply(m.chat, `*List nama karakter:*\n${characterNames.join(', ')}`, m);
    return true;
  }

  const name = characterai.name;
  const url = `https://api.yanzbotz.my.id/api/ai/characterai?text=${encodeURIComponent(text)}&name=${name}`;

  try {
    const api = await fetch(url);
    const res = await api.json();

    if (res.result) {
      await this.reply(m.chat, `*${name} says:*\n${res.result || ''}`, m);

      if (text.trim().toUpperCase() === 'characterai stop') {
        characterai = false;
        await this.reply(m.chat, `*${name} stop success*`, m);
      }
      return true;
    }
  } catch {
    // Handle errors here
  }

  await this.reply(m.chat, `*characterai error*`, m);
  return true;
}

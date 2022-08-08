import e from"./emojiList.json.js";function o(o,t){return e.filter((e=>!!e.title.toLowerCase().includes(o.toLowerCase())||!!e.keywords.includes(o))).slice(0,t)}export{o as filterEmoji};
//# sourceMappingURL=filterEmoji.js.map

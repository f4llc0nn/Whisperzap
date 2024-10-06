const wa = require('@open-wa/wa-automate');
const mime = require('mime-types');
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const path_mp3 = process.env.PATH_MP3 ? process.env.PATH_MP3 : '.' ;
const sessionDataPath = process.env.PATH_SESSION ? process.env.PATH_SESSION : './' ;
const groups = process.env.GROUPS ? process.env.GROUPS : 'xxxx,yyyy' ;
const allowedGroups = groups.split(',');
const user_phone = process.env.USER_PHONE ? process.env.USER_PHONE +'@c.us' : 'NA' ;

wa.create({
    useChrome: true,
    sessionId: "WhatsAppTranscription",
    multiDevice: true,
    authTimeout: 60,
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: 'PT_BR',
    logConsole: true,
    popup: true,
    qrTimeout: 0,
    sessionDataPath,
}).then(client => start(client));

function start(client) {
    client.onAnyMessage(async message => {
        const sender = message.sender?.pushname || message.sender?.verifiedName || message.sender?.shortName || 'Unknown_Sender';
        const isGroupMessage = message.isGroupMsg;
        const groupId = message.chatId;
        const fromUserId = message.sender?.id || 'Unknown_ID';

	//console.log(`Debug: ${JSON.stringify(message, null, 2)}`);
        const msg = (isGroupMessage) ? `${sender} (${fromUserId}) @ ${message.chat.groupMetadata.subject} : ${message.body}` : `${sender} (${fromUserId}) : ${message.body}`;
	console.log(msg);

        if (message.type === "ptt" || message.type === "audio") {
            const filename = `${path_mp3}/${message.id}.${mime.extension(message.mimetype)}`;
            const mediaData = await wa.decryptMedia(message);

            fs.writeFile(filename, mediaData, err => {
                if (err) { return console.log(err); }
                console.log('Voice file saved:', filename);
            });
        }

        if ((`${user_phone}` === "NA" || message.from === `${user_phone}`) &&
		message.body === "!w" &&
		message.quotedMsg &&
		(message.quotedMsg.type === "ptt" || message.quotedMsg.type === "audio")) {
	    console.log(`'!w' command triggered by ${sender}`);
            const originalMessageId = message.quotedMsg.id;
            const filePath = `${path_mp3}/${originalMessageId}.${mime.extension(message.quotedMsg.mimetype)}`;

            if (fs.existsSync(filePath)) {
                console.log(`Transcribing file: ${filePath}`);
                const resp = await openai.createTranscription(fs.createReadStream(filePath), "whisper-1");
                console.log(`Transcribed text: ${resp.data.text}`);
                await client.reply(message.chatId, `🗣️ ${resp.data.text}`, message.id);
            } else {
                console.log('File not found for transcription:', filePath);
            }
        }
    });
}

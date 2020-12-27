const Net = require('net');

const client = new Net.Socket();
client.on('data', function(data) {
    console.log('[Client] Data from Remote Server : ' + data);
});
client.on('error', function(e) {
    console.log('[Client] Unexcepted Error', e)
});
client.on('timeout', function() {
    console.log('[Client] Time Out')
});

let ready = false;

function genID(len = 14) {
    let text = "";
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function sendMessage(ip, message) {
    try {
        console.log("[Client] Try to login")
        client.connect({
            port : 12135,
            host : ip
        }, function() {
            client.setEncoding('utf8');
            console.log('[Client] Connected');
            client.write(message)
            console.log('[Client] Message sent');
            client.destroy();
        });


    } catch(e) {
        console.log('[Client] Unexcepted Error', e)
    }
}

function genPage(page, refreshOnly = false) {
    const callbacks = [];
    const prefix = refreshOnly ? "rfp=" : "ufp="
    const id = Math.floor(100000 + Math.random() * 900000)
    return {
        json : `${prefix}{"COMMUNICATION_RESULT_PAGE":${JSON.stringify(JSON.stringify({
            "BG" : page.backgroundColor ? ((page.backgroundColor[0] & 0xFF) << 24 | (page.backgroundColor[1] & 0xFF) << 16 | (page.backgroundColor[2] & 0xFF) << 8 | (page.backgroundColor[3] & 0xFF) << 0) : 0,
            "MAX" : !!page.maximized,
            "BGI" : page.backgroundImage,
            "kGB" : !!page.groupBoutons,
            "KEY_ID" : new Date().getTime(),
            "BUTTONS" : page.buttons.map((value, indexX) => value.map((button, indexY) => {
                if(!button) return {}
                if(typeof button.callback === "function") {
                    if(!callbacks[indexX]) callbacks[indexX] = []
                    callbacks[indexX][indexY] = button.callback
                }

                return {
                    "BE" : button.backgroundEnd ? ((button.backgroundEnd[0] & 0xFF) << 24 | (button.backgroundEnd[1] & 0xFF) << 16 | (button.backgroundEnd[2] & 0xFF) << 8 | (button.backgroundEnd[3] & 0xFF) << 0) :
                        button.background ? ((button.background[0] & 0xFF) << 24 | (button.background[1] & 0xFF) << 16 | (button.background[2] & 0xFF) << 8 | (button.background[3] & 0xFF) << 0) : 0,
                    "id" : genID(),
                    "T" : button.title || "",
                    "I" : button.image || "",
                    "BG" : button.background ? ((button.background[0] & 0xFF) << 24 | (button.background[1] & 0xFF) << 16 | (button.background[2] & 0xFF) << 8 | (button.background[3] & 0xFF) << 0) : 0,
                    "TC" : button.textColor || -6730394,
                    "BiT" : !!button.isBackgroundTransparent,
                    "IiS" : !!button.isIconStretched,
                    "TP" : 2,
                    "TA" : 5,
                    "TS" : button.textSize || -1,
                    "BiR" : !!button.rounded,
                    "ITS" : !!button.textShadow,
                    "inB" : !!button.initialState,
                    "inS" : "",
                    "inC" : button.initialCounter || 0,
                    "COLS" : button.columns,
                    "ROWS" : button.rows,
                }
            })),
            "kFM" : 0,
            "VERSION" : 2,
            "KEY_TITLE" : page.title || "(main)",
            "KEY_COLUMNS" : page.columns || 4,
            "KEY_ROWS" : page.rows || 2,
            "BTN_MARGIN" : page.boutonMargin || 1,
            "PO" : page.orientation || 1
        }))}}`,
        callbacks
    }
}


module.exports = {
    sendMessage,
    genPage
}

/*
[
            [
                {
                    "BE":-10085837,
                    "BG":-6730394,
                    "I":"win01.png",
                    "ITS":true,
                    "BiR":false,
                    "BiT":false,
                    "COLS":1,
                    "TA":5,
                    "TC":-1,
                    "inS":"",
                    "IiS":false,
                    "T":"",
                    "id":"u764wlc110eug",
                    "TP":2,
                    "inB":false,
                    "TS":-1,
                    "inC":0,
                    "ROWS":1
                }
            ],
            [
                {
                    "BE":-15448942,
                    "BG":-12817222,
                    "I":"",
                    "ITS":true,
                    "BiR":false,
                    "BiT":false,
                    "COLS":1,
                    "TA":5,
                    "TC":-1,
                    "inS":"",
                    "IiS":false,
                    "T":"Example Toggle Button, Press to see",
                    "id":"u389eco952bmt",
                    "TP":2,
                    "inB":false,
                    "TS":-1,
                    "inC":0,
                    "ROWS":1
                }
            ]
        ]
* */

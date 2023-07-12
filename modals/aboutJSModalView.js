module.exports = () => {
    return {
        "type": "modal",
        "callback_id": "modal-submit",
        "submit": {
            "type": "plain_text",
            "text": "学習を始める",
            "emoji": true
        },
        "close": {
            "type": "plain_text",
            "text": "閉じる",
            "emoji": true
        },
        "title": {
            "type": "plain_text",
            "text": "JavaScriptを学ぶ",
            "emoji": true
        },
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "JavaScriptはWebアプリ開発で主に使用されるプログラミング言語です。\nこのコースでの質問は #javascript質問部屋 で行えます。"
                }
            }
        ]
    }
};
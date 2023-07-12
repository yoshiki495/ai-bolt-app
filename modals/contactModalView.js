module.exports = () => {
    return {
        "type": "modal",
        "close": {
            "type": "plain_text",
            "text": "閉じる",
            "emoji": true
        },
        "title": {
            "type": "plain_text",
            "text": "お問い合わせ",
            "emoji": true
        },
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "開発者 <@U05FB9E38CQ> にSlackのDMにてお問合せください。"
                }
            }
        ]
    }
};
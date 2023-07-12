module.exports = () => {
    return {
        type: 'home',
        callback_id: 'home_view',

        /* body of the view */
        blocks: [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "AI Tutorへようこそ:tv:"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*コース一覧*"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*JavaScriptを学ぶ*\nJavaScriptはWebアプリ開発で主に使用されるプログラミング言語です。\nこのコースでの質問は #javascript質問部屋 で行えます。"
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "コースを見る",
                        "emoji": true
                    },
                    "value": "public-relations",
                    "action_id": "open_js_modal_clicked"
                }
            },
            {
                "type": "divider"
            },
            // {
            //     "type": "section",
            //     "text": {
            //         "type": "mrkdwn",
            //         "text": "*Pythonを学ぶ*\nPythonはWebアプリ開発・機械学習で主に使われるプログラミング言語です。\nこのコースでの質問は #python質問部屋 で行えます。"
            //     },
            //     "accessory": {
            //         "type": "button",
            //         "text": {
            //             "type": "plain_text",
            //             "text": "コースを見る",
            //             "emoji": true
            //         },
            //         "value": "public-relations"
            //     }
            // },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "コースの追加申請",
                            "emoji": true
                        },
                        "value": "new_configuration"
                    }
                ]
            },
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "ヘルプ",
                    "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "AI Tutorとは",
                            "emoji": true
                        },
                        "style": "primary",
                        "value": "create_task",
                        "url": "https://ailearning-fd8ce.web.app/"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "お問い合わせ",
                            "emoji": true
                        },
                        "value": "create_task",
                        "action_id": "open_contact_modal_clicked"
                    }
                ]
            }
        ]
    }
}
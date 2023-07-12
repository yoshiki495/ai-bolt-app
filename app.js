require('dotenv').config();
const { App } = require('@slack/bolt');
const { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } = require("openai");
const appHomeView = require('./appHomeView');
const aboutJSModalView = require('./modals/aboutJSModalView');
const javascriptMessage = require('./messages/javascriptMessage');
const contactModalView = require('./modals/contactModalView');

// TODO: .envファイルに、自身のものを設定する。.envファイルをGitで管理しないよう注意。
// OPENAI_API_TOKEN, SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN, SLACK_APP_TOKEN, SLACK_BOT_ID

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    port: process.env.PORT || 3000,
})

app.event("app_mention", async ({ event, client, say }) => {
    // スレッドのトップのメッセージであればthread_ts、スレッド中のメッセージであればtsを取得する。
    const threadTs = event.thread_ts ? event.thread_ts : event.ts;

    try {
        // スレッドのメッセージを取得
        const threadMessagesResponse = await client.conversations.replies({
            channel: event.channel,
            ts: threadTs,
        });
        const threadMessages = threadMessagesResponse.messages

        const slackBotId = process.env.SLACK_BOT_ID;

        // OpenAI APIに渡すためのメッセージオブジェクトを作成する。
        const mentionMessages =
            threadMessages.map(message => {
                // メンション付きのものだけを抽出する。ここら辺は好み。
                if (message.text?.includes(`<@${slackBotId}>`) || message.text?.includes(`<@${message.user}>`)) {
                    const role = message.user === slackBotId ? ChatCompletionRequestMessageRoleEnum.Assistant : ChatCompletionRequestMessageRoleEnum.User
                    const shaped = message.text.replace(`<@${slackBotId}>`, "").replace(`\n`, "");
                    const input = "受講生の" + shaped + "という質問に対して返答をしてください。";
                    return { role: role, content: input }
                };
            }).filter(e => e)　// undefinedを除く

        console.log(mentionMessages);

        // Chat completions APIを呼ぶ
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "あなたはプラグラミング学習プログラムのチューターをしています" },
                mentionMessages[0]
            ]
        });

        const message = response.data.choices[0].message.content;

        // Slack APIを呼んで回答を送信
        await say(
            {
                text: `<@${event.user}>\n ${message}`,
                thread_ts: threadTs
            }
        );

    } catch (e) {

        await say(
            {
                text: `<@${event.user}>\n 不具合が発生しました。開発者にお問い合わせください。`,
                thread_ts: threadTs
            }
        );

    }
});

// All the room in the world for your code
app.event('app_home_opened', async ({ event, client, context }) => {
    try {
        /* view.publish is the method that your app uses to push a view to the Home tab */
        const result = await client.views.publish({

            /* the user that opened your app's app home */
            user_id: event.user,

            /* the view object that appears in the app home*/
            view: appHomeView()
        });
    }
    catch (error) {
        console.error(error);
    }
});

app.action("open_js_modal_clicked", async ({ ack, body, context }) => {
    ack();

    try {
        const result = await app.client.views.open({
            token: context.botToken,
            trigger_id: body.trigger_id,
            view: aboutJSModalView()
        });
    } catch (e) {
        console.log(e);
        app.error(e);
    }
});

app.view('modal-submit', async ({ ack, body, client }) => {
    // Submitボタンが押されたことを確認
    await ack();

    // ユーザーにDMを送る処理を実装
    const userId = body.user.id;
    const dmText = 'JavaScript基礎学習が開始されました。'; // 送信するメッセージの内容
    try {
        await client.chat.postMessage({
            channel: userId,
            text: dmText,
            blocks: javascriptMessage()
        });
    } catch (error) {
        console.error('Failed to send DM:', error);
    }
});

app.action("open_contact_modal_clicked", async ({ ack, body, context }) => {
    ack();

    try {
        const result = await app.client.views.open({
            token: context.botToken,
            trigger_id: body.trigger_id,
            view: contactModalView()
        });
    } catch (e) {
        console.log(e);
        app.error(e);
    }
});


// Start your app
(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();

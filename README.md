# 5000choyen-api
5000兆円欲しい！をnode-canvasを使用しサーバーサイドで生成できるようにしたものです。

# how to use

http:\/\/5000choyen.app.cyberrex.ml/image?top=上部文字列&bottom=下部文字列

↓

![a](http://5000choyen.app.cyberrex.ml/image?top=上部文字列&bottom=下部文字列)

注意: HTTPS版は`gsapi.cyberrex.ml`です。

# spec
画像形式: PNG/JPEG/WebP (アルファチャンネルあり、背景透明)

最大横幅: 3840px

# parameters

|name|value|description|
|----|----|----|
|top|-|上部文字列|
|bottom|-|下部文字列|
|type|png/jpg/webp|PNG/JPEG/WebPの切り替え|
|q|-|画質(1～100)|
|hoshii|true/false|下部文字列を「欲しい！」に固定する|
|noalpha|true/false|背景色を白にする|
|rainbow|true/false|虹色にする ※1|
|single|true/false|上部・下部どちらかをレンダリング ※2|

※1：hoshiiが`true`の場合、下部は虹色になりません。

※2：topとbottomを両方指定するとエラーになります。
　　　hoshiiは無視されます。

# caution

文字列が短いと横幅が自動で調整されて短くなります。

どんなに長くても3840pxまでしか横幅は伸びません。

過剰なアクセスはお控えください。

# thanks
このプログラムは、yurafuca様が作られたものをベースにNode.js向けに改良を加えつつ、サーバーサイドに移植したものです。
原作リポジトリは[こちら](https://github.com/yurafuca/5000choyen)


DDoS Protection by

<img src="https://cyberrex.rsvr.jp/cf-logo-v-rgb.png" width="320">

# support
5000兆円APIのサポートはGitHubのIssue、またはDiscordサーバーで受け付けています。

Discordサーバーは[こちら](https://discord.gg/AWDSYhJHgk)

# fonts
このジェネレーターは以下のフォントを使用しています。

Noto Sans CJKjp Black

Noto Serif CJKjp Black

これらのフォントはオープンフォントライセンスに基づきGoogle Fontsよりダウンロード可能です。

# applications
※採用事例歓迎です！！

## 怪しい日本語ジェネレーター
by Submarine.online

[Available on Google Play](https://play.google.com/store/apps/details?id=com.shenyusoftware.correctjp)

## 唯香 -ゆいか- (Discordボット)
by [ryoさん / ryosan1210](https://twitter.com/ryosan1210_0625)

[公式ウェブサイト](https://yuika.ryosan1210.net/)

## SevenBot (Discordボット)
![`sb#image 5000 このAPI 便利！`](https://imgur.com/ht4mxep.png)

by [名無し。](https://twitter.com/MNoNamer)

[公式ウェブサイト](https://sevenbot.jp/)

## 5000兆円欲しいジェネレーター
by [ゆ～ぺぃ/YU-PEI](https://twitter.com/nerrog_blog)

### Windows10用

[インストール方法](https://github.com/nerrog/5000choyen-gen#インストール)

### Appleデバイス用

※iOS/iPadOS 12.3以降、macOS 11.0以降またはM1 Macが必要です。

[Download on the App Store](https://apps.apple.com/jp/app/5000%E5%85%86%E5%86%86%E6%AC%B2%E3%81%97%E3%81%84-%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC/id1561524482)

## 5000兆円欲しい！ジェネレーター for Twitter 

ブラウザでTwitterを使う際、ツイート画面にジェネレーターを設置します。

[Chromeはこちら](https://chrome.google.com/webstore/detail/5000%E5%85%86%E5%86%86%E6%AC%B2%E3%81%97%E3%81%84%EF%BC%81%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC-for-twi/ligkpmbekohamaijpdfgplnkefamiohm)

[Firefoxはこちら(v1.0)](https://cdn.cyberrex.ml/dl/plugin/5000choyen_generator_for_twitter/fx/5000choyen_generator_for_twitter-1.0-an%2Bfx.xpi)

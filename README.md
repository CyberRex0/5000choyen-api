# 5000choyen-api
5000兆円欲しい！をnode-canvasを使用しサーバーサイドで生成できるようにしたものです。

# how to use

http:\/\/5000choyen.app.cyberrex.ml/image?top=上部文字列&bottom=下部文字列

↓

![a](http://5000choyen.app.cyberrex.ml/image?top=上部文字列&bottom=下部文字列)

注意: HTTPS版は`gpapi.cyberrex.ml`です。

# spec
画像形式: PNG (アルファチャンネルあり、背景透明)

基本解像度: 1920x1080

# parameters

|name|value|description|
|----|----|----|
|top|-|上部文字列|
|bottom|-|下部文字列|
|type|png/jpg/webp|PNG/JPEG/WebPの切り替え|
|hoshii|true/false|下部文字列を「欲しい！」に固定する|
|noalpha|true/false|背景色を白にする|


# caution

基本解像度は1920x1080ですが、文字列が短いとこの解像度より小さくなる場合があります。

どんなに長くても最大1920x1080です。

過剰なアクセスはお控えください。

# thanks
このプログラムは、yurafuca様が作られたものをベースにNode.js向けに改良を加えつつ、サーバーサイドに移植したものです。
原作リポジトリは[こちら](https://github.com/yurafuca/5000choyen)

# fonts
このジェネレーターは以下のフォントを使用しています。

Noto Sans JP Black

Noto Serif JP Black

これらのフォントはオープンフォントライセンスに基づきGoogle Fontsよりダウンロード可能です。

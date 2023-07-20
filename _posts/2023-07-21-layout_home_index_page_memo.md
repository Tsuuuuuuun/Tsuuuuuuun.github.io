---
title: "忌まわしき --- layout: home # index page ---"
author: Hayato Tsumura
date: 2023-07-21 01:38:17 +09:00
categories: Tech_blog
tags: [GitHub pages, Jekyll]
math: true
mermaid: true
---

Chirpyを使っていると頻繁に出くわすのが `--- layout: home # index page ---` です. 手元の環境ではうまくビルドされるし, GitHub くんも「ちゃんとデプロイできましたよ!」 とばかりに緑のチェックマークを返してくるのですが, それでも `--- layout: home # index page ---` はやってきます. 実際にテーマ元の issue を見ると大量にこれで悩み質問している人がいます. 今後の自分のためにも遭遇するパターンを書き残しておきたいと思います. 出会ったら適宜ここに追記します[^1].

## markdown や yml の文法が正しくない

これは初心者が陥るエラーです. configファイルを編集する際に `url` と `baseurl` の違いがわからず正しくないurl を書き込んでしまったりするとエラーが発生します. また, markdown の文法が明らかに正しくないと html に変換する過程でエラーが発生してしまいます. ただしこのエラーは Github くんがきちんとビルド失敗したと教えてくれてエラーメッセージを読むことで解決ができるので優しいエラーだと思います.

## username.github.io の直下はなるべく弄らない

前に書いた構築記事で, 新しい記事の作成の際にfront matter をいちいち書くのが面倒なのでシェルスクリプトでコマンド化すると便利と書きましたが, それをgithub上にアップロードすると `--- layout: home # index page ---` が発生します. ps1だと問題なかったので拡張子なしでアップロードするのがまずいのかもしれません[^2]. あと, README.mdも書き換えると `--- layout: home # index page ---` が発生する上にこれをしてしまうと元の内容に戻しても正しく機能してくれません. [https://github.com/cotes2020/jekyll-theme-chirpy/issues/502](https://github.com/cotes2020/jekyll-theme-chirpy/issues/502) にてこの問題が論じられていて[^3], `.github/workflows/pages-deploy.yml` で `paths-ignore` を改善すれば解決すると書かれていますが, 自分の場合はそれもうまくいかなかったので, username.github.io の直下で, `_site` に影響しそうな変更(拡張子なし, txt, mdファイルをいじる) はなるべく行わないほうが無難かもです.

**footnote**

[^1]: 願わくば二度と出くわしたくない
[^2]: .shならいけるのかもしれないけど怖くて再現取ってません.
[^3]: ここに書かれているけど明確なbugではあると思う.
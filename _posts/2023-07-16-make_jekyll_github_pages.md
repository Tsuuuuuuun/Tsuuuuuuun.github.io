---
title: "Jekyllを用いたGitHub pages の構築"
author: Hayato Tsumura
date: 2023-07-16 18:03:14 +09:00
categories: [Tech_blog]
tags: [GitHub pages, Jekyll]
layout: post
math: true
mermaid: true
toc: true
---

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%; padding-top: 120px;"><a href="https://github.com/Tsuuuuuuun/Tsuuuuuuun.github.io" data-iframely-url="//iframely.net/QxUEsBY"></a></div></div><script async src="//iframely.net/embed.js"></script>

## 環境

Windows 11

## きっかけ

直接的なきっかけとしては, 博士に進学する先輩が, 学振の出願の際に自分のウェブサイトを持っていたほうがいいということを言っていたからというものです.

[http://www.rpd.titech.ac.jp/jsps_tokken/docs/tokyotech-ohue2022-pub.pdf](http://www.rpd.titech.ac.jp/jsps_tokken/docs/tokyotech-ohue2022-pub.pdf)

東工大の大上先生が公開しているこのスライドの85枚目もそういっていました. 私は博士に進学するかどうかは未定ですが, 就職の際でも自分のプロフィール的なものはあったほうがいいかもという気がします.

じゃあnoteやはてなブログでもいいじゃないかとも思いましたし, 実際に両者とも使ったことはあるのですが, 外部のサービスに依存しているとサービス終了とかになったときに復旧の手段がなさそうというのを, かつてのcakesのサ終で実感したので, 手元とGitHub上にデータを置いておきたいという気持ちがあります. それとやっぱり自分のホームページというのはテンションがあがります.

私がホームページ作成にあたって重視した条件は,

- Markdownで書けること
- 無料でできること
  - 大昔にWordPressを使ったことがあるがサーバー維持代がやはり厳しい
- 広告はできるだけないほうがいい

といった感じで, GitHub pagesがそれにちょうど該当したので作成してみました.

## 準備

### jekyllの準備

今回はjekyllを用いて構築を行いました.[^1] jekyllはRubyのGemとして提供されているので, RubyとRubyGemsのインストールが必要です. なので, [https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/) のWITH DEVKITからダウンロードします. インストールが完了すれば, 以下のコマンドでバージョンが確認できるようになっているはずです.

```bash
ruby -v
```

```bash
gem -v
```

Ruby と RubyGems がインストールできたことを確認したら, jekyll と bundler をインストールします.

```bash
gem install jekyll bundler
```

jekyll が インストールできているかどうか, 以下のバージョン確認のコマンドで確認します.

```bash
jekyll -v
```

これでJekyllがインストールされ, 新しいJekyllサイトを作成したり既存のサイトをビルドしたりすることができます.

### Github pagesの準備

当然ですが GitHub のアカウントが必要です. アカウントを登録して, PC の ssh キーと GitHub のアカウントを紐づけておきましょう.

sshキーの導入法: [https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

この記事はある程度 Git が使えることを前提として書かれています. わからないところがあったら適宜ggったりChatGPTに聞いてください.

アカウントの登録ができたら, ページを作る用のレポジトリを作成します. リポジトリ名は username.github.io の形式である必要があります.

私の場合は1からサイトを構築するのではなく, chirpyというテーマをフォークして作成しました. [https://github.com/cotes2020/jekyll-theme-chirpy/](https://github.com/cotes2020/jekyll-theme-chirpy/) から入手できますが, 手元の環境だと`--- layout: home # Index page ---` のみ出力されてしまうというバグに遭遇しました. [https://github.com/cotes2020/jekyll-theme-chirpy/issues/628](https://github.com/cotes2020/jekyll-theme-chirpy/issues/628) に対処法等の議論がなされており, linux環境だとうまくいくとか, source を Github Actions として設定すればいいとか書いてますが, うまく行きませんでした. 代わりに[https://github.com/cotes2020/chirpy-starter](https://github.com/cotes2020/chirpy-starter)からフォークすることで解消されたので, 使いたい方はこちらを使うことをおすすめします. 他のテーマは以下のサイトから探すことができるので, 好みのテーマを使えばよいでしょう.

- [https://jamstackthemes.dev/ssg/jekyll/](https://jamstackthemes.dev/ssg/jekyll/)
- [http://jekyllthemes.org/](http://jekyllthemes.org/)
- [https://jekyllthemes.io/](https://jekyllthemes.io/)
- [https://jekyll-themes.com/](https://jekyll-themes.com/)

フォークしたら `_config.yml` を自分用にカスタマイズして, 変更をコミット・プッシュすればホームページが作成されます.

```bash
git add .
git commit -m "Your commit message"
git push origin master
```

コミット・プッシュせずに手元でビルドしたい場合は, 以下のコマンドを実行して [http://127.0.0.1:4000/](http://127.0.0.1:4000/) にアクセスすることで編集中のページを見ることができます.

```bash
bundle exec jekyll serve
```

予稿を`_drafts`に入れて、以下のコマンドを叩けば予稿を見ることも出来ます。

```bash
bundle exec jekyll serve --drafts
```

これで環境構築は完了です.

## Front Matter

これで一応構築完了なのですが, postを作成する際にいちいち Front Matter を入力するのは大変です(特に日時). なのでそれをコマンドラインでできるようにしました. windowsでは bash スクリプトを動かすことはできないので, 代わりに PowerShell を使います.

```powershell
param (
    [Parameter(Mandatory=$true)]
    [string]$title
)

$slug = $title.Replace(" ", "_").ToLower()

$date = Get-Date -Format "yyyy-MM-dd"

$file = "_posts/$date-$slug.md"

$imgPath = "img/$date-$slug"

New-Item -ItemType Directory -Force -Path $imgPath

$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss K"

@"
---
title: "$title"
author: Hayato Tsumura
date: $date
categories: 
tags: 
math: true
mermaid: true
image:
  path:
  lqip: 
  alt:
---

"@ | Out-File -FilePath $file -Encoding utf8
```

新しく post を作成したい際には以下のコマンドを PowerShell で実行します.

```powershell
.\newpost.ps1 "My New Post"
```

こうすることで Front Matter をいちいち書き込むという作業を回避できます.

WSLを導入しているなら bash ファイルを起動できるので以下のファイルを作成すればコマンドを打ち込むだけで新しい投稿が作成されます.

```bash
#!/bin/bash

TITLE="$1"
SLUG="$(echo -n "$TITLE" | sed -e 's/ /_/g' | tr [:upper:] [:lower:])"

DATE=$(date +"%Y-%m-%d")

FILE="_posts/$DATE-$SLUG.md"

imgPath="img/$date-$slug"

mkdir -p "$imgPath"

DATE=$(date +"%Y-%m-%d %H:%M:%S %z")

# The content of the new post
echo "---" >> $FILE
echo "title: \"$TITLE\"" >> $FILE
echo "author: cotes" >> $FILE
echo "date: $DATE" >> $FILE
echo "categories:" >> $FILE
echo "tags:" >> $FILE
echo "math: true" >> $FILE
echo "mermaid: true" >> $FILE
echo "toc: true" >> $FILE
echo "image:" >> $FILE
echo "  path:" >> $FILE
echo "  lqip: " >> $FILE
echo "  alt: " >> $FILE
echo "---" >> $FILE
echo "" >> $FILE
```

```bash
./newpost "My New Post"
```

**footnote**

[^1]: 本当はHugoを使っている人が多く, install 方法もネットにたくさん転がっているのでそっちにしようと思ったのですが, windows に導入するのに手こずったのでjekyllにしました. mac は homebrew 一発で導入できるらしいので mac ユーザーはそちらのほうがおすすめかもしれないです.

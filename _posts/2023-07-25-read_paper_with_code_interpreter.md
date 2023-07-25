---
title: "Code Interpreterを用いて論文を読みたい"
author: Hayato Tsumura
date: 2023-07-25 18:25:50 +09:00
categories: Tech_blog
tags: [Code Interpreter, ChatGPT]
math: true
mermaid: true
---

## きっかけ

論文読みの際に, 最近はChatGPTが便利です. 概要だけ知りたいときに Web Prompt というプラグインを用いてURLをChatGPTに投げると簡単に要約してくれたり[^1], 精読のときに対話形式で読み進めることが可能です.

これをローカルファイルのPDFから直接読み取ってくれると便利なのですが[^2], そういう機能は現在は存在しないようです. なので Code Interpreter に pdf ファイルを直接投げてみたらいいのではと思って実験してみました.

## 実験

### 超有名論文を読む

まずは超有名な論文を読んでみます. 今回は [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) を読んでみます. ネット上にも論文の内容を説明した記事が多数存在するので, ChatGPTがそれを学習している可能性もあります.

<iframe src="https://chat.openai.com/share/997bf1ef-43b7-4617-879d-aefc85ff308e" width="600" height="600"></iframe>

[https://chat.openai.com/share/997bf1ef-43b7-4617-879d-aefc85ff308e](https://chat.openai.com/share/997bf1ef-43b7-4617-879d-aefc85ff308e)

結構驚いたのがpdfから数式もきちんと読み取ってくれることです. 文章も一文ずつ読み取ってくれます. ただ, ResNetの実装に関しては明らかに論文外の知識によって説明しているようです. それと, 色んな論文でこの手法を試してみたのですが, 一文ずつ読み取ってくれるかどうかは機嫌次第な気もします.

**機嫌が良くない例**

<iframe src="https://chat.openai.com/share/f4c1e0f1-7930-4d4a-8266-56454f581c90" width="600" height="600"></iframe>

[https://chat.openai.com/share/f4c1e0f1-7930-4d4a-8266-56454f581c90](https://chat.openai.com/share/f4c1e0f1-7930-4d4a-8266-56454f581c90)

最初の処理を比較すると, 後者は `pdf_text = "\n".join(text_content)` という処理が挟まっていて, そこに違いがありそうです. PyPDF2を使ってpdfを読み取っている工程を手元で行って, そのtxtファイルをCode Interpreterに投げれば改善するかもしれません.

### 専門的な分野の論文を読む

有名な論文だと, その論文に関する記事が多数存在するのでそれを学習している可能性があります. そこで次はやや専門的な分野の論文を読んでみます. 今回は [Interpretable bilinear attention network with domain adaptation improves drug-target prediction](https://arxiv.org/abs/2208.02194) を読んでみます.

<iframe src="https://chat.openai.com/share/9c6f86e2-d194-4b72-a04b-4ba67f536fe7" width="600" height="600"></iframe>

[https://chat.openai.com/share/9c6f86e2-d194-4b72-a04b-4ba67f536fe7](https://chat.openai.com/share/9c6f86e2-d194-4b72-a04b-4ba67f536fe7)

最後の要求は結構無茶を言ってしまったので仕方ないですが, 結構きちんと読めていると思います.

### レイアウトが異なる場合

先程の論文はarxivのレイアウトに則っており, フォーマットが結構淡白な感じなので読み取りやすかったのかもしれないです. 論文誌によってレイアウトは異なり, 中には結構ごちゃごちゃしたものもあります. この論文はnature machine intelligenceに掲載されている[https://doi.org/10.1038/s42256-022-00605-1](https://doi.org/10.1038/s42256-022-00605-1)ので, その pdf を Code Interpreter に入力した際に同様の回答を返してくれるか実験してみます.

<iframe src="https://chat.openai.com/share/e76ea9be-f862-49ea-8713-eb3eaa49c3ef" width="600" height="600"></iframe>

[https://chat.openai.com/share/e76ea9be-f862-49ea-8713-eb3eaa49c3ef](https://chat.openai.com/share/e76ea9be-f862-49ea-8713-eb3eaa49c3ef)

最初の処理が異なるために, 各応答も異なっている印象です. 安定した動作のために手元で前処理を済ませるのが無難かもしれないです.

## 前処理

ということで何度か試してみて上手いこと前処理が行えているなと思ったやつを参考にして, argparseモジュールを使ってコマンドラインからpdfファイルを指定してテキストへの変換を実行できるようにしてみました[^3].

```python
import PyPDF2
import argparse

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, "rb") as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        original_text = ""
        for page_num in range(len(pdf_reader.pages)):
            original_text += pdf_reader.pages[page_num].extract_text()
    text = original_text.replace("\n", "")

    return text

def main():
    parser = argparse.ArgumentParser(description="Extract text from PDF files.")
    parser.add_argument("pdf_path", type=str, help="Path of the PDF file to be extracted")
    args = parser.parse_args()

    extracted_text = extract_text_from_pdf(args.pdf_path)
    output_filename = args.pdf_path.rsplit('.', 1)[0] + ".txt"
    with open(output_filename, "w", encoding="utf-8") as txt_file:
        txt_file.write(extracted_text)
    
    print(f"Text saved in '{output_filename}'")

if __name__ == "__main__":
    main()
```

実行する際はコマンドラインで,

```bash
python pdf_to_txt.py example.pdf
```

と打ち込むことで, example.pdf というファイルを example.txt というファイルに変換してくれます. これをCode Interpreterに投げるといい感じになると思います(要検証).

## 結言

感想としては思ったよりもきちんと読んでくれるなってことです. うまく読んでくれた場合のChatの一番最初の処理を参考にして, 手元で自動で処理するコードを書いておいてtxtファイルを投げるというのが一番楽だと思います.

Web Promptに対するこの読み方の明確な弱点は, Code Interpreterはファイルを読み込んでから一定時間が経過するとファイルが削除されてしまうことです. これが結構不便で, Web Promptなら一日おいてまた質問しても答えてくれますが, Code Interpreterは数十分経てばファイルが失効されてるなんてことはザラにあるので, その都度アップロードが必要になります. ChatGPTやCode Interpreterをローカルに対応させるにはAPIを叩けばいいのかもしれないので, そのうち試してみたいです[^4].

**footnote**

[^1]: Abstract を読めばいいという意見は正しい.

[^2]: Web Prompt を用いる方法ではオープンアクセスの論文しか読めない. 購読している論文誌の論文を読みたい場合に, その論文のpdfをダウンロードしてCode Interpreterに投げると同様の方法で論文読みを進めることができて便利そうだと思った. しかし, あまりお行儀は良くないので, 可能なら手元の環境で完結させたい. この記事はそれができるまでの下準備として書いた.

[^3]: レポジトリを作った. [https://github.com/Tsuuuuuuun/pdf_to_txt](https://github.com/Tsuuuuuuun/pdf_to_txt)

[^4]: 多分非公式だけど, [https://github.com/shroominic/codeinterpreter-api](https://github.com/shroominic/codeinterpreter-api) を使えばいけそうな気がする.

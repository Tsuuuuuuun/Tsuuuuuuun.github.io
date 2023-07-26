---
title: "pdfを自動でtxtに変換する"
author: Hayato Tsumura
date: 2023-07-26 08:35:49 +09:00
categories: Tech_blog
tags: [Python]
math: true
mermaid: true
---

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://tsuuuuuuun.github.io/posts/read_paper_with_code_interpreter/" data-iframely-url="//iframely.net/DeC6ZLp"></a></div></div><script async src="//iframely.net/embed.js"></script>

この記事を受けて, pdfをtxtに変換したいと思ったのでPythonで作りました.

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%; padding-top: 120px;"><a href="https://github.com/Tsuuuuuuun/pdf_to_txt" data-iframely-url="//iframely.net/q2DDQc4"></a></div></div><script async src="//iframely.net/embed.js"></script>

## つくったもの

前回の記事の段階で

```python
import PyPDF2
import argparse
import os

def extract_text_from_pdf(pdf_path):
    pdf_path = 'pdf/' + pdf_path
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
    os.chdir('txt')
    with open(output_filename, "w", encoding="utf-8") as txt_file:
        txt_file.write(extracted_text)
    os.chdir('..')
    print(f"Text saved in '{output_filename}'")

if __name__ == "__main__":
    main()
```

というコードを書いていたのですが, 変換元のdirectoryにファイルを置いて, コマンドラインで手動で変換するというのが面倒だったので, ファイルをディレクトリに入れた瞬間に変換できるよう自動化しました[^1].

まずは先程のコードからargparseを除いたファイルを用意します.

```python
import PyPDF2
import os

def main():
    def extract_text_from_pdf(pdf_path):
        with open(pdf_path, "rb") as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            original_text = ""
            for page_num in range(len(pdf_reader.pages)):
                original_text += pdf_reader.pages[page_num].extract_text()
        text = original_text.replace("\n", "")
        return text

    for filename in os.listdir('pdf'):
        os.chdir('pdf')
        if ' ' in filename:
            os.rename(filename, filename.replace(' ', '_'))
            filename = filename.replace(' ', '_')
            print('change filename... padding done!')
        
        extracted_text = extract_text_from_pdf(filename)
        output_filename = filename.rsplit('.', 1)[0] + ".txt"
        os.chdir('../txt')

        if not os.path.exists(output_filename):
            with open(output_filename, "w", encoding="utf-8") as txt_file:
                txt_file.write(extracted_text)
            print(f"Text saved in '{output_filename}'")
        os.chdir('..')

if __name__ == "__main__":
    main()
```

そして, 自動化のためのコードを書きます. 今回はwatchdogを使用しました.

```python
import sys
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import PyPDF2
import os

class Watcher:
    
    DIRECTORY_TO_WATCH = "./pdf"

    def __init__(self):
        self.observer = Observer()

    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.DIRECTORY_TO_WATCH, recursive=True)
        self.observer.start()
        try:
            while True:
                time.sleep(5)
        except:
            self.observer.stop()
            print("Observer stopped")
        self.observer.join()

class Handler(FileSystemEventHandler):

    @staticmethod
    def on_any_event(event):
        if event.is_directory:
            return None

        elif event.event_type == 'created':
            print(f"New file {event.src_path} has been created!")
            exec(open("pdf_to_txt.py").read())

if __name__ == '__main__':
    w = Watcher()
    w.run()
```

これを実行するときに, 変換を実行するファイルで用いるモジュールはwatchdogを用いるファイルにてimportしないと動かない点に注意です.

**footnote**

[^1]: それはそれとして, 手動でパスを指定してコマンドラインで実行する方法にも便利な点はあるので残しておく.

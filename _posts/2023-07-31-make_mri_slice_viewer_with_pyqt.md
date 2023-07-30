---
title: "PyQtを使ったMRIのスライスビューアのGUI作成"
author: Hayato Tsumura
date: 2023-07-31 06:40:34 +09:00
categories: Tech_blog
tags: [Python, PyQt, MRI, GUI]
math: true
mermaid: true
---

## きっかけ

大学院の期末課題が, 講義を通じて興味を持った理論, モデル, 考えかたについて独自に調査してねっていうもので, **画像や表, プログラムを動かした結果等を含めるとなお良い** とあったので, せっかくだし何か作りたいなあと思いました.

講義のテーマは情報学と医用工学の融合で, MRIとかも話題にはなります. 学部まで私は神経科学の研究室に在籍しており, 実験によって得られたMRI画像をANTsなどのソフトをつかって解析などを行っていました. これって自作できるのでは? となんとなく思ったので, `.gii` ファイルの二次元viewerだけ作りました.

## 作ったもの

<div class="iframely-embed"><div class="iframely-responsive" style="padding-bottom: 50%; padding-top: 120px;"><a href="https://github.com/Tsuuuuuuun/MRI_slice_viewer" data-iframely-url="//iframely.net/iB8e33u"></a></div></div><script async src="//iframely.net/embed.js"></script>

ここにまとめていますが軽く紹介.

最初はgoogle colabでウィジェットを使ってスライドを作ってみたのですが, 自分の環境では正常に作動しなかった[^1] ので, ある程度環境に縛られないものがいいなあと思ってたどり着いたのがGUIアプリケーションです. PythonのGUIアプリケーションだとPyQtやTkinter, wxPythonとかがありますが, ChatGPT先生に「PythonのGUIアプリケーションで代表的なものを教えて」って聞いたら一番最初にPyQtが出力されたのでPyQtにしました.

GPT先生曰く,

### PyQt

- **概要**: `PyQt`は、`Qt`ライブラリをPythonで利用するためのバインディングです。`Qt`は、クロスプラットフォームのC++ GUIツールキットです。
- **特徴**:
  - 豊富なウィジェットセットと高度なグラフィックス機能。
  - シグナルとスロットという、イベント駆動プログラミングをサポートする強力なメカニズム。
  - `Qt Designer`というGUIデザインツールが付属しており、ドラッグアンドドロップでインターフェイスをデザインできる。
  - 商用ライセンスとGPL (オープンソース) の両方のライセンスがあります。

### Tkinter

- **概要**: `Tkinter`は、Pythonの標準ライブラリに含まれるGUIツールキットです。`Tk GUI`ツールキットのPythonラッパーです。
- **特徴**:
  - 軽量でシンプルなGUI作成に適しています。
  - クロスプラットフォームで、主要なオペレーティングシステムで動作します。
  - ネイティブな外見を持つウィジェットが提供されます。
  - 何も追加でインストールせずに使用できるのが大きな利点です。

### wxPython

- **概要**: `wxPython`は、`wxWidgets` C++ライブラリをPythonで使用するためのバインディングです。クロスプラットフォームのアプリケーションを作成するためのGUIツールキットです。
- **特徴**:
  - さまざまなプラットフォームでネイティブな外見と動作を持つアプリケーションを作成できます。
  - 豊富なウィジェットセットと高度な機能を提供します。
  - `wxGlade`や`wxFormBuilder`などのデザインツールが存在します。
  - ライセンスはLGPL風のライセンスです。

らしいです. PyQt以外はエアプなので知らないですが, 自分が今回作った最低限の機能のものならどれでも作れそうな気はします.

![img/2023-07-31-make_mri_slice_viewer_with_pyqt/image.png](/img/2023-07-31-make_mri_slice_viewer_with_pyqt/image.png)

![img/2023-07-31-make_mri_slice_viewer_with_pyqt/image-1.png](/img/2023-07-31-make_mri_slice_viewer_with_pyqt/image-1.png)

![img/2023-07-31-make_mri_slice_viewer_with_pyqt/image-2.png](/img/2023-07-31-make_mri_slice_viewer_with_pyqt/image-2.png)

こんな感じで, ダイアログでファイルを選択し, 脳スライス画像を表示します. X,Y,Zのスライダーをそれぞれ動かすことでスライスの位置を変更することができます.

## 作った感想

GUIを作るのは初めてだったので結構楽しかったです. 見たことあるフリーソフトみたいなのができたときはちょっと感動しました. ただ, 今回作ったものはあくまで自分が使うためのものなので, 他の人が使うときにはいろいろと不便なところがあると思います. 例えば, 画像の拡大縮小ができないとか, ROI(Region of Interest)選択ができないとか, カラーバーがないとか. 

まあ, 本業の研究の内容にはあまり関係ないことなので暇つぶし程度に触っていきたいと思います.

**footnote**

[^1]: というか colab くらいでしか使えないらしい?

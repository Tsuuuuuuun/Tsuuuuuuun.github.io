---
title: "Rを用いてCELファイルから発現量を取得する"
author: Hayato Tsumura
date: 2024-03-15 19:37:48 +09:00
categories: 
tags: 
math: true
mermaid: true
image:
    path:
    lqip: 
    alt:
---

たったこれだけなんだけど、詰まってしまったのでメモする。

R を用いてマイクロアレイデータを解析したい場合、[(Rで)マイクロアレイデータ解析](https://www.iu.a.u-tokyo.ac.jp/~kadota/r.html) はかなり参考になる。しかし、このページは定期的に更新こそしているがまあまあ古いので、そのままでは動かない部分がある。今回は、CELファイルから発現量を取得する部分についてメモする。

## 1. ライブラリのインストール

まず、必要なライブラリをインストールする。

```R
if (!require("BiocManager", quietly = TRUE))
    install.packages("BiocManager")
BiocManager::install("affy")
BiocManager::install("AnnotationDbi")
BiocManager::install("hgu133a.db")
BiocManager::install("biomaRt")
```

## 2. 実行

```R
library(affy)
library(AnnotationDbi)
library(hgu133plus2.db)

# コマンドライン引数からCELファイルのパスを取得
args <- commandArgs(trailingOnly = TRUE)
cel_file <- normalizePath(args[1])

# CELファイルを読み込み、RMA正規化を行う
process_cel_file <- function(cel_file) {
  cel_data <- ReadAffy(filenames = cel_file)
  eset <- rma(cel_data)
  expression_data <- exprs(eset)
  gene_names <- featureNames(eset)
  expression_df <- data.frame(Gene = gene_names, Expression = expression_data[, 1])
  return(expression_df)
}

# プローブセットIDをGene Symbolに変換する関数
convert_to_symbol <- function(probe_ids) {
  mapped_symbols <- mapIds(hgu133plus2.db, keys = probe_ids, column = "SYMBOL", keytype = "PROBEID")
  mapped_symbols[is.na(mapped_symbols)] <- NA
  return(mapped_symbols)
}

# CELファイルを処理し、Gene Symbolを追加
expression_df <- process_cel_file(cel_file)
expression_df$GeneSymbol <- convert_to_symbol(expression_df$Gene)

# Gene SymbolがNAの行を削除
expression_df <- expression_df[!is.na(expression_df$GeneSymbol), ]

# 結果を表示して保存
head(expression_df)
write.csv(expression_df, file = paste0(tools::file_path_sans_ext(cel_file), "_expression.csv"), row.names = FALSE)
```

Gene Symbol を取得することで、Annotation 間の変換が可能になる。

このファイルを `cel_to_expr.R` として保存し、以下のように実行する。

```bash
Rscript cel_to_expr.R path/to/cel_file
```

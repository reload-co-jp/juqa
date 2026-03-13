# plant 追加手順

## 1. 科（family）を確認する

`lib/data/family.ts` を開き、追加する植物の科が存在するか確認する。

- 存在する → その `id` を `family_id` に使う
- 存在しない → `family.ts` に科を追加してから plant を追加する

**現在登録済みの科（id: 1〜38）**

| id | 科名 | id | 科名 |
|---|---|---|---|
| 1 | バラ科 | 20 | ドクダミ科 |
| 2 | ムクロジ科 | 21 | イネ科 |
| 3 | クスノキ科 | 22 | ユリ科 |
| 4 | ニレ科 | 23 | オオバコ科 |
| 5 | イチョウ科 | 24 | ミズキ科 |
| 6 | ブナ科 | 25 | キンポウゲ科 |
| 7 | ヒノキ科 | 26 | シュロソウ科 |
| 8 | マツ科 | 27 | キジカクシ科 |
| 9 | キク科 | 28 | カツラ科 |
| 10 | マメ科 | 29 | スズカケノキ科 |
| 11 | スミレ科 | 30 | ヤナギ科 |
| 12 | ツユクサ科 | 31 | モッコク科 |
| 13 | モクレン科 | 32 | モクセイ科 |
| 14 | ツバキ科 | 33 | レンプクソウ科 |
| 15 | アジサイ科 | 34 | アブラナ科 |
| 16 | シソ科 | 35 | セリ科 |
| 17 | イチイ科 | 36 | ナデシコ科 |
| 18 | ケシ科 | 37 | アヤメ科 |
| 19 | リンドウ科 | 38 | ヒガンバナ科 |

---

## 2. 画像 URL を取得する（Wikimedia Commons）

画像はすべて **Wikimedia Commons の `Special:FilePath/` 形式** を使う。

```
https://commons.wikimedia.org/wiki/Special:FilePath/<ファイル名>
```

この形式はファイルへのリダイレクトであり、直接の画像 URL（`upload.wikimedia.org/...`）より安定している。

### 手順

1. [Wikimedia Commons](https://commons.wikimedia.org/) で学名を検索する
2. 使いたいファイルの「ファイル名」を確認する（例: `Cornus_canadensis.jpg`）
3. URL を組み立てる

   ```
   https://commons.wikimedia.org/wiki/Special:FilePath/Cornus_canadensis.jpg
   ```

4. ブラウザでアクセスして画像が表示されることを確認する

### ファイル名に特殊文字がある場合

スペースはアンダースコア `_` に置き換える。それ以外の特殊文字（括弧・スラッシュなど）は URL エンコードする。

```
# スペース → アンダースコア
Erigeron philadelphicus UMFS 1.jpg
→ Erigeron_philadelphicus_UMFS_1.jpg

# 括弧はエンコード
Erigeron philadelphicus (flower).jpg
→ Erigeron_philadelphicus_(flower).jpg   ← 括弧はそのままでも動く
```

ブラウザで実際に開いて確認することが最も確実。

### `image_url` と `images[].url` の関係

- `image_url` — 代表画像（一覧・OGP 用）。`images` 配列の先頭と同じ URL にする
- `images` — 複数枚登録可能。最低1枚（全体像）は必須

---

## 3. タグを選ぶ

`types.d.ts` の `PlantTag` 型に定義されている値のみ使用可能。型にない文字列を指定するとビルドエラーになる。

| カテゴリ | 選択肢 |
|---|---|
| 開花季節 | `春開花` `夏開花` `秋開花` `冬開花` |
| 葉の状態 | `常緑` `落葉` |
| 葉の形状 | `針葉` `手のひら葉` `ギザギザ` `厚い葉` `光沢` |
| 花の形状 | `花弁5枚` `小花集合` `ラッパ型` |
| 実 | `どんぐり` `豆` `松ぼっくり` |
| 樹形 | `高木` `低木` `草本` |
| 生育環境 | `街路樹` `山` `公園` `雑草` |

---

## 4. `similar_plant_ids` を設定する

- 参照する id がすべて `lib/data/plant.ts` に存在することを確認する
- 似た植物がなければ `[]` にする
- 相互参照する場合（A が B を参照するなら B も A を参照する）は両方更新する

---

## 5. `lib/data/plant.ts` に追記する

`id` は現在の最大値 + 1 を使う（現在の最大: **100**）。

```ts
{
  id: 101,
  japanese_name: "〇〇〇",
  scientific_name: "Genus species",
  family_id: 1,          // ← family.ts の id と一致させる
  genus: "〇〇属",
  description: [
    "段落1",
    "段落2",
    "段落3",
  ],
  identification: [
    "識別ポイント1",
    "識別ポイント2",
    "識別ポイント3",
    "識別ポイント4",
  ],
  distribution: "分布域",
  image_url:
    "https://commons.wikimedia.org/wiki/Special:FilePath/<ファイル名>",
  images: [
    {
      url: "https://commons.wikimedia.org/wiki/Special:FilePath/<ファイル名>",
      caption: "全体",
    },
  ],
  tags: ["春開花", "落葉", "高木"],   // ← PlantTag 型の値のみ
  similar_plant_ids: [],
},
```

---

## 6. 追加後の確認

```bash
pnpm typecheck   # 型エラーがないか確認
pnpm dev         # ブラウザで植物詳細ページ（/plants/<id>）の画像表示を確認
```

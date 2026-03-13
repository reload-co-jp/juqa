# add-plant

`lib/data/plant.ts` に新しい植物を追加する。必要に応じて `lib/data/family.ts` に科も追加する。

## 手順

1. **現状確認**
   - `lib/data/plant.ts` の末尾を確認して最大の id を取得する
   - `lib/data/family.ts` を確認して対象植物の科が存在するか調べる

2. **科が存在しない場合**
   - `lib/data/family.ts` に新しい科を追加する（id は現在の最大値 + 1）
   - `classification` は `"裸子植物"` または `"被子植物"` のいずれか

3. **植物を追加**
   - `lib/data/plant.ts` の末尾（`]` の直前）に追加する
   - id は現在の最大値 + 1
   - 類似植物（`similar_plant_ids`）がある場合は相互リンクも更新する

4. **型チェック**
   - `pnpm typecheck` を実行して確認する

## Plant フィールド一覧

```typescript
{
  id: number,
  japanese_name: string,
  scientific_name: string,        // 学名（イタリック表記の正式名）
  family_id: number,
  genus: string,                  // 例: "サクラ属"
  description: string[],          // 3文程度の説明
  identification: string[],       // 見分けポイント 4項目程度
  distribution: string,           // 分布域
  image_url: string,              // Wikimedia Commons の FilePath URL
  images: { url: string; caption: string }[],  // 2枚程度
  tags: PlantTag[],
  similar_plant_ids: number[],
}
```

## 使用できる PlantTag

`"春開花"` `"夏開花"` `"秋開花"` `"冬開花"` `"常緑"` `"落葉"` `"針葉"` `"手のひら葉"` `"ギザギザ"` `"厚い葉"` `"光沢"` `"花弁5枚"` `"小花集合"` `"ラッパ型"` `"どんぐり"` `"豆"` `"松ぼっくり"` `"高木"` `"低木"` `"草本"` `"街路樹"` `"山"` `"公園"` `"雑草"`

## 注意

- 画像 URL は Wikimedia Commons の `Special:FilePath/ファイル名` 形式を使う（存在確認はしない）
- `$ARGUMENTS` に植物名が渡される場合はその植物を追加する

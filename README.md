# JuQa

街路樹や山で見かける植物を体系的に覚えるための学習アプリ。

## 機能

### 植物一覧 `/plants`

- 100種の植物データを閲覧
- 和名・学名でのテキスト検索
- 科・タグ（季節・葉・花・実・樹形・環境）でのフィルタリング
- 各植物の写真ギャラリー、説明、見分け方、分布、似た植物を表示

### 科一覧 `/families`

- 38科の分類データを閲覧
- 科の特徴・説明・所属植物を確認

### 見分け方ガイド `/guide`

- Yes/No 形式の分岐で植物の科を絞り込む対話型ガイド
- 11問の質問ツリー

### クイズ `/quiz`

3種類のクイズで知識を定着

1. **写真クイズ** — 植物の写真から名前を当てる
2. **特徴クイズ** — 特徴の説明から科や植物を当てる
3. **見分け方クイズ** — 見分け方のヒントから植物を当てる

## 技術スタック

- **Next.js** (App Router、静的エクスポート)
- **TypeScript**
- **pnpm**

データは `lib/data/` 以下に TypeScript ファイルとして管理。外部 API・データベース不使用。

## 開発

```bash
pnpm install
pnpm dev       # 開発サーバー起動
pnpm build     # 静的ビルド（out/ に出力）
pnpm lint
pnpm format
pnpm typecheck
```

## デプロイ

GitHub Pages にホスティング。`main` ブランチへのプッシュで GitHub Actions が自動デプロイ。

## Android アプリ（TWA）公開手順

Trusted Web Activity (TWA) として Play Store に公開する。

### 事前準備

#### 1. keystore を生成（初回のみ）

```bash
keytool -genkey -v -keystore android.keystore \
  -alias android -keyalg RSA -keysize 2048 -validity 10000
```

base64 エンコードして GitHub Secrets に登録：

```bash
base64 -i android.keystore | pbcopy
```

#### 2. GitHub Secrets に登録

リポジトリの **Settings → Secrets and variables → Actions** に以下を追加：

| Secret 名 | 内容 |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | keystore を base64 エンコードした文字列 |
| `ANDROID_KEYSTORE_PASSWORD` | keystore のパスワード |
| `ANDROID_KEY_PASSWORD` | キーのパスワード |

#### 3. assetlinks.json を設定

keystore の SHA256 フィンガープリントを確認：

```bash
keytool -list -v -keystore android.keystore -alias android | grep SHA256
```

`public/.well-known/assetlinks.json` の `sha256_cert_fingerprints` と `package_name` を実際の値に更新する。

> **注意**: `assetlinks.json` はドメインルート (`https://reload-co-jp.github.io/.well-known/assetlinks.json`) に配置する必要がある。`reload-co-jp.github.io` リポジトリに置くこと。

### APK ビルド

タグをプッシュすると GitHub Actions が自動でビルドし、Artifacts に APK と AAB をアップロードする：

```bash
git tag v1.0.0
git push origin v1.0.0
```

Actions の **Build Android APK** ワークフローから `app-release-bundle.aab` をダウンロードする。

### Play Store への公開

1. [Google Play Console](https://play.google.com/console) でアプリを作成（登録料 $25、初回のみ）
2. **リリース → 本番 → 新しいリリースを作成** で AAB をアップロード
3. ストア掲載情報を入力
   - アプリの説明
   - スクリーンショット（電話: 2枚以上）
   - フィーチャーグラフィック（1024×500px）
   - アイコン（512×512px）
   - カテゴリー
4. **ポリシー → アプリのコンテンツ** でコンテンツレーティングを設定
5. 審査を経て公開（数日かかる場合あり）

> **TWA の動作確認**: `assetlinks.json` が正しく設定されていないとアプリ起動時にブラウザのアドレスバーが表示される。公開前に [Digital Asset Links テストツール](https://developers.google.com/digital-asset-links/tools/generator) で確認すること。

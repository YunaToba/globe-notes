# globe-notes プロジェクト概要

3D地球儀のUI上で、世界各国を旅行した記録・行きたい場所のメモを管理する個人開発アプリ。
開発者はプログラミング初心者で、学習を兼ねて1機能ずつ丁寧に進めている。

## 技術スタック
- フロントエンド: React + Vite
- 地球儀表示: react-globe.gl
- 認証・DB: Firebase（Authentication＝Googleログイン、Firestore＝データ保存）
- 場所検索: Google Places API (New)
  - `AutocompleteSuggestion` を直接使用し、legacy な `AutocompleteService` に依存するライブラリは使用しない
- デプロイ: Vercel
- バージョン管理: Git / GitHub

## ディレクトリ構成
- `src/App.jsx` … 認証・Firestore同期・画面の出し分けを担うメインコンポーネント
- `src/SearchBox.jsx` … 場所検索
- `src/PinForm.jsx` … 新規ピン作成フォーム
- `src/PinDetail.jsx` … ピンの詳細・編集画面（訪問前/訪問後の情報を2カラムで編集）
- `src/constants.js` … カテゴリ一覧などの共通定数
- `src/firebase.js` … Firebase初期化設定

## データモデル（Firestore: `pins` コレクション）
| フィールド | 内容 |
|---|---|
| uid | 所有者のユーザーID |
| lat / lng | 緯度・経度 |
| address | 検索で取得した住所 |
| title | 場所のタイトル |
| category | 大カテゴリ（`constants.js` の `CATEGORIES` から1つ） |
| tags | 自由入力タグの配列 |
| memo | 探索メモ（訪問前、500文字以内） |
| visited | 訪問済みかどうか（真偽値） |
| visitDate | 訪問日 |
| review | 感想メモ（訪問後、500文字以内） |
| createdAt | 作成日時 |

## 設計規約
- スタイルはインラインの `style` 属性で記述（CSSファイルは未使用。`index.css` は全画面表示のための余白リセットのみ）
- 1ファイル1コンポーネント。複数ファイルで使う値（カテゴリ一覧など）は `constants.js` に切り出す

## 作業ルール
- 変更前に関連ファイルと既存実装を確認する
- タスクと無関係なファイルは変更しない
- 大きな設計変更、破壊的操作、外部環境への変更は実行前に確認する
- 変更内容と理由を、プログラミング初心者にも分かる言葉で説明する
- `.env` の値をコードやGitに書き込まない

## 検証
- コード変更後は原則 `npm run lint` と `npm run build` を実行する
- UI変更時は `npm run dev` で対象機能の動作を確認する
- 既存のログイン、検索、ピン表示・編集を壊していないことを確認する

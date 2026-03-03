# GitHub Pages 設定ガイド

このドキュメントでは、このリポジトリでGitHub Pagesを有効化し、静的Webサイトを公開する方法を説明します。

## 📚 目次

1. [前提条件](#前提条件)
2. [リポジトリの準備](#リポジトリの準備)
3. [GitHub Pagesの有効化](#github-pagesの有効化)
4. [カスタムドメインの設定（オプション）](#カスタムドメインの設定オプション)
5. [トラブルシューティング](#トラブルシューティング)

## 前提条件

- GitHubアカウント
- リポジトリへのアクセス権限（push権限）

## リポジトリの準備

### 1. リポジトリ名の確認

GitHub Pagesを使用する場合、リポジトリ名は以下の形式にする必要があります：

- **ユーザーサイト**: `username.github.io`
- **プロジェクトサイト**: 任意の名前（例：`my-project`）

### 2. index.htmlの配置

GitHub Pagesではルートディレクトリの`index.html`が表示されます。

```
your-repo/
├── index.html        ← GitHub Pagesがここを参照
├── README.md
└── ...
```

または、`docs/`フォルダを使用する場合：

```
your-repo/
├── docs/
│   └── index.html    ← GitHub Pagesがここを参照
├── README.md
└── ...
```

### 3. ファイルをコミット・プッシュ

```bash
git add .
git commit -m "Add GitHub Pages configuration"
git push origin main
```

## GitHub Pagesの有効化

### 手順

1. **リポジトリのSettings に移動**
   - GitHubのリポジトリページでSettingsタブをクリック

2. **Pages セクションを開く**
   - 左メニューから「Pages」を選択

3. **ソースを選択**
   - **Build and deployment** セクションで以下を設定：
     - Branch: `main` (またはあなたのデフォルトブランチ)
     - Folder: `/root` (ルートディレクトリ) または `/docs` (docs フォルダを使用する場合)

4. **Save をクリック**
   - GitHub Actionsでビルドが開始されます

5. **デプロイ完了を待つ**
   - 数分後、以下のURLでサイトにアクセス可能：
   - `https://username.github.io/my-project` （プロジェクトサイト）
   - `https://username.github.io` （ユーザーサイト）

#### Settings画面でのスクリーンショット参考値

```
Source
├── Deploy from a branch (選択)
├── Branch: main / root ✓

または

├── GitHub Actions (ビルドを自動化)
```

## カスタムドメインの設定（オプション）

独自ドメイン（例：`mysite.com`）を使用したい場合：

### 1. ドメイン設定

1. GitHub の **Settings → Pages** で `Custom domain` に `mysite.com` を入力
2. 保存後、リポジトリに `CNAME` ファイルが作成されることを確認  
   （手動管理する場合は、リポジトリルートに `CNAME` を置いて中身を `mysite.com` にする）

### 2. DNSレコードの設定

ドメインレジストラーの管理画面で以下を設定：

**A レコード**:
```
@ 185.199.108.153
@ 185.199.109.153
@ 185.199.110.153
@ 185.199.111.153
```

**AAAA レコード**:
```
@ 2606:50c0:8000::153
@ 2606:50c0:8001::153
@ 2606:50c0:8002::153
@ 2606:50c0:8003::153
```

**CNAME レコード**（サブドメインの場合）:
```
www username.github.io
```

### 3. GitHub Settingsに入力

Settingsの**Pages**セクションで：
- Custom domain: `mysite.com` と入力
- DNS/証明書の準備が完了したら "Enforce HTTPS" にチェック

## トラブルシューティング

### 問題: サイトが表示されない

**原因と対策:**

1. **ファイルがプッシュされていない**
   ```bash
   git status
   git push origin main
   ```

2. **index.htmlが見つからない**
   - ルートディレクトリまたは`docs/`フォルダに`index.html`があるか確認

3. **ブランチ設定が間違っている**
   - Settings → Pages で正しいブランチを選択しているか確認

4. **キャッシュの問題**
   - ブラウザのキャッシュをクリア（Ctrl+Shift+Delete）
   - シークレットウィンドウで開く

### 問題: HTTPS エラーが表示される

- "Enforce HTTPS" の有効化後、反映まで時間がかかることがあります
- SSL証明書の発行とDNS反映には、状況によって最大24時間程度かかる場合があります

### 問題: ビルドが失敗する

- GitHub ActionsのログをSettingsの**Pages**で確認
- `_config.yml` の文法エラーをチェック

## よくある質問（FAQ）

### Q: プライベートリポジトリでもGitHub Pagesは使える？

A: 利用可能ですが、プラン条件があります。公開リポジトリはGitHub Freeで利用でき、プライベートリポジトリは通常GitHub Pro/Team/Enterpriseが必要です（最新条件は公式ドキュメントを確認してください）。

### Q: CSSやJavaScriptも使える？

A: はい、`index.html`から参照すれば、通常のWebサイトと同じことができます。

### Q: 環境変数やサーバーサイド処理は？

A: GitHub Pagesは静的サイトのみです。サーバーサイド処理が必要な場合はHerokuなど別のプラットフォームを検討してください。

### Q: Jekyll以外のビルドツールは使える？

A: GitHub Actionsを使用することで、Hugo、Next.js など他のツールでもビルド可能です。

## 参考リンク

- [GitHub Pages 公式ドキュメント](https://docs.github.com/ja/pages)
- [GitHub Pages + Jekyll](https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll)
- [GitHub Actions での自動デプロイ](https://docs.github.com/ja/actions)

---

**最終更新**: 2026年3月3日

type LinkItem = {
    href: string;
    label: string;
};

const links: LinkItem[] = [
    { href: "https://docs.github.com/ja/pages", label: "GitHub Pagesドキュメント" },
    { href: "README.md", label: "README.md - セットアップガイド" },
    { href: "GITHUB_PAGES_SETUP.md", label: "GITHUB_PAGES_SETUP.md - 詳細設定手順" },
    { href: "ts-test.html", label: "TypeScript テストページ（ビルドなし）" },
    { href: "react-test.html", label: "React テストページ（ビルドなし）" }
];

const app = document.getElementById("app");

if (app) {
    app.innerHTML = `
        <h1>GitHub Pages ビルドありテストページ</h1>
        <p>このページは <code>index.js</code>（ビルド済みファイル）を読み込んで表示しています。</p>
        <div class="note">
            TypeScript / React は通常ビルドが必要です。下記リンクで「ビルドなし」テストも確認できます。
        </div>
        <h2>リンク</h2>
        <ul>
            ${links.map((link) => `<li><a href="${link.href}" target="${link.href.startsWith("http") ? "_blank" : "_self"}">${link.label}</a></li>`).join("")}
        </ul>
        <hr>
        <p>Source: <code>index.ts</code> / Built: <code>index.js</code></p>
    `;
}

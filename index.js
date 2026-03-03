const links = [
    { href: "https://docs.github.com/ja/pages", label: "GitHub Pagesドキュメント" },
    { href: "README.md", label: "README.md - セットアップガイド" },
    { href: "GITHUB_PAGES_SETUP.md", label: "GITHUB_PAGES_SETUP.md - 詳細設定手順" },
    { href: "ts-test.html", label: "TypeScript テストページ（ビルドあり）" },
    { href: "react-test.html", label: "React テストページ（ビルドあり）" }
];

const app = document.getElementById("app");

if (app) {
    app.innerHTML = `
        <h1>GitHub Pages ビルドありテストページ</h1>
        <p>このページは <code>index.js</code>（Vanilla JavaScript）を読み込んで表示しています。</p>
        <div class="note">
            index は Vanilla JS、ts-test と react-test は GitHub Actions でビルドして配信します。
        </div>
        <h2>リンク</h2>
        <ul>
            ${links.map((link) => `<li><a href="${link.href}" target="${link.href.startsWith("http") ? "_blank" : "_self"}">${link.label}</a></li>`).join("")}
        </ul>
        <hr>
        <p>Source: <code>index.js</code>（Vanilla JavaScript）</p>
    `;
}

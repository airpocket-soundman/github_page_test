const links = [
    {
        href: "ts-test.html",
        label: "TypeScript デモ",
        description: "型定義・ユニオン型・ジェネリクスで UI を構成"
    },
    {
        href: "react-test.html",
        label: "React デモ",
        description: "useState / useMemo でインタラクションを構築"
    },
    {
        href: "README.md",
        label: "README",
        description: "このリポジトリのセットアップメモ"
    },
    {
        href: "https://docs.github.com/ja/pages",
        label: "GitHub Pages Docs",
        description: "デプロイ設定の一次情報"
    }
];

const app = document.getElementById("app");

if (app) {
    app.innerHTML = `
        <span class="pill">Visual-first Playground</span>
        <h1 class="hero-title">TypeScript / React を<br>見た目重視で検証する</h1>
        <p class="hero-lead">index は Vanilla JavaScript、ts-test / react-test は GitHub Actions でビルドされる構成です。</p>
        <section class="card-grid">
            ${links
                .map(
                    (link) => `
                        <a class="card" href="${link.href}" target="${link.href.startsWith("http") ? "_blank" : "_self"}">
                            <h3>${link.label}</h3>
                            <p>${link.description}</p>
                        </a>
                    `
                )
                .join("")}
        </section>
        <p class="footnote">Source: <code>index.js</code> (Vanilla JavaScript)</p>
    `;
}

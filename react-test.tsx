import React from "react";
import { createRoot } from "react-dom/client";

const status = document.getElementById("status");
const rootElement = document.getElementById("root");

if (status) {
  status.textContent = "React のビルド済みファイル読み込みに成功しました。";
}

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <section>
      <h2>React 表示テスト成功</h2>
      <p>このブロックはビルド済みの React で描画されています。</p>
    </section>
  );
}

const status = document.getElementById("status");
const output = document.getElementById("ts-output");

if (status) {
  status.textContent = "TypeScript のビルド済みファイル読み込みに成功しました。";
}

if (output) {
  const now = new Date().toLocaleString("ja-JP");
  output.innerHTML = `<strong>表示テスト成功:</strong> ${now}`;
}

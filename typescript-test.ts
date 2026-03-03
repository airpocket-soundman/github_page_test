type TaskStatus = "todo" | "doing" | "done";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  estimateHours: number;
}

const statusElement = document.getElementById("status");
const output = document.getElementById("ts-output");

const tasks: Task[] = [
  { id: 1, title: "Type定義を作る", status: "done", estimateHours: 1 },
  { id: 2, title: "DOMレンダリングを書く", status: "doing", estimateHours: 2 },
  { id: 3, title: "ビルド確認をする", status: "todo", estimateHours: 1 }
];

const statusLabel: Record<TaskStatus, string> = {
  todo: "未着手",
  doing: "作業中",
  done: "完了"
};

function sumBy<T>(items: T[], selector: (item: T) => number): number {
  return items.reduce((total, item) => total + selector(item), 0);
}

if (statusElement) {
  statusElement.textContent = "TypeScript のビルド済みファイル読み込みに成功しました。";
}

if (output) {
  const doneCount = tasks.filter((task) => task.status === "done").length;
  const totalHours = sumBy(tasks, (task) => task.estimateHours);
  const now = new Date().toLocaleString("ja-JP");

  output.innerHTML = `
    <p><strong>表示テスト成功:</strong> ${now}</p>
    <p>完了: ${doneCount}/${tasks.length}件 | 見積合計: ${totalHours}h</p>
    <ul>
      ${tasks
        .map(
          (task) =>
            `<li>#${task.id} ${task.title} - ${statusLabel[task.status]} (${task.estimateHours}h)</li>`
        )
        .join("")}
    </ul>
  `;
}

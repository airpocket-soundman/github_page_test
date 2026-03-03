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

function nextStatus(current: TaskStatus): TaskStatus {
  if (current === "todo") return "doing";
  if (current === "doing") return "done";
  return "todo";
}

function render() {
  if (!output) return;

  const doneCount = tasks.filter((task) => task.status === "done").length;
  const totalHours = sumBy(tasks, (task) => task.estimateHours);
  const now = new Date().toLocaleString("ja-JP");

  output.innerHTML = `
    <div class="metrics">
      <article class="metric">
        <p class="metric-label">現在時刻</p>
        <p class="metric-value">${now}</p>
      </article>
      <article class="metric">
        <p class="metric-label">完了タスク</p>
        <p class="metric-value">${doneCount}/${tasks.length}</p>
      </article>
      <article class="metric">
        <p class="metric-label">見積時間</p>
        <p class="metric-value">${totalHours}h</p>
      </article>
    </div>
    <ul class="task-list">
      ${tasks
        .map(
          (task) =>
            `<li class="task-item">
              <span>#${task.id} ${task.title} (${task.estimateHours}h)</span>
              <span>
                <span class="tag">${statusLabel[task.status]}</span>
                <button type="button" class="status-btn" data-task-id="${task.id}">
                  ステータス変更
                </button>
              </span>
            </li>`
        )
        .join("")}
    </ul>
  `;
}

if (statusElement) {
  statusElement.textContent = "TypeScript のビルド済みファイル読み込みに成功しました。";
}

if (output) {
  output.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest<HTMLButtonElement>(".status-btn");
    if (!button) return;

    const taskId = Number(button.dataset.taskId);
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    task.status = nextStatus(task.status);
    render();
  });

  render();
  setInterval(render, 1000);
}

import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const status = document.getElementById("status");
const rootElement = document.getElementById("root");

type Filter = "all" | "open" | "done";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

if (status) {
  status.textContent = "React のビルド済みファイル読み込みに成功しました。";
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Reactでstate管理", done: true },
    { id: 2, title: "フィルター実装", done: false },
    { id: 3, title: "UI反映確認", done: false }
  ]);
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = useMemo(() => {
    if (filter === "open") return todos.filter((todo) => !todo.done);
    if (filter === "done") return todos.filter((todo) => todo.done);
    return todos;
  }, [todos, filter]);

  const doneCount = todos.filter((todo) => todo.done).length;

  return (
    <section className="react-card">
      <h2>React 表示テスト成功</h2>
      <p>このブロックはビルド済みの React で描画されています。</p>
      <p>
        進捗: {doneCount}/{todos.length}
      </p>
      <div className="toolbar">
        <button
          type="button"
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          すべて
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === "open" ? "active" : ""}`}
          onClick={() => setFilter("open")}
        >
          未完了
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === "done" ? "active" : ""}`}
          onClick={() => setFilter("done")}
        >
          完了
        </button>
      </div>
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => {
                  setTodos((prev) =>
                    prev.map((item) =>
                      item.id === todo.id ? { ...item, done: !item.done } : item
                    )
                  );
                }}
              />
              <span className="todo-title">{todo.title}</span>
            </label>
            <span className="todo-badge">{todo.done ? "Done" : "Open"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

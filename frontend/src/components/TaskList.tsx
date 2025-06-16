import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Task {
  id: number;
  description: string;
}

export default function TaskList({
  userId,
  refreshKey,
}: {
  userId: number;
  refreshKey: number;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  const fetchTasks = async () => {
    const res = await api.get<Task[]>(`/users/${userId}/tasks`, {
      params: {
        page,
        limit: 10,
        sortBy,
        order,
      },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [userId, refreshKey, page, sortBy, order]);

  return (
    <>
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
        >
          <option value="id">Sort by ID</option>
          <option value="description">Sort by Description</option>
        </select>
        <select
          className="form-select"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            setPage(1);
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul className="list-group">
        {tasks.map((t) => (
          <li key={t.id} className="list-group-item">
            {t.description}
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="align-self-center">Page {page}</span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            if (tasks.length === 10) setPage((p) => p + 1);
          }}
          disabled={tasks.length < 10}
        >
          Next
        </button>
      </div>
    </>
  );
}

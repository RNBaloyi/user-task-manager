import { useEffect, useState } from "react";
import { api } from "../api/client";

interface User {
  id: number;
  name: string;
}

export default function UserList({
  onSelect,
  refreshKey,
}: {
  onSelect: (u: User) => void;
  refreshKey: number;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("asc");

  const fetchUsers = async () => {
    const res = await api.get<User[]>("/users", {
      params: {
        page,
        limit: 10,
        sortBy,
        order,
      },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshKey, page, sortBy, order]);

  return (
    <>
      <div className="d-flex gap-2 mb-3">
        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1); // reset to page 1 on sort change
          }}
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
        </select>
        <select
          className="form-select"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value);
            setPage(1); // reset to page 1 on order change
          }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul className="list-group">
        {users.map((u) => (
          <li
            key={u.id}
            className="list-group-item list-group-item-action"
            onClick={() => onSelect(u)}
          >
            {u.name}
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
            if (users.length === 10) setPage((p) => p + 1);
          }}
          disabled={users.length < 10}
        >
          Next
        </button>
      </div>
    </>
  );
}

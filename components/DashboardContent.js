"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchBoards = async () => {
      try {
        const res = await fetch("https://api.pinterest.com/v5/boards", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setBoards(data.items || []);
      } catch (err) {
        setError("Failed to fetch boards.");
        console.error(err);
      }
    };

    fetchBoards();
  }, [token]);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Your Pinterest Boards</h1>

      {error && <p className="text-red-500">{error}</p>}

      {boards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div key={board.id} className="p-4 border rounded shadow">
              <h2 className="font-semibold">{board.name}</h2>
              <p className="text-sm text-gray-500">{board.description}</p>
              <p className="text-xs text-gray-400 mt-1">ID: {board.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No boards found.</p>
      )}
    </div>
  );
}

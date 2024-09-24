// "use client";

import { liveblocks } from "@/lib/liveblock";
import Image from "next/image";
import React, { useEffect } from "react";

async function ActiveRoomUser({ roomId }: { roomId: string }) {
  const { data } = await liveblocks.getActiveUsers(roomId);
  const activeUsers = data.map((user) => user.info);

  return (
    <ul>
      {activeUsers.length > 0 &&
        activeUsers.slice(0, 5).map((user) => (
          <li key={user.id}>
            <Image
              src={user.avatar}
              height={30}
              width={30}
              alt={user.name}
              className={`rounded-full border-2`}
              style={{ borderColor: user.color }}
            />
          </li>
        ))}
    </ul>
  );
}

export default ActiveRoomUser;

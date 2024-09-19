import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import React from "react";

function ActiveCollaborators() {
  const others = useOthers();
  console.log("All collaborators list ", others);
  const allCollaborators = others.map((coll) => coll.info);

  return (
    <ul>
      {allCollaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            height={100}
            width={100}
            alt={name}
            className="inline-block size-8 rounded-full ring-2 ring-dark-100"
            style={{ border: `3px solid  ${color}` }}
          />
        </li>
      ))}
    </ul>
  );
}

export default ActiveCollaborators;

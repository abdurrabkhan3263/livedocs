import { dateConverter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteDocument from "./DeleteDocument";
import ActiveRoomUser from "./ActiveRoomUser";

export default function ListDocuments({
  id,
  title,
  createdAt,
}: {
  id: string;
  title: string;
  createdAt: string;
}) {
  return (
    <>
      <Link
        href={`/documents/${id}`}
        className="flex flex-1 items-center gap-4"
      >
        <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
          <Image
            src="/assets/icons/doc.svg"
            alt="file"
            width={40}
            height={40}
          />
        </div>
        <div className="space-y-1">
          <p className="line-clamp-1 text-lg">{title}</p>
          <p className="text-sm font-light text-blue-100">
            Created about {dateConverter(createdAt)}
          </p>
        </div>
      </Link>
      <ActiveRoomUser roomId={id} />
      <DeleteDocument roomId={id} />
    </>
  );
}

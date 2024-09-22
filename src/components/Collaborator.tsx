"use client";

import Image from "next/image";
import React, { useState } from "react";
import UserTypeSelector from "./UserTypeSelector";
import { Button } from "./ui/button";
import {
  removeCollaborator,
  updateDocumentAccess,
} from "@/lib/actions/room.actions";
import { useSelf } from "@liveblocks/react/suspense";

export default function AreCollaborator({
  roomId,
  email,
  creatorId,
  collaborator,
}: CollaboratorProps) {
  const { info: updatedBy } = useSelf();
  const [user, setUser] = useState(collaborator.userType || "viewer");
  const [loading, setLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {
    try {
      setLoading(true);
      await updateDocumentAccess({
        roomId,
        email,
        userType: type as UserType,
        updatedBy,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const removeCollaboratorHandler = async (type: string) => {
    try {
      setLoading(true);
      await removeCollaborator({ roomId, email, updatedBy });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2 items-center">
        <Image
          src={collaborator.avatar}
          width={36}
          height={36}
          className="size-9 rounded-full"
          alt={collaborator.name}
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && "updating..."}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {creatorId === collaborator.id ? (
        <p className="text-sm text-blue-100">Owner</p>
      ) : email === updatedBy.email ? (
        <p className="text-sm text-blue-100">You</p>
      ) : (
        <div className="flex items-center">
          <UserTypeSelector
            userType={user}
            setUserType={setUser}
            onClickHandler={shareDocumentHandler}
          />
          <Button
            type="button"
            onClick={() => removeCollaboratorHandler(collaborator.email)}
            disabled={loading}
          >
            {loading ? (
              <Image
                src={"/assets/icons/loader.svg"}
                height={24}
                width={24}
                alt="loading..."
                className="animate-spin"
              />
            ) : (
              <Image
                src={"/assets/icons/delete.svg"}
                height={24}
                width={24}
                alt="remove"
              />
            )}
          </Button>
        </div>
      )}
    </li>
  );
}

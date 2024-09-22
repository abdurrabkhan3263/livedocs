"use client";

import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModel = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("viewer");

  async function handleAddCollaborator() {
    if (!email) setError(true);
    try {
      setLoading(true);
      await updateDocumentAccess({
        roomId,
        email,
        userType,
        updatedBy: user.info,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setEmail("");
      error && setError(false);
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {currentUserType === "editor" && (
        <DialogTrigger>
          <Button
            className="flex gap-2 px-4 gradient-blue items-center"
            disabled={currentUserType !== "editor"}
          >
            <p>Share</p>
            <Image
              src="/assets/icons/share.svg"
              height={20}
              width={20}
              alt="share"
              className="mr-1 hidden sm:block"
            />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can access and view this project.
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="email-address">Email address</Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center rounded-md bg-dark-400">
            <Input
              id="email-address"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector userType={userType} setUserType={setUserType} />
          </div>
          <Button
            className="gradient-blue px-6"
            onClick={handleAddCollaborator}
            disabled={loading}
          >
            {loading ? "Saving...." : "Invite"}
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-500 line-clamp-2">Invalid email id</p>
        )}
        <div className="my-4 space-y-2">
          <ul className="flex flex-col">
            {collaborators &&
              collaborators.map((collaborator) => (
                <Collaborator
                  key={collaborator.id}
                  roomId={roomId}
                  email={collaborator.email}
                  creatorId={creatorId}
                  collaborator={collaborator}
                  user={user.info}
                />
              ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModel;

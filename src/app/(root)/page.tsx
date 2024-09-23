"use client";

import Header from "@/components/Header";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddDocumentBtn from "@/components/ui/AddDocumentBtn";
import { getDocuments } from "@/lib/actions/room.actions";
import ListDocuments from "@/components/ListDocuments";
import Notification from "@/components/Notification";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default async function Home() {
  const { user: clerkUser, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !clerkUser) {
      redirect("/sign-in");
    } else {
      fetchDocuments();
    }
  }, [clerkUser, isLoaded, router]);

  const fetchDocuments = async () => {
    if (clerkUser) {
      try {
        const { data } = await getDocuments(
          clerkUser.emailAddresses[0].emailAddress
        );
        setDocuments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="w-fit flex gap-5 items-center">
          <Notification />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {Array.isArray(documents) && documents?.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h2>All Documents</h2>
            {clerkUser && (
              <AddDocumentBtn
                userId={clerkUser?.id}
                email={clerkUser.emailAddresses[0].emailAddress}
              />
            )}
          </div>
          <ul className="document-ul">
            {Array.isArray(documents) &&
              documents.map(({ id, metadata, createdAt }: any) => (
                <li key={id} className="document-list-item">
                  <ListDocuments
                    id={id}
                    title={metadata.title}
                    createdAt={createdAt}
                  />
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src={"/assets/icons/doc.svg"}
            alt="document"
            width={30}
            height={30}
            className="mx-auto"
          />
          {clerkUser && (
            <AddDocumentBtn
              userId={clerkUser?.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          )}
        </div>
      )}
    </main>
  );
}

import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import AddDocumentBtn from "@/components/ui/AddDocumentBtn";

export default async function Home() {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const documents = [];
  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="w-fit flex gap-5 items-center">
          <Image
            src={"/assets/icons/bell.svg"}
            width={24}
            height={24}
            alt="search"
          />
          <Image
            src={"/assets/icons/bell.svg"}
            width={24}
            height={24}
            alt="search"
          />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents?.length > 0 ? (
        <div></div>
      ) : (
        <div className="document-list-empty">
          <Image
            src={"/assets/icons/doc.svg"}
            alt="document"
            width={30}
            height={30}
            className="mx-auto"
          />
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  );
}

import { liveblocks } from "@/lib/liveblock";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST() {
  const clearUser = await currentUser();

  if (!clearUser) {
    redirect("/sign-in");
  }
  const { id, firstName, lastName, emailAddresses, imageUrl } = clearUser;
  // Get the current user from your database
  const user = {
    id: id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}

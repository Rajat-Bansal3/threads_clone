import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadbyId } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding"); //i dont know why but it is taking onboarding as flase and sending me to onboarding page and my onboarding page is taking onboarding done so is finnaly redirecting me to the home page wtf is wrong with the dev servers fr bruh

  const thread = await fetchThreadbyId(params.id);

  return (
    <section className="relative ">
      <div className="">
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          communnity={thread.communnity}
          createdAt={thread.createdAt}
          comments={thread.children}
          isComment={false}
        />
      </div>

      <div className="">
        <Comment 
            threadid={thread.id}
            currentUserImage={user?.imageUrl}
            currentUserId={JSON.stringify(userInfo?._id)}
        />
      </div>
    </section>
  );
};

export default Page;

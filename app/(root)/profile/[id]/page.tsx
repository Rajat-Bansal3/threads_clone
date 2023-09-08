import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { connectToDB } from "@/lib/mongoose";
import { currentUser } from "@clerk/nextjs";
import { TabsContent } from "@radix-ui/react-tabs";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userinfo = await fetchUser(params.id);

  if (userinfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <ProfileHeader
        accountId={userinfo.id}
        authUserId={user.id}
        name={userinfo.name}
        username={userinfo.username}
        imgURL={userinfo.image}
        bio={userinfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="Threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden"></p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userinfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
              >
                <ThreadsTab
                  currentUserId = {user.id}
                  accountId = {userinfo.id}
                  accountType = "User"
                />
              </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};
export default Page;

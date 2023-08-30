import AccountsProfile from "@/components/forms/AccountsProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id : user?.id,
    objectId: userInfo?._id || "",
    username : userInfo?.username || user?.username,
    name : userInfo?.name || user?.firstName || "",
    bio : userInfo?.bio || "",
    image : userInfo?.image || user?.imageUrl
  }


  return (
    <>
      <main className="mx-auto w-full flex flex-col max-w-3xl justify-start px-10 py-20">
        <h1 className="head-text">OnBoarding</h1>
        <p className="mt-3 text-light-2 text-base-regular">
          Complete The Profile To Start Using Threads..
        </p>
        <section className="bg-dark-2 p-10 mt-9">
          <AccountsProfile user = {userData} btnTitle = "Continue"/>
        </section>
      </main>
    </>
  );
}

export default Page;

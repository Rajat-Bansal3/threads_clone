import UserCard from "@/components/cards/UserCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userinfo = await fetchUser(user.id);

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  if (!userinfo?.onboarded) redirect("/onboarding");
  return (
    <>
      <section>
        <h1 className="head-text mb-10">Search</h1>

        <div className="searchbar">
          <Input
            type="text "
            placeholder="Search Users"
            className="searchbar"
          />
          <Button className="px-3 py-2 bg-primary-500">Search</Button>
        </div>

        <div className="flex flex-col gap-10 mt-14">
          {result.users.length === 0 ? (
            <p className="no-results">No users</p>
          ) : (
            <>
              {result.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imageUrl={person.imgurl}
                  personType="User"
                />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;

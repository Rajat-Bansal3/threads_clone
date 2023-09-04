import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  communnity: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    }[];
    isComment: boolean;
  };
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  communnity,
  createdAt,
  comments,
}: Props) {
  {
    return (
      <>
        <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
          <div className="flex items-start justify-between">
            <div className="flex w-full flex-1 flex-row gap-4">
              <div className="flex flex-col items-center">
                <Link
                  href={`/profile/${author.id}`}
                  className="relative h-11 w-11"
                >
                  <Image
                    src={author.image}
                    alt="pfp"
                    fill
                    className="cursor-poiter rounded-full"
                  />
                </Link>
                <div className="thread-card_bar" />
              </div>
              <div className="flex w-full flex-col">
                <Link href={`/profile/${author.id}`} className="w-fit">
                  <h4 className="cursor-pointer text-base-semibold text-light-1">
                    {author.name}
                  </h4>
                </Link>
                <p className="mt-1 text-small-regular text-light-2">
                  {content}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <div
                    className="flex gap3.5
                          "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  }
}
export default ThreadCard;

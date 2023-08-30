"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectedToDB } from "../mongoose";

interface params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: params): Promise<void> {
  connectedToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
      );
      console.log(updateUser);
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`failed to create / update user : ${error.message}`);
  }
}

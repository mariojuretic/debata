"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { PhotoIcon, LinkIcon } from "@heroicons/react/24/outline";

type FormData = {
  postTitle: string;
  postContent: string;
  postImage: string;
  topicName: string;
};

export default function PostBox() {
  const { data: session } = useSession();

  const [showImageInput, setShowImageInput] = useState<boolean>(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submitHandler = handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <form
      className="space-y-2 rounded border border-slate-300 bg-white p-2 text-sm sm:px-4 sm:text-base"
      onSubmit={submitHandler}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded border border-slate-300 sm:h-10 sm:w-10">
          <Image
            src={`https://api.dicebear.com/6.x/open-peeps/png?seed=${
              session?.user?.name || "debata"
            }`}
            alt="Avatar"
            fill
            className="object-cover object-center"
          />
        </div>

        <input
          type="text"
          placeholder={
            session
              ? "Start entering a title for a new post"
              : "Please log in to post"
          }
          disabled={!session}
          className="grow rounded border border-slate-200 bg-slate-100 px-4 py-2 outline-none enabled:hover:border-slate-300 disabled:cursor-not-allowed"
          {...register("postTitle", { required: true })}
        />

        {!!watch("postTitle") && (
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded p-2 hover:bg-slate-100 sm:h-10 sm:w-10"
            onClick={() =>
              setShowImageInput((prevShowImageInput) => !prevShowImageInput)
            }
          >
            <PhotoIcon
              className={showImageInput ? "text-orange-600" : "text-slate-500"}
            />
          </button>
        )}
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <p className="min-w-[5rem] sm:min-w-[6rem]">Content:</p>
            <input
              type="text"
              placeholder="Post body (optional)"
              className="grow rounded border border-slate-200 bg-slate-100 px-4 py-2 outline-none hover:border-slate-300"
              {...register("postContent")}
            />
          </div>

          <div className="flex items-center">
            <p className="min-w-[5rem] sm:min-w-[6rem]">Topic:</p>
            <input
              type="text"
              placeholder="e.g. nextjs"
              className="grow rounded border border-slate-200 bg-slate-100 px-4 py-2 outline-none hover:border-slate-300"
              {...register("topicName", { required: true })}
            />
          </div>

          {showImageInput && (
            <div className="flex items-center">
              <p className="min-w-[5rem] sm:min-w-[6rem]">Image:</p>
              <input
                type="text"
                placeholder="Optional..."
                className="grow rounded border border-slate-200 bg-slate-100 px-4 py-2 outline-none hover:border-slate-300"
                {...register("postImage")}
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className="flex flex-col space-y-2 text-sm text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- Post title is required</p>
              )}

              {errors.topicName?.type === "required" && (
                <p>- Topic is required</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-500"
          >
            Create Post
          </button>
        </div>
      )}
    </form>
  );
}

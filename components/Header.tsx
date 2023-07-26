"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  PlusIcon,
  MegaphoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

import logo from "@/assets/logo.png";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex w-full items-center space-x-2 bg-white p-2 shadow-sm lg:space-x-4 lg:px-4">
      <div className="flex shrink-0 grow items-center space-x-2 lg:space-x-4">
        <Link href="/" className="relative h-8 w-28 shrink-0">
          <Image
            src={logo}
            alt="Logo"
            fill
            className="object-contain object-left"
          />
        </Link>

        <button className="hidden shrink-0 items-center space-x-2 rounded border border-transparent p-2 hover:border-slate-200 lg:flex 2xl:min-w-[320px]">
          <div className="flex shrink-0 grow items-center space-x-2">
            <HomeIcon className="h-5 w-5" />
            <span className="text-sm">Home</span>
          </div>
          <ChevronDownIcon className="h-4 w-4" />
        </button>

        <form className="hidden shrink-0 grow items-center space-x-2 rounded border border-slate-200 bg-slate-100 p-2 hover:border-slate-300 sm:flex lg:px-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search Debata"
            className="flex-1 bg-transparent text-sm outline-none"
          />

          <button type="submit" hidden>
            Search
          </button>
        </form>
      </div>

      <div className="flex shrink-0 items-center">
        <div className="hidden shrink-0 items-center lg:flex">
          <SparklesIcon className="header-icon" />
          <GlobeAltIcon className="header-icon" />
          <VideoCameraIcon className="header-icon" />

          <div className="mx-2 h-10 w-px bg-slate-200" />

          <ChatBubbleOvalLeftEllipsisIcon className="header-icon" />
          <BellIcon className="header-icon" />
          <PlusIcon className="header-icon" />
          <MegaphoneIcon className="header-icon" />
        </div>

        <div className="flex shrink-0 items-center lg:hidden">
          <HomeIcon className="header-icon" />
          <Bars3Icon className="header-icon" />
        </div>

        {session ? (
          <button
            onClick={() => signOut()}
            className="ml-2 flex shrink-0 items-center space-x-1 rounded border border-slate-200 p-2 text-slate-500 hover:border-slate-300 lg:ml-4 lg:space-x-2 lg:px-4"
          >
            <div className="h-5 w-5 rounded-full bg-orange-600" />
            <span className="text-sm">{session.user?.name}</span>
          </button>
        ) : (
          <button
            onClick={() => signIn("reddit")}
            className="ml-2 flex shrink-0 items-center space-x-1 rounded border border-slate-200 p-2 text-slate-500 hover:border-slate-300 lg:ml-4 lg:space-x-2 lg:px-4"
          >
            <UserCircleIcon className="h-5 w-5" />
            <span className="text-sm">Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}

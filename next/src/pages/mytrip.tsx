import React, { useState } from "react";
import DashboardLayout from "../layout/dashboard";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";
import { DrawerItemButton, DrawerItemButtonLoader } from "../components/drawer/DrawerItemButton";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
// import { sortBlogs } from "../utils/sortBlogs";
import { FaPlusCircle } from "react-icons/fa";

export default function MyTrip() {
  const router = useRouter();
  const { session, signIn, signOut, status } = useAuth();
  const [t] = useTranslation("drawer");

  const { isLoading, data } = api.agent.getAll.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const userAgents = data ?? [];
  // const sortedBlogs = sortBlogs(data ?? []);
  return (
    <DashboardLayout>
      <section className="xl:px-32 flex w-full flex-col items-center justify-center p-5 sm:px-10 md:px-24">
        <div className="mt-5 flex w-full  justify-between">
          <h3 className="text-dark dark:text-light inline-block w-fit text-2xl font-bold capitalize md:text-4xl">
            Your Trips
          </h3>
          <Link
            href="/"
            // className="text-accent dark:text-accentDark inline-block text-base font-medium underline  underline-offset-2 md:text-lg"
            className="flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2.5 text-black hover:bg-cyan-100 md:text-base"
          >
            <FaPlusCircle />
            New Trip
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {status === "unauthenticated" && (
            <div className="p-1 text-sm text-slate-12">
              <a className="link" onClick={() => void signIn()}>
                {t("SIGN_IN")}
              </a>{" "}
              {t("SIGN_IN_NOTICE")}
            </div>
          )}
          {status === "authenticated" && !isLoading && userAgents.length === 0 && (
            <div className="p-1 text-sm text-slate-12">
              {t("NEED_TO_SIGN_IN_AND_CREATE_AGENT_FIRST")}
            </div>
          )}

          {/* {sortedBlogs.slice(4, 10).map((blog, index) => {
            return (
              <article key={index} className="relative col-span-1 row-span-1">
                <BlogLayoutThree blog={blog} />
              </article>
            );
          })} */}

          {(status === "loading" || (status === "authenticated" && isLoading)) && (
            <div className="flex flex-col gap-2 overflow-hidden">
              {Array(13)
                .fill(0)
                .map((_, index) => (
                  <DrawerItemButtonLoader key={index} />
                ))}
            </div>
          )}

          {userAgents.map((agent, index) => (
            <DrawerItemButton
              key={`${index}-${agent.name}`}
              className="flex w-full rounded-md p-2 text-sm font-semibold"
              text={agent.name}
              onClick={() => void router.push(`/agent?id=${agent.id}`)}
            />
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}

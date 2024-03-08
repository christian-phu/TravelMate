import React, { useState } from "react";
import DashboardLayout from "../layout/dashboard";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";
import { DrawerItemButton, DrawerItemButtonLoader } from "../components/drawer/DrawerItemButton";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
// import { sortBlogs } from "../utils/sortBlogs"; 

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
      <section className="sxl:px-32 flex w-full flex-col items-center  justify-center px-5 sm:px-10 md:px-24">
        <div className="mt-5 flex w-full  justify-between">
          <h3 className="text-dark dark:text-light inline-block w-fit text-2xl font-bold capitalize md:text-4xl">
            Your Trips
          </h3>
          <Link
            href="/categories/all"
            className="text-accent dark:text-accentDark inline-block text-base font-medium underline      underline-offset-2 md:text-lg"
          >
            + New Trip
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 grid-rows-2 gap-16 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* <div className="mx-8 mb-2 mr-2 flex-1 overflow-y-auto overflow-x-hidden overflow-ellipsis">
          
        </div> */}
      </section>
      ;
    </DashboardLayout>
  );
}

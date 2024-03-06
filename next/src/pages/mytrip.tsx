import React, { useState } from "react";
import DashboardLayout from "../layout/dashboard";
import { useAuth } from "../hooks/useAuth";
import { api } from "../utils/api";
import { DrawerItemButton, DrawerItemButtonLoader } from "../components/drawer/DrawerItemButton";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function MyTrip() {
  const router = useRouter();
  const { session, signIn, signOut, status } = useAuth();
  const [t] = useTranslation("drawer");

  const { isLoading, data } = api.agent.getAll.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const userAgents = data ?? [];

  return (
    <DashboardLayout>
      <div className="mx-8 mb-2 mr-2 flex-1 overflow-y-auto overflow-x-hidden overflow-ellipsis">
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
    </DashboardLayout>
  );
}

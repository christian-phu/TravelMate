import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IoCloseSharp } from "react-icons/io5";

import { DrawerItemButton, DrawerItemButtonLoader } from "./DrawerItemButton";
import type { DisplayProps } from "./Sidebar";
import Sidebar from "./Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../utils/api";
import AuthItem from "../sidebar/AuthItem";
import LinkIconItem from "../sidebar/LinkIconItem";
import LinkItem from "../sidebar/LinkItem";
import { PAGE_LINKS } from "../sidebar/links";

const LeftSidebar = ({ show, setShow, onReload }: DisplayProps & { onReload?: () => void }) => {
  const router = useRouter();
  const { session, signIn, signOut, status } = useAuth();
  const [t] = useTranslation("drawer");

  const { isLoading, data } = api.agent.getAll.useQuery(undefined, {
    enabled: status === "authenticated",
  });
  const userAgents = data ?? [];

  const navigateToPage = (href: string) => {
    if (router.pathname === href) {
      onReload?.();
      return;
    }

    void router.push(href);
  };

  return (
    <Sidebar show={show} setShow={setShow} side="left" className="border-slate-6s border-r">
      <div className="flex flex-row items-center pb-6">
        <button
          className="ml-auto rounded-md border-none transition-all hover:bg-slate-5"
          onClick={() => setShow(!show)}
        >
          <IoCloseSharp size="24" className="z-20 m-2 text-slate-11" />
        </button>
      </div>
      <button
        className="mb-4 rounded-md bg-slate-1 p-1 shadow-depth-1 hover:bg-slate-2"
        onClick={() => navigateToPage("/")}
      >
        New Trip
      </button>
      <div className="mb-2 mr-2 flex-1 overflow-y-auto overflow-x-hidden overflow-ellipsis">
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
    </Sidebar>
  );
};

export default LeftSidebar;

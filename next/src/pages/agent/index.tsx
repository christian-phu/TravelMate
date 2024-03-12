import type { GetStaticProps } from "next";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import { FaBackspace, FaShare, FaTrash } from "react-icons/fa";

import nextI18NextConfig from "../../../next-i18next.config";
import Button from "../../components/Button";
import { ChatMessage } from "../../components/console/ChatMessage";
import ChatWindow from "../../components/console/ChatWindow";
import FadeIn from "../../components/motions/FadeIn";
import Toast from "../../components/toast";
import { env } from "../../env/client.mjs";
import DashboardLayout from "../../layout/dashboard";
import type { Message } from "../../types/message";
import { api } from "../../utils/api";
import { languages } from "../../utils/languages";
import Map from "../../components/Map";

const AgentPage: NextPage = () => {
  const [t] = useTranslation();
  const [showCopied, setShowCopied] = useState(false);
  const router = useRouter();

  const agentId = typeof router.query.id === "string" ? router.query.id : "";

  const getAgent = api.agent.findById.useQuery(agentId, {
    enabled: router.isReady,
  });

  const deleteAgent = api.agent.deleteById.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });

  const messages = getAgent.data ? (getAgent.data.tasks as Message[]) : [];
  console.log("messages", getAgent.data);

  const shareLink = () => {
    return encodeURI(`${env.NEXT_PUBLIC_VERCEL_URL}${router.asPath}`);
  };

  const addressData = [
    {
      id: 0,
      address:
        "Thảo Cầm Viên (Saigon Zoo And Botanical Garden), 2B Nguyễn Bỉnh Khiêm, Phường Bến Nghé, Quận 1, Ho Chi Minh City, Vietnam",
    },
    {
      id: 1,
      address: "Dam Sen Water Park, Số 03 Hòa Bình, Phường 3, Quận 11, Ho Chi Minh City, Vietnam",
    },
    { id: 2, address: "Bến Nhà Rồng, Ho Chi Minh City, Vietnam" },
    { id: 3, address: "Chợ Bến Thành (Ben Thanh Market)" },
    {
      id: 4,
      address: "Nhà Thờ Đức Bà",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-wrap">
        <div className="p-4" style={{ maxHeight: "calc(100vh - 4rem)", overflowX: "scroll" }}>
          <div className="flex w-full max-w-screen-md flex-grow flex-col items-center overflow-hidden">
            <ChatWindow messages={messages} title={getAgent?.data?.name} visibleOnMobile>
              {messages.map((message, index) => {
                return (
                  <FadeIn key={`${index}-${message.type}`}>
                    <ChatMessage message={message} />
                  </FadeIn>
                );
              })}
            </ChatWindow>
          </div>
          <div className="flex flex-row gap-2">
            <Button icon={<FaBackspace />} onClick={() => void router.push("/")}>
              Back
            </Button>
            <Button
              icon={<FaTrash />}
              loader
              onClick={() => {
                deleteAgent.mutate(agentId);
              }}
              enabledClassName={"bg-red-600 hover:bg-red-400"}
            >
              Delete
            </Button>

            <Button
              icon={<FaShare />}
              onClick={() => {
                void window.navigator.clipboard
                  .writeText(shareLink())
                  .then(() => setShowCopied(true));
              }}
              enabledClassName={"bg-green-600 hover:bg-green-400"}
            >
              Share
            </Button>
          </div>
          <Toast
            model={[showCopied, setShowCopied]}
            title={t("COPIED_TO_CLIPBOARD", { ns: "common" })}
            className="bg-gray-950 text-sm"
          />
        </div>
        <div className="p-4" style={{ width: 580, height: 630 }}>
          <Map addressData={addressData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentPage;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};

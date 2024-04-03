import type { GetStaticProps } from "next";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect } from "react";
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
import Map from "../../components/map";

const TripPage: NextPage = () => {
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
  let addressData1 = [];
  const lastMessage = messages[messages.length - 1];
  if (lastMessage !== undefined) {
    const match = lastMessage.info.match(/Các địa điểm du lịch ở Phú Quốc:\s*\[(.*?)\]/s);
    if (match) { 
      // console.log("Danh sách địa điểm du lịch:", match[1]);
      addressData1 = match[1].split(',').map((address, index) => ({ id: index, address: address.trim() }));
      console.log("Danh sách địa điểm du lịch:", addressData1);
    } else {
      console.log("Không tìm thấy danh sách địa điểm du lịch.");
    }
  } else {
    console.log("Last Message is undefined.");
  }

  const shareLink = () => {
    return encodeURI(`${env.NEXT_PUBLIC_VERCEL_URL}${router.asPath}`);
  };

  // const addressData = [
  //   { id: 0, address: "Thảo Cầm Viên" },
  //   { id: 1, address: "Dam Sen Water Park"},
  //   { id: 2, address: "Bến Nhà Rồng" },
  //   { id: 3, address: "Chợ Bến Thành" },
  //   { id: 4, address: "Nhà Thờ Đức Bà" },
  // ];

  return (
    <DashboardLayout>
      <section className="grid h-screen w-screen md:grid-cols-2">
        <div className="pl-8" style={{ maxHeight: "calc(100vh)", overflowX: "scroll" }}>
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
          <div className="flex flex-row items-center gap-2 mb-16">
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
        <div className="" style={{ maxHeight: "calc(100vh)", overflowX: "scroll" }}>
          <Map addressData={addressData1} />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default TripPage;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};

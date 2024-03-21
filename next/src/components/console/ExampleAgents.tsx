import { useSession } from "next-auth/react";
import React from "react";

import { ExampleAgentButton } from "./ExampleAgentButton";
import { useSID } from "../../hooks/useSID";
import FadeIn from "../motions/FadeIn";
import { useState } from "react";

type ExampleAgentsProps = {
  setAgentRun?: (name: string, goal: string) => void;
  setShowSignIn: (show: boolean) => void;
};

const ExampleAgents = ({ setAgentRun, setShowSignIn }: ExampleAgentsProps) => {
  const { data: session } = useSession();
  const sid = useSID(session);

  return (
    <>
      <FadeIn delay={0.9} duration={0.5}>
        <div className="my-2 grid grid-cols-1 items-stretch gap-2 sm:my-4 sm:grid-cols-3">
          <ExampleAgentButton name="Ha Noi 🇻🇳" setAgentRun={setAgentRun}>
            Plan a detailed trip to Ha Noi, Vietnam
          </ExampleAgentButton>

          <ExampleAgentButton name="Ha long Bay 🏝️" setAgentRun={setAgentRun}>
            Plan a detailed trip to Ha Long Bay, Vietnam
          </ExampleAgentButton>

          <ExampleAgentButton name="Ho Chi Minh 🏙️" setAgentRun={setAgentRun}>
            Plan a detailed trip to Ho Chi Minh City, Vietnam
          </ExampleAgentButton>
        </div>
      </FadeIn>

    </>
  );
};

export default ExampleAgents;

import clsx from "clsx";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CycleIcons from "./motions/CycleIcons";
import FadeIn from "./motions/FadeIn";
import AuthItem from "../components/sidebar/AuthItem";
import { useAuth } from "../hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { MdAddLocationAlt } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";

const navigation = [
  { name: "Home", href: "/", icon: <FaHouse /> },
  { name: "MyTrip", href: "/mytrip", icon: <MdAddLocationAlt /> },
  { name: "Setting", href: "/settings", icon: <AiFillSetting /> },
];

export default function NavBar() {
  const { session, signIn, signOut, status } = useAuth();
  const router = useRouter();
  const currentIndex = navigation.findIndex(
    (nav) => router.pathname.includes(nav.href) || router.pathname === nav.href
  );
  const [hoveredButtonIndex, setHoveredButtonIndex] = useState(0);

  return (
    <FadeIn duration={3}>
      <Disclosure as="nav" className="z-50 w-full bg-transparent text-black">
        {({ open }) => (
          <>
            <div className="align-center flex h-20 flex-row justify-between px-8 shadow-md">
              <a href="/" className="flex flex-shrink-0 cursor-pointer items-center lg:flex-1">
                <Image
                  src="/logos/logo11.svg"
                  width="42"
                  height="42"
                  alt="logo trip"
                  className="mb-1 mr-2 invert-0"
                />
                <span className="text-base/7 font-semibold md:text-xl/8">Travel Mate AI</span>
              </a>

              <div className="hidden flex-1 items-center justify-center xmd:flex">
                <div className="border-gradient flex h-[42px] items-center self-center overflow-hidden rounded-full bg-opacity-5 px-2 py-1 backdrop-blur-lg">
                  <CycleIcons
                    currentIndex={currentIndex}
                    hoveredItemIndex={hoveredButtonIndex}
                    icons={navigation.map((nav) => nav.icon)}
                  />
                  {navigation.map((item, i) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        "after-gradient text-md relative flex flex-col items-center justify-center p-2 px-4 text-center font-normal tracking-normal text-black transition-colors duration-700 before:absolute before:-bottom-[20px] before:-z-20 before:h-6 before:w-12 before:bg-white/60 before:blur-lg before:transition-opacity before:duration-700 after:absolute after:-bottom-[2.25px] after:h-[1px] after:w-16 after:px-2 after:transition-opacity after:duration-700 hover:underline",
                        currentIndex !== i && "text-black/100 before:opacity-0 after:opacity-0"
                      )}
                      onMouseEnter={() => setHoveredButtonIndex(i)}
                      onMouseLeave={() => setHoveredButtonIndex(0)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden w-2 justify-end gap-2 xmd:flex sm:items-center lg:flex-1 ">
                <AuthItem session={session} signOut={signOut} signIn={signIn} />
              </div>

              <div className="-mr-2 flex items-center xmd:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FaTimes className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FaBars className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>

            <Disclosure.Panel className="xmd:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base text-black hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </FadeIn>
  );
}

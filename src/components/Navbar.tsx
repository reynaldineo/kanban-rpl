import clsxm from "@/libs/clxsm";
import useAuthStore from "@/stores/useAuthStore";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";
import { HiMiniUser } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import LogoutModal from "./modals/auth/LogoutModal";

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <LogoutModal>
      {({ openModal }) => (
        <section className="flex w-full justify-between bg-slate-700 py-3.5 px-5 text-white">
          <Link href="/board">
            <div className=" font-bold">ReynaldiNeo</div>
          </Link>
          <Menu
            className="lg:relative flex flex-col items-end absolute right-[5%]"
            as="div"
          >
            <Menu.Button>
              {({ open }) => (
                <div className="flex lg:gap-2 gap-1.5 items-center">
                  <HiChevronDown
                    className={clsxm(
                      "text-base text-white transition ease-in-out duration-200",
                      open && "rotate-180"
                    )}
                  />
                  <div className="lg:w-8 lg:h-8 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                    <HiMiniUser className="w-[15px] h-[15px] lg:w-5 lg:h-5 text-slate-800" />
                  </div>
                </div>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={clsxm(
                  "absolute lg:w-[304px] w-[247px] shadow-80 bg-zinc-100 text-black origin-top mt-2",
                  "flex flex-col lg:py-6 py-8 lg:px-5 px-0 rounded-md items-start lg:divide-y divide-y-0",
                  "focus:outline-none gap-y-6"
                )}
              >
                <Menu.Item
                  as="div"
                  className="flex flex-col gap-2 w-full px-6 lg:px-0"
                >
                  <p className="text-xl font-bold">{user?.name}</p>
                  <p className="text-base font-medium">{user?.email}</p>
                </Menu.Item>
                <div className="w-full lg:pt-6">
                  <Menu.Item
                    as="button"
                    onClick={openModal}
                    className="flex lg:hover:bg-info-focus w-full rounded-[4px] px-4 lg:px-0"
                  >
                    <div
                      className={clsxm(
                        "lg:px-[26px] px-4 py-3 rounded-xl text-neutral-60 hover:bg-slate-500 hover:text-white active:bg-slate-800 flex items-center gap-2 w-full"
                      )}
                    >
                      <TbLogout className="text-2xl" />
                      <p className="font-semibold text-base">Logout</p>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </section>
      )}
    </LogoutModal>
  );
}

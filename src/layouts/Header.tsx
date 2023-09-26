import React, { useEffect, useState } from "react";
import { Container } from "./Container";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { useRouter } from "next/router";
import { NAVLINK } from "@/constants/Index";
import { MenuIcon } from "@/components/Icons/MenuIcon";
import CloseIcon from "@/components/Icons/CloseIcon";

const Header = () => {
  const router = useRouter();
  const { pathname, query } = router;

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (openMenu) {
        document.body.classList.add("lg:overflow-auto", "overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [openMenu]);

  return (
    <div className="relative">
      <div className="sticky top-0 z-50 border-b bg-white py-4 shadow-md md:py-5">
        <Container>
          <div className="flex flex-row items-center justify-between">
            <div>
              <Link
                href={"/"}
                className="font-Inter text-2xl font-semibold italic leading-5 text-purple-700"
              >
                E-Paper
              </Link>
            </div>
            <div className="hidden flex-row items-center justify-between gap-3 md:flex lg:gap-4">
              {NAVLINK &&
                NAVLINK.length > 1 &&
                NAVLINK.map(({ id, lable, path }) => (
                  <Link
                    href={path}
                    key={id}
                    className={twJoin(
                      "rounded-lg border px-2 py-1.5 font-Inter text-base leading-5 lg:px-4 lg:py-2",
                      query?.pathName === path || pathname === path
                        ? "border-purple-700 bg-purple-700 text-white"
                        : "border-transparent"
                    )}
                  >
                    {lable}
                  </Link>
                ))}
            </div>

            <div className="block md:hidden">
              <button className="w-7" onClick={() => setOpenMenu(!openMenu)}>
                <MenuIcon />
              </button>
            </div>
          </div>
        </Container>

        {openMenu && (
          <div className="fadeInRight fixed top-0 h-screen w-full overflow-y-auto bg-white p-3 flex flex-col justify-start items-center gap-4">
            <div className="self-end">
              <button className="w-7" onClick={() => setOpenMenu(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col items-center justify-between gap-3">
              {NAVLINK &&
                NAVLINK.length > 1 &&
                NAVLINK.map(({ id, lable, path }) => (
                  <Link
                    href={path}
                    key={id}
                    className={twJoin(
                      "rounded-lg border px-4 py-1.5 font-Inter text-base leading-5",
                      query?.pathName === path || pathname === path
                        ? "border-purple-700 bg-purple-700 text-white"
                        : "border-transparent"
                    )}
                    onClick={() => setOpenMenu(false)}
                  >
                    {lable}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };

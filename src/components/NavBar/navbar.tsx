"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <header className="flex items-center justify-between bg-liferayGrey px-7 py-3">
      <Image src="/logoBlue.png" alt="Liferay" width={215} />
      <nav className="-ml-[50px] text-black">
        <Link
          href="/home"
          className={
            pathname === "/home" ? "text-liferayBlue" : "hover:text-liferayBlue"
          }
        >
          Início
        </Link>
        <span> | </span>
        <Link
          href="/campaign"
          className={
            pathname === "/campaign"
              ? "text-liferayBlue"
              : "hover:text-liferayBlue"
          }
        >
          Campanhas
        </Link>
        <span> | </span>
        <Link
          href="/data"
          className={
            pathname === "/data" ? "text-liferayBlue" : "hover:text-liferayBlue"
          }
        >
          Dashboard
        </Link>
        <span> | </span>
        <Link
          href="/donation"
          className={
            pathname === "/donation"
              ? "text-liferayBlue"
              : "hover:text-liferayBlue"
          }
        >
          Doações
        </Link>
      </nav>
      <div className="relative flex items-center gap-2">
        {userName && <span className="text-black ml-2">{userName}</span>}
        <IoIosNotifications size={30} color="#0B63CE" />
        <div
          className="rounded-full bg-white p-2 items-center justify-center hover:opacity-50 hover:cursor-pointer "
          onClick={() => setShowMenu(!showMenu)}
        >

          <FaUser size={20} color="#0B63CE" />
        </div>
        {showMenu && (
          <div className="absolute right-0 mt-24 px-5 bg-white border rounded-md shadow-lg hover:bg-gray-200">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-black "
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-blue-500 text-white px-2">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          Star Wars App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/"
                className={clsx('text-gray-300 hover:text-white', {'text-white': pathname === '/'})}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/heroes"
                className={clsx('text-gray-300 hover:text-white', {'text-white': pathname.includes('/heroes')})}
              >
                Heroes
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

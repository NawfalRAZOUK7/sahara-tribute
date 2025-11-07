"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/un-resolution", label: "قرار مجلس الأمن" },
  { href: "/sahara", label: "الصحراء" },
  { href: "/flipbook-story", label: "قصة مصورة" },
  { href: "/future", label: "رؤية 2030" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
      <nav className="container-narrow flex items-center gap-4 py-3">
        <Link href="/" className="me-auto font-bold text-morocco-red">Sahara • Morocco</Link>
        <ul className="hidden md:flex gap-4">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`px-3 py-1 rounded-lg hover:bg-neutral-100 ${
                  pathname === l.href ? "text-morocco-green font-semibold" : "text-neutral-700"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="rounded-lg border px-3 py-1 text-sm hover:bg-neutral-50">AR / FR / EN</button>
      </nav>
    </header>
  );
}

import Link from "next/link";
import Particles from "./particles";
import { HeroTitle } from "./hero-title";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Competencies", href: "/skills" },
  { name: "Contacts", href: "/contact" },
  { name: "Resume", href: "/resume" },
];

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-12 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-1xl duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="intro-line hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={200}
      />
      <HeroTitle className="text-4xl py-3 text-transparent duration-1000 bg-white cursor-default text-edge-outline font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text" />

      <div className="intro-line hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-12 text-center animate-fade-in">
        <h2 className="text-1xl text-zinc-500 text-center">
          <span className="relative group">
            Namaste
            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6 opacity-0 group-hover:opacity-100 group-hover:-translate-y-10 transition-all duration-300 text-2xl text-zinc-700">
              🙏
            </span>
          </span>
          , I am{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/ajay-barman-0b37011a7/"
            className="underline duration-500 hover:text-zinc-300"
          >
            Ajay Barman{" "}
          </Link>{" "}
          (also known as{" "}
          <Link
            target="_blank"
            href="https://github.com/Barmanji/"
            className="font-bold duration-500 hover:text-zinc-300"
          >
            Barmanji
          </Link>
          ) a software craftsman based in{" "}
          <Link
            target="_blank"
            href="https://www.g20.in"
            className="font-bold duration-500 hover:text-zinc-300"
          >
            India
          </Link>
          . Currently dating{" "}
          <Link
            target="_blank"
            href="https://tanstack.com/query/latest"
            className="underline duration-500 hover:text-zinc-300"
          >
            TanstackQuery
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            href="https://doc.rust-lang.org/book/"
            className="underline duration-500 hover:text-zinc-300"
          >
            Rust.
          </Link>
          <br />
          If you like my{" "}
          <span className="relative group text-yellow-500 transition duration-500 hover:text-yellow-300">
            <Link target="_blank" href="/projects">
              Work.{" "}
            </Link>
          </span>
          Then{" "}
          <Link
            target="_blank"
            href="/contact"
className="relative text-zinc-300 duration-500 hover:text-zinc-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            hook
          </Link>{" "}
          me up{" "}
          <span className="group relative text-pink-600 transition duration-500 hover:brightness-125">
            let&apos;s cook up something amazing!
          </span>
          <br />
          <br />
          <p>
            Flying through code blazingly fast in{" "}
            <span className="font-bold">
              <span className="block sm:inline">NeoVim</span>
              <span className="hidden md:inline"> | </span>
              <span className="block sm:inline">Arch BTW</span>
            </span>
          </p>
        </h2>
      </div>
    </div>
  );
}

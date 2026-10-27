"use client";

function asset(file: string) {
  return `/originkit/hero-28/${file}`;
}

const NAV_LINKS = ["Platform", "Solutions", "Resources", "Pricing"] as const;

const LINK_CLASS =
  "flex min-h-11 items-center font-tight text-[17px] leading-[25.5px] tracking-[-0.34px] whitespace-nowrap text-white" +
  " transition-opacity duration-200 ease-out" +
  " focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" +
  " [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-70";

export const Navbar = () => (
  <nav
    aria-label="Primary"
    className="relative z-30 flex h-[42px] w-full items-center justify-between px-[58px] ipad:h-[62px] ipad:px-[82px] ipad:pt-[17px] desktop-sm:h-[80px] desktop-sm:px-[116px] desktop-sm:pt-0"
  >
    <div className="flex items-center">
      <a
        href="#"
        aria-label="Zentra home"
        className="flex items-center gap-[5.538px] rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ipad:gap-2"
      >
        <img
          src={asset("logo-mark.svg")}
          alt=""
          aria-hidden
          className="block size-[15.231px] max-w-none ipad:size-[22px]"
        />
        <span className="font-sans text-[13.846px] leading-[17.654px] font-semibold tracking-[-0.2769px] whitespace-nowrap text-white ipad:text-[20px] ipad:leading-[25.5px] ipad:tracking-[-0.4px]">
          Zentra
        </span>
      </a>

      {}
      <ul className="ml-[52px] hidden items-center gap-6 desktop-sm:flex">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#" className={LINK_CLASS}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {}
    <button
      type="button"
      className="hidden cursor-pointer items-center justify-center rounded-[12px] border border-solid border-white/10 bg-white/[0.02] px-[20px] py-[12px] font-tight text-[16px] leading-[normal] font-medium tracking-[-0.48px] whitespace-nowrap text-white transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 desktop-sm:flex [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/10"
    >
      Start Free
    </button>

    {}
    <button
      type="button"
      aria-label="Open menu"
      className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.97] motion-reduce:active:scale-100 desktop-sm:hidden"
    >
      <img
        src={asset("menu.svg")}
        alt=""
        aria-hidden
        className="block size-6 max-w-none"
      />
    </button>
  </nav>
);
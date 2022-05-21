import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

interface HeaderProps {
  viewport: {
    w: number;
    h: number;
    is568: boolean;
    is768: boolean;
    is1024: boolean;
  };
}

let header_breadcrumb = "";

const Header: React.FC<HeaderProps> = ({ viewport: { is768 } }) => {
  const router = useRouter().pathname.split("/")[0];
  if (router === "") header_breadcrumb = ".is()";
  else header_breadcrumb = `.${router}()`;
  const openMenu = () => {
    document.body.classList.add("-open-nav");
  };
  const closeMenu = () => {
    document.body.classList.remove("-open-nav");
  };
  return (
    <header id="header">
      <div className="header-bg">
        <div className="-default"></div>
        <div className="-mario"></div>
        <div className="-admin"></div>
        <div className="-confianca"></div>
        <div className="-desbravando"></div>
      </div>

      <div className="header-container">
        <div className="header-breadcrumb">{header_breadcrumb}</div>

        {is768 ? (
          <button
            v-if="viewport.is768"
            title="Open menu"
            type="button"
            className="header-nav-button"
            onClick={openMenu}
          >
            <span className="label">Menu</span>

            <span className="dots d1"></span>
            <span className="dots d2"></span>
            <span className="dots d3"></span>
          </button>
        ) : null}

        <nav className="header-nav">
          {is768 ? (
            <button
              title="Close menu"
              type="button"
              className="header-nav-close-button"
              onClick={closeMenu}
            >
              <span className="label">✕</span>
            </button>
          ) : null}

          <ul>
            <li>
              <Link href="/">.is()</Link>
            </li>
            <li>
              <Link href="/work">.work()</Link>
            </li>
            <li>
              <Link href="/about">.about()</Link>
            </li>
            <li>
              <Link href="/contact">.contact()</Link>
            </li>
            <li className="social-link">
              <a
                href="https://www.linkedin.com/in/iuridepaula/"
                title="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ico"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-labelledby="LinkedinIcoTitle"
                >
                  <title id="LinkedinIcoTitle">LinkedIn logo</title>
                  <path d="M14.8 0H1.2C.5 0 0 .5 0 1.2v13.7c0 .6.5 1.1 1.2 1.1h13.6c.7 0 1.2-.5 1.2-1.2V1.2c0-.7-.5-1.2-1.2-1.2zM4.7 13.6H2.4V6h2.4v7.6zM3.6 5c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4V9.9c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8H6.2V6h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2z" />
                </svg>
              </a>
            </li>
            <li className="social-link">
              <a href="https://github.com/iuridepaula" title="GitHub">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ico"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-labelledby="GithubIcoTitle"
                >
                  <title id="GithubIcoTitle">GitHub logo</title>
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.6 0 0 3.6 0 8c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6 0 1.3-.1 2-.1s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4C13.7 14.5 16 11.5 16 8c0-4.4-3.6-8-8-8z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

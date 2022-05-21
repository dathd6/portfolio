// style
import "../styles/app.scss";
import "../styles/nprogress.scss";
import "../styles/header.scss";
import "../styles/home.scss";
// default
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// ScrollMagic
let ScrollMagic = null;
// GSAP + ScrollMagic
if (typeof window !== "undefined") {
  ScrollMagic = require("scrollmagic");
}
import { TweenMax, TimelineMax, Power3, Elastic } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
if (typeof window !== "undefined") {
  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
}
// components
import Spine from "../components/Spine";
import Header from "../components/Header";
import BgBody from "../components/BgBody";

function MyApp({ Component, pageProps }: AppProps) {
  const [viewport, setViewPort] = useState({
    w: 0,
    h: 0,
    is568: 0 <= 568,
    is768: 0 <= 768,
    is1024: 0 <= 1024,
  });
  const introTimeline = new TimelineMax();
  const leaveTimeline = new TimelineMax();

  let routeBodyClass;
  const router = useRouter().pathname.split("/")[0];
  if (router === "") routeBodyClass = "page-home";
  else routeBodyClass = `page-${router}`;

  const updateViewport = () =>
    setViewPort({
      w: window.innerWidth,
      h: window.innerHeight,
      is568: window.innerWidth <= 568,
      is768: window.innerWidth <= 768,
      is1024: window.innerWidth <= 1024,
    });

  const enter = (el: any, done: any) => {
    // intro animations
    introTimeline
      .clear()
      .addLabel("enter", 0)
      .fromTo(
        ".header-breadcrumb",
        1,
        {},
        {
          autoAlpha: 1,
          x: 0,
          ease: Power3.easeOut,
        },
        "enter"
      )
      .fromTo(
        el,
        1,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        },
        "enter"
      )
      .fromTo(
        ".spine",
        1,
        {
          autoAlpha: 0,
          yPercent: 20,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          ease: Power3.easeOut,
          onComplete: done,
        },
        "enter"
      )
      .fromTo(
        ".spine-target .circle",
        1,
        {
          scale: 0,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          ease: Elastic.easeOut.config(1, 0.5),
        },
        "enter+=.7"
      )
      .fromTo(
        ".spine-target .circle",
        2,
        {
          backgroundColor: "transparent",
        },
        {
          backgroundColor: "#5918df",
        },
        "enter+=1.2"
      )
      .fromTo(
        ".spine-target .pulse",
        4,
        {
          autoAlpha: 1,
          scale: 0,
        },
        {
          autoAlpha: 0,
          scale: 8,
          ease: Power3.easeOut,
        },
        "enter+=1.2"
      );
  };

  const leave = (el: any, done: any) => {
    // leave animations
    leaveTimeline
      .clear()
      .addLabel("leave", 0)
      .to(
        ".spine-target .circle, .spine-target .pulse",
        0.5,
        {
          scale: 0,
          autoAlpha: 0,
          ease: Power3.easeIn,
        },
        "leave"
      )
      .to(
        ".spine",
        0.5,
        {
          autoAlpha: 0,
          yPercent: 50,
          ease: Power3.easeIn,
        },
        "leave+=.25"
      )
      .set(".header-breadcrumb", { autoAlpha: 0 }, "leave")
      .to(
        el,
        1,
        {
          autoAlpha: 0,
          onComplete: done,
        },
        "leave"
      );
  };

  useEffect(() => {
    // update viewport
    updateViewport();
    // add resize listener
    window.addEventListener("resize", updateViewport);
    // add beforeunload listener, in case of refresh
    window.addEventListener("beforeunload", () => window.scroll(0, 0));
    //
    enter("#home", () => {});
    return () => {
      leave("#home", () => {});
    };
  }, []);

  return (
    <div id="app" className={routeBodyClass}>
      <BgBody />
      <Header viewport={viewport} />
      <Component {...pageProps} />
      <Spine />
    </div>
  );
}

export default MyApp;

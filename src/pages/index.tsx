import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  TweenMax,
  TimelineMax,
  TweenLite,
  Power1,
  Power3,
  Power2,
  Power0,
} from "gsap";
// ScrollMagic
let scroller: any = null;
let ScrollMagic: any = null;
if (typeof window !== "undefined") {
  ScrollMagic = require("scrollmagic");
  scroller = new ScrollMagic.Controller();
}
// components
import Intro from "../components/Home/Intro";
import Titles from "../components/Home/Titles";
import { useStore } from "./_app";
//    import Biz from "../components/Home/Biz.vue";
//    import EarlyDays from "../components/Home/EarlyDays.vue";
//    import SuperMario from "../components/Home/SuperMario.vue";
//    import Ghibli from "../components/Home/Ghibli.vue";
//    import Wrapper from "../components/Home/Wrapper.vue";
//    import Thanks from "../components/Home/Thanks.vue";
//    // loop animations (depend on each scene!!!)
//    // ..TODO improve
//    import BizBiz from "../ts/abiz";
//    import BizAstro from "../ts/astro";
//    import BizCoffee from "../ts/coffee";
//    import BizET from "../ts/et";
//    import BizDino from "../ts/dino";
//    import BizFilomena from "../ts/filomena";
//    import BizOcto from "../ts/octo";
//    import BizZen from "../ts/zen";
//    import BizShapes from "../ts/shapes";
//    import Potion from "../ts/potion";
//    import Pepe from "../ts/pepe";
//    import Mario from "../ts/mario";
//import Castle from "../ts/ghibli";

const Home: NextPage = () => {
  const intro = new TimelineMax();
  const viewport = useStore((state) => state.viewport);
  const [timeLines, setTimeLines] = useState<any[]>([]);
  const [scenes, setScenes] = useState<any[]>([]);
  const [tweeners, setTweeners] = useState<any[]>([]);

  const playIntro = () => {
    /**
     * @desc
     * intro scene
     */
    intro
      .addLabel("enter", 1)
      .fromTo(
        "#intro .title",
        2,
        {
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
        },
        {
          autoAlpha: 1,
          rotationX: 0,
          ease: Power3.easeOut,
        },
        "enter"
      )
      .fromTo(
        "#intro .std",
        2,
        {
          autoAlpha: 0,
          x: -32,
        },
        {
          autoAlpha: 1,
          x: 0,
          ease: Power3.easeOut,
        },
        "enter+=1.5"
      );
  };

  const setupScenes = () => {
    /**
     * @desc
     * Where the magic happens
     *
     * add tweeners to the scenes,
     * then to the ScrollMagic controller,
     * and then the tweeners will tween the time lines.
     *
     * This way I can synchronize scenes to the HTML content
     * and keep the momentum effect on all browsers
     */
    const scenesElements = document.querySelectorAll(".scene");
    //@ts-ignore
    for (let [i, scenesElement] of Array.from(scenesElements).entries()) {
      // console.log(i, scenesElements, viewport);
      console.log(viewport);
      // tweeners, to animate the time lines' progress, to add momentum
      tweeners[i] = new TimelineMax();
      // time lines
      timeLines[i] = new TimelineMax({ paused: true });
      // create scenes on ScrollMagic
      scenes[i] = new ScrollMagic.Scene({
        // trigger on the scene element
        triggerElement: scenesElement,
        // start half screen before
        offset: -viewport.h / 2,
        // lasts for the scene element height
        duration: scenesElement.offsetHeight,
      })
        .setTween(tweeners[i])
        .addTo(scroller)
        .reverse(true)
        .setClassToggle(scenesElement, "active");
      // animate the progress in the time lines
      tweeners[i]
        .to(scenesElement, 1, { autoAlpha: 1 }) // fake, just to have some progress
        .eventCallback("onUpdate", (_: any) => {
          TweenLite.to(timeLines[i], 0.5, {
            progress: tweeners[i].progress(),
            ease: Power0.easeNone,
          });
        });
    }
  };

  const sceneCurriculumVitae = () => {
    /**
     * @desc
     * Scrolling animations time lines
     */
    // CurriculumVitae()
    timeLines[0]
      .set("#curriculum .title-container", { autoAlpha: 1 }) // show animations
      .addLabel("start", 0)
      .fromTo(
        "#curriculum .title",
        2,
        {
          yPercent: -50,
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          rotationX: 0,
          transformOrigin: 0,
          ease: Power3.easeOut,
        },
        "start"
      )
      .fromTo(
        "#curriculum .std",
        2,
        {
          yPercent: 50,
          autoAlpha: 0,
          rotationX: -90,
          transformOrigin: "50% 50% -100px",
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          rotationX: 0,
          transformOrigin: 0,
          ease: Power3.easeOut,
        },
        "start"
      )
      .to("#curriculum .title, #curriculum .std", 2, {
        autoAlpha: 1,
        yPercent: -100,
      });
  };

  useEffect(() => {
    /**
     * @TODO code split animations
     *       optimize code
     *       better Mario commands
     */

    // 01. play Intro
    playIntro();
    // 02. setup time lines and scenes
    setupScenes();
    // 05. Animate every scene on scroll
    sceneCurriculumVitae();
  }, []);

  return (
    <div id="home" className="wrapper">
      <Intro />

      <div className="gap"></div>

      <Titles scene="curriculum">
        {viewport.is768 ? (
          <h1 className="title" v-if="viewport.is768">
            Curriculum
            <br />
            .vitae<span className="params">'/.*$/g'</span>
          </h1>
        ) : (
          <h1 className="title">
            CurriculumVitae<span className="params">'/.*$/g'</span>
          </h1>
        )}
        <div className="std">
          <p className="-gray">&lt;A life+work showcase&gt;</p>
        </div>
      </Titles>
    </div>
  );
};

export default Home;

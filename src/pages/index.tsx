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
import Biz from "../components/Home/Biz";
// loop animations (depend on each scene!!!)
// @TODO improve
import { abiz } from "../utils/abiz";
//import BizAstro from "../utils/astro";
//import BizCoffee from "../utils/coffee";
//import BizET from "../utils/et";
//import BizDino from "../utils/dino";
//import BizFilomena from "../utils/filomena";
//import BizOcto from "../utils/octo";
//import BizZen from "../utils/zen";
//import BizShapes from "../utils/shapes";
//import Potion from "../utils/potion";
//import Pepe from "../utils/pepe";
//import Mario from "../utils/mario";
//import Castle from "../utils/ghibli";
// zustand
import { useStore } from "./_app";

const Home: NextPage = () => {
  const BizBiz = abiz();
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

  const hookLoops = () => {
    /**
     * @desc
     * play and stop loop animations
     * based on the scenes been played
     */
    scenes[0].on("enter", (e) => {
      if (e.scrollDirection === "FORWARD") {
      }
      if (e.scrollDirection === "REVERSE") {
        BizBiz.stop();
        //BizShapes.stop();
      }
    });
    scenes[1].on("enter", (e) => {
      if (e.scrollDirection === "FORWARD") {
        BizBiz.play();
        //BizShapes.play();
      }
      if (e.scrollDirection === "REVERSE") {
        //BizZen.stop();
      }
    });
    scenes[2].on("enter", (e) => {
      if (e.scrollDirection === "FORWARD") {
        //   BizZen.play();
      }
      if (e.scrollDirection === "REVERSE") {
        BizBiz.play();
        // BizShapes.play();
        // BizFilomena.stop();
        // BizDino.stop();
        // BizET.stop();
        // BizOcto.stop();
        // BizAstro.stop();
        // BizCoffee.stop();
      }
    });
    scenes[3].on("enter", (e) => {
      if (e.scrollDirection === "FORWARD") {
        BizBiz.stop();
        //BizShapes.stop();
        //BizFilomena.play();
        //BizDino.play();
        //BizET.play();
        //BizOcto.play();
        //BizAstro.play();
        //BizCoffee.play();
      }
      if (e.scrollDirection === "REVERSE") {
        //BizZen.play();
      }
    });
    //scenes[4].on("enter", (e) => {
    //  if (e.scrollDirection === "FORWARD") {
    //    BizZen.stop();
    //  }
    //  if (e.scrollDirection === "REVERSE") {
    //    BizFilomena.play();
    //    BizDino.play();
    //    BizET.play();
    //    BizOcto.play();
    //  }
    //});
    // scenes[5].on("enter", (e) => {
    //   if (e.scrollDirection === "FORWARD") {
    //     BizFilomena.stop();
    //     BizDino.stop();
    //     BizET.stop();
    //     BizOcto.stop();
    //   }
    //   if (e.scrollDirection === "REVERSE") {
    //     BizAstro.play();
    //     BizCoffee.play();
    //     Pepe.stop();
    //   }
    // });
    // scenes[6].on("enter", (e) => {
    //   if (e.scrollDirection === "FORWARD") {
    //     BizAstro.stop();
    //     BizCoffee.stop();
    //     Pepe.play();
    //   }
    //   if (e.scrollDirection === "REVERSE") {
    //   }
    // });
    // 7
    // 8
    //scenes[9]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            Pepe.play();
    //            // release mario body lock and remove bg
    //            document.body.classList.remove('-mario-lock', '-mario-bg');
    //        }
    //    });
    //scenes[10] /** @Mario **/
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            Pepe.stop();
    //            // mario bg is added inside mario.js
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            // add bg just in case
    //            document.body.classList.add('-mario-bg');
    //        }
    //    })
    //    .on('leave', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            Castle.stop();
    //        }
    //    });
    //scenes[11]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            Castle.play();
    //            // release mario body lock
    //            document.body.classList.remove('-mario-lock');
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //        }
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //scenes[12]
    //    .on('enter', (e) => {
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //scenes[13]
    //    .on('enter', (e) => {
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //scenes[14]
    //    .on('enter', (e) => {
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //scenes[15]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            // remove bg
    //            document.body.classList.remove('-mario-bg');
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            Castle.play();
    //            Potion.stop();
    //        }
    //    })
    //    .on('leave', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            // add bg
    //            document.body.classList.add('-mario-bg');
    //        }
    //    });
    //;
    //scenes[16]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            Castle.stop();
    //            Potion.play();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //        }
    //    });
  };

  const buildLoops = () => {
    /**
     * @desc
     * mount loop animations
     */
    BizBiz.build();
    //BizAstro.build();
    //BizCoffee.build();
    //BizDino.build();
    ////Castle.build();
    //Potion.build();
    //BizShapes.build();
    //if (viewport.is568) {
    //  // Castle.build568();
    //} else {
    //  //Castle.build();
    //}
    //if (viewport.is568) {
    //  Pepe.build568();
    //} else if (viewport.is1024) {
    //  Pepe.build1024();
    //} else {
    //  Pepe.build();
    //}
    //if (!viewport.is1024) {
    //  BizFilomena.build();
    //  BizOcto.build();
    //}
    //if (!viewport.is768) BizET.build();
    //if (!viewport.is568) BizZen.build();
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
    // 03. build loop animations for each character
    buildLoops();
    // 04. Hook loops to ScrollMagic Scenes
    hookLoops();
    // 05. Animate every scene on scroll
    // 05. Animate every scene on scroll
    sceneCurriculumVitae();
  }, []);

  return (
    <div id="home" className="wrapper">
      <Intro />

      <div className="gap"></div>

      <Titles scene="curriculum">
        {viewport.is768 ? (
          <h1 className="title">
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
      <Biz />
      <div className="gap"></div>
    </div>
  );
};

export default Home;

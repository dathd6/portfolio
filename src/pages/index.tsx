import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { TweenMax, TimelineMax, TweenLite, Power1, Power3, Power2 } from "gsap";
// ScrollMagic
let scroller: any = null;
let ScrollMagic: any = null;
if (typeof window !== "undefined") {
  ScrollMagic = require("scrollmagic");
  new ScrollMagic.Controller();
}
// components
import Intro from "../components/Home/Intro";
import Titles from "../components/Home/Titles";
import { Context } from "./_app";
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
  const { viewport } = useContext(Context);
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
      .from(
        "#intro .title",
        2,
        {
          autoAlpha: 0,
          rotationX: 90,
          transformOrigin: "50% 50% -100px",
          ease: Power3.easeOut,
        },
        "enter"
      )
      .from(
        "#intro .std",
        2,
        {
          autoAlpha: 0,
          x: -32,
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

  const buildLoops = () => {
    /**
     * @desc
     * mount loop animations
     */
    //  BizBiz.build();
    //  BizAstro.build();
    //  BizCoffee.build();
    //  BizDino.build();
    //  //Castle.build();
    //  Potion.build();
    //  BizShapes.build();
    //  if (this.viewport.is568) {
    //      //Castle.build568();
    //  } else {
    //      //Castle.build();
    //  }
    //  if (this.viewport.is568) {
    //      Pepe.build568();
    //  } else if (this.viewport.is1024) {
    //      Pepe.build1024();
    //  } else {
    //      Pepe.build();
    //  }
    //  if (!this.viewport.is1024) {
    //      BizFilomena.build();
    //      BizOcto.build();
    //  }
    //  if (!this.viewport.is768) BizET.build();
    //  if (!this.viewport.is568) BizZen.build();
  };

  const hookLoops = () => {
    /**
     * @desc
     * play and stop loop animations
     * based on the scenes been played
     */
    //this.scenes[0]
    //    .on('enter', (e: any) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            BizBiz.stop();
    //            BizShapes.stop();
    //        }
    //    });
    //this.scenes[1]
    //    .on('enter', (e: any) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            BizBiz.play();
    //            BizShapes.play();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            BizZen.stop();
    //        }
    //    });
    //this.scenes[2]
    //    .on('enter', (e: any) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            BizZen.play();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            BizBiz.play();
    //            BizShapes.play();
    //            BizFilomena.stop();
    //            BizDino.stop();
    //            BizET.stop();
    //            BizOcto.stop();
    //            BizAstro.stop();
    //            BizCoffee.stop();
    //        }
    //    });
    //this.scenes[3]
    //    .on('enter', (e: any) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            BizBiz.stop();
    //            BizShapes.stop();
    //            BizFilomena.play();
    //            BizDino.play();
    //            BizET.play();
    //            BizOcto.play();
    //            BizAstro.play();
    //            BizCoffee.play();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            BizZen.play();
    //        }
    //    });
    //this.scenes[4]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            BizZen.stop();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            BizFilomena.play();
    //            BizDino.play();
    //            BizET.play();
    //            BizOcto.play();
    //        }
    //    });
    //this.scenes[5]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            BizFilomena.stop();
    //            BizDino.stop();
    //            BizET.stop();
    //            BizOcto.stop();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            BizAstro.play();
    //            BizCoffee.play();
    //            Pepe.stop();
    //        }
    //    });
    //this.scenes[6]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            BizAstro.stop();
    //            BizCoffee.stop();
    //            Pepe.play();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //        }
    //    });
    //// 7
    //// 8
    //this.scenes[9]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            Pepe.play();
    //            // release mario body lock and remove bg
    //            document.body.classList.remove('-mario-lock', '-mario-bg');
    //        }
    //    });
    //this.scenes[10] /** @Mario **/
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
    //            //Castle.stop();
    //        }
    //    });
    //this.scenes[11]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            //Castle.play();
    //            // release mario body lock
    //            document.body.classList.remove('-mario-lock');
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //        }
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //this.scenes[12]
    //    .on('enter', (e) => {
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //this.scenes[13]
    //    .on('enter', (e) => {
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //this.scenes[14]
    //    .on('enter', (e) => {
    //        // add bg just in case in both directions
    //        document.body.classList.add('-mario-bg');
    //    });
    //this.scenes[15]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            // remove bg
    //            document.body.classList.remove('-mario-bg');
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //            //Castle.play();
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
    //this.scenes[16]
    //    .on('enter', (e) => {
    //        if (e.scrollDirection === 'FORWARD') {
    //            //Castle.stop();
    //            Potion.play();
    //        }
    //        if (e.scrollDirection === 'REVERSE') {
    //        }
    //    });
  };

  const sceneCurriculumVitae = () => {
    /**
     * @desc
     * Scrolling animations time lines
     */
    // CurriculumVitae()
    //timeLines[0]
    //  .set("#curriculum .title-container", { autoAlpha: 1 }) // show animations
    //  .addLabel("start", 0)
    //  .from(
    //    "#curriculum .title",
    //    2,
    //    {
    //      yPercent: -50,
    //      autoAlpha: 0,
    //      rotationX: 90,
    //      transformOrigin: "50% 50% -100px",
    //      ease: Power3.easeOut,
    //    },
    //    "start"
    //  )
    //  .from(
    //    "#curriculum .std",
    //    2,
    //    {
    //      yPercent: 50,
    //      autoAlpha: 0,
    //      rotationX: -90,
    //      transformOrigin: "50% 50% -100px",
    //      ease: Power3.easeOut,
    //    },
    //    "start"
    //  )
    //  .to("#curriculum .title, #curriculum .std", 2, {
    //    autoAlpha: 0,
    //    yPercent: -100,
    //  });
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
    sceneCurriculumVitae();
  }, []);

  return (
    <div id="home" className="wrapper">
      <Intro />

      <div className="gap"></div>

      <Titles scene="curriculum">
        <h1 className="title" v-if="viewport.is768">
          Curriculum
          <br />
          .vitae<span className="params">'/.*$/g'</span>
        </h1>
        <h1 className="title" v-else>
          CurriculumVitae<span className="params">'/.*$/g'</span>
        </h1>
        <div className="std">
          <p className="-gray">&lt;A life+work showcase&gt;</p>
        </div>
      </Titles>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import { TweenMax, TimelineMax, TweenLite, Power1, Power3, Power2 } from "gsap";
// ScrollMagic
import * as ScrollMagic from "scrollmagic";
// components
import Intro from "../components/Home/Intro";
import Titles from "../components/Home/Titles";
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

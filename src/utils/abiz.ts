import { TweenMax, TimelineMax, Power2 } from "gsap";

/**
 * @loop
 * A biz
 */
export const abiz = () => {
  const tl = new TimelineMax({ paused: true });
  return {
    build: () => {
      tl.addLabel("start", 0)
        .to(
          ".abiz-head",
          2,
          {
            transformOrigin: "50% 75%",
            scale: 1.05,
            yPercent: -5,
            ease: Power2.easeInOut,
            repeat: -1,
            yoyo: true,
          },
          "start"
        )
        .to(
          ".abiz-r-arm, .abiz-l-arm",
          1.5,
          {
            rotationZ: 5,
            transformOrigin: "90% 0%",
            repeat: -1,
            yoyo: true,
            ease: Power2.easeInOut,
          },
          "start"
        )
        .to("#magento", 2, {
          yPercent: -20,
          repeat: -1,
          yoyo: true,
          ease: Power2.easeOut,
        })
        .to(
          ".abiz-magento-s",
          2,
          {
            scale: 0.7,
            autoAlpha: 0.5,
            repeat: -1,
            yoyo: true,
            ease: Power2.easeOut,
          },
          "-=2"
        );
    },
    play: () => {
      if (tl !== null) tl.play(0, false);
    },
    stop: () => {
      if (tl !== null) tl.pause(0, false);
    },
  };
};

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  featuresCarouselMediaByIndex,
  featuresCarouselTextByIndex,
} from "../../lib/FeatureCarouselMedia";
import styles from "/styles/common/FeaturesCarousel.module.scss";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const numberWithinRange = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

export const FeaturesCarouselComponent = ({ theme }: any) => {
  const autoplay = useRef(Autoplay({ delay: 10000, stopOnInteraction: false }));

  const [viewportRef, embla] = useEmblaCarousel(
    {
      loop: false,
      skipSnaps: false,
      startIndex: 0,
      axis: "x",
    },
    [autoplay.current]
  );

  const SLIDE_COUNT = 6;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  const [scaleValues, setScaleValues] = useState([0, 0, 0]);
  const SCALE_FACTOR = 1;

  const onScroll = useCallback(() => {
    if (!embla) return;

    const engine = embla.internalEngine();
    const scrollProgress = embla.scrollProgress();

    const embla_styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target().get();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const scale = 1 - Math.abs(diffToTarget * SCALE_FACTOR);
      return numberWithinRange(scale, 0, 1);
    });
    setScaleValues(embla_styles);
  }, [embla, setScaleValues]);

  useEffect(() => {
    if (!embla) return;
    onScroll();
    embla.on("scroll", onScroll);
    embla.on("resize", onScroll);
  }, [embla, onScroll]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla_viewport} ref={viewportRef}>
        <div className={styles.embla_container}>
          {slides.map((index: number) => {
            return (
              <div className={styles.embla_slide} key={index}>
                <div
                  className={styles.embla_slide_inner}
                  style={{ transform: `scale(${scaleValues[index]})` }}
                >
                  <div className={styles.embla_slide_text}>
                    <h2 className={styles.title}>
                      {/* {featuresCarouselTextByIndex(index).title} */}
                    </h2>
                    <p className={styles.subtitle}>
                      {/* {featuresCarouselTextByIndex(index).subtitle} */}
                    </p>
                  </div>
                  <div className={styles.embla_slide_img_container}>
                    <Image
                      className={styles.embla_slide_img}
                      src={featuresCarouselMediaByIndex(index)}
                      layout="fill"
                      alt={`image ${index} in carousel`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.embla_gradient} />
      </div>
    </div>
  );
};

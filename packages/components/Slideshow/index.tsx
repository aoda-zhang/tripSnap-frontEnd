import classNames from 'classnames';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { FC, ReactNode, useMemo } from 'react';

import styles from './index.module.css';

interface SideShowProps {
  isAutoPlay?: boolean;
  images: (string | ReactNode)[];
  containerClassName?: string;
}

const SideShow: FC<SideShowProps> = ({
  isAutoPlay = false,
  images,
  containerClassName,
}) => {
  const autoplayPlugin = useMemo(() => {
    return isAutoPlay ? Autoplay({ delay: 3000 }) : undefined;
  }, [isAutoPlay]);

  const [emblaRef] = useEmblaCarousel(
    { loop: isAutoPlay },
    autoplayPlugin ? [autoplayPlugin] : [],
  );

  return (
    <div
      className={classNames([styles.sideShow, containerClassName])}
      ref={emblaRef}
    >
      <div className={styles.container}>
        {images.map((img, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={styles.imgBox} key={index}>
            {typeof img === 'string' ? (
              <img
                src={img}
                alt={`slide-${index}`}
                className={styles.sideImg}
              />
            ) : (
              img
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideShow;

import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

export default function ImageWithSkeleton({ imgSrc, title = "", className = "" }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => setLoading(false);
  }, [imgSrc]);

  return (
    <div>
      {loading && (
        <div>
          <Skeleton.Image active={loading} className={className} />
        </div>
      )}
      {!loading && (
        <LazyLoad once resize={true}>
          <img loading="lazy" src={imgSrc} alt="login" title={title} className={className} />
        </LazyLoad>
      )}
    </div>
  );
}

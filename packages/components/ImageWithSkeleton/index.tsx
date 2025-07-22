import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

interface ImageWithSkeletonProps {
  imgSrc: string;
  title?: string;
  className?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  imgSrc,
  title = '',
  className = '',
}) => {
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
          <Skeleton variant="rectangular" className={className} />
        </div>
      )}
      {!loading && (
        <LazyLoad once resize>
          <img
            loading="lazy"
            src={imgSrc}
            alt="login"
            title={title}
            className={className}
          />
        </LazyLoad>
      )}
    </div>
  );
};

export default ImageWithSkeleton;

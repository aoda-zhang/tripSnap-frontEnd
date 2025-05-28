import { Loader } from 'lucide-react';

import styles from './index.module.css';

const SuspenseFallback = () => {
  return (
    <div className={styles.fallback}>
      <Loader color="#1976d2" size={30} />
    </div>
  );
};

export default SuspenseFallback;

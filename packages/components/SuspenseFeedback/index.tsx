import { Loader } from 'lucide-react';
import { FC, memo } from 'react';

import styles from './index.module.css';

const SuspenseFeedback: FC = () => {
  return (
    <div className={styles.feedback}>
      <Loader color="#1976d2" size={30} />
    </div>
  );
};

export default memo(SuspenseFeedback);

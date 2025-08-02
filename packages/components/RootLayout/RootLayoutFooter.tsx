import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import styles from './index.module.css';

const RootLayoutFooter = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.footer}>
      {t('common.brand')} ©{dayjs().year()}
    </div>
  );
};

export default RootLayoutFooter;

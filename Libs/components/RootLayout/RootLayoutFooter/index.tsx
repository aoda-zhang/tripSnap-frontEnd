import dayjs from 'dayjs';
import { TFunction } from 'i18next';

import styles from '../index.module.css';

const RootLayoutFooter = ({
  t,
}: {
  t: TFunction<'translation', undefined>;
}) => (
  <div className={styles.footer}>
    {t('common.brand')} ©{dayjs().year()}
  </div>
);

export default RootLayoutFooter;

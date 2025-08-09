import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import myPersonal from '../../constants/myPerson';

import styles from './index.module.css';

const RootLayoutFooter = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.footer}>
      <p className={styles.items}>
        <span className={styles.title}>{t('common.quick_links')}</span>
        <Link className={styles.link} to="/">
          {t('home.home_page')}
        </Link>
        <Link className={styles.link} to="/trip/basic">
          {t('common.record')}
        </Link>
      </p>
      <p dangerouslySetInnerHTML={{ __html: t('common.owner_text') }} />
      <p className={styles.items}>
        <span className={styles.title}>{t('common.contact_me')}</span>
        <a href={myPersonal.github} className={styles.link} target="_black">
          {t('common.github')}
        </a>
        <a href={myPersonal.email} className={styles.link} target="_black">
          {t('common.email')}
        </a>
        <a href={myPersonal.linkedin} className={styles.link} target="_black">
          {t('common.linkedin')}
        </a>
      </p>
    </div>
  );
};

export default RootLayoutFooter;

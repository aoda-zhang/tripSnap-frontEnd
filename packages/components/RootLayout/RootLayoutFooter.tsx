import { useTranslation } from 'react-i18next';

import myPersonal from '../../constants/myPerson';

import styles from './index.module.css';

const RootLayoutFooter = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.footer}>
      <div className={styles.items}>
        <div>
          <div className={styles.title}>{t('common.quick_links')}</div>
          <p>{t('home.home_page')}</p>
          <p>{t('common.record')}</p>
        </div>
        <div className={styles.contact}>
          <h3 className={styles.title}>{t('common.contact_me')}</h3>
          <ul>
            <li>
              <a href={myPersonal.email} target="_black">
                {t('common.email')}
              </a>
            </li>
            <li>
              <a href={myPersonal.github} target="_black">
                {t('common.github')}
              </a>
            </li>
            <li>
              <a href={myPersonal.linkedin} target="_black">
                {t('common.linkedin')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.owner}>{t('common.owner_text')}</p>
    </div>
  );
};

export default RootLayoutFooter;

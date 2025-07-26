import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import systemError from '../../assets/images/sysError.svg';

import styles from './index.module.css';

const NotFund = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.error}>
      <img src={systemError} alt="" className={styles.errorImage} />
      <p>{t('common.not_found')}</p>
      <p>{t('common.not_found_info')}</p>
      <Button
        type="button"
        variant="contained"
        onClick={goToHome}
        className={styles.goToHome}
      >
        {t('common.go_to_home')}
      </Button>
    </div>
  );
};
export default NotFund;

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { ChevronDown, Globe } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import StorageKeys from '../../constants/storageKeys';
import storageTool from '../../utils/storage';

import styles from './index.module.css';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
  },
}));

const LanguageSelect = () => {
  const { i18n, t } = useTranslation();
  const supportedLanguages =
    useMemo(() => {
      return Object.keys(i18n.services.resourceStore.data);
    }, [i18n.services.resourceStore.data]) ?? [];
  const setLanguage = (language: string) => {
    storageTool.set(StorageKeys.I18NKEY, language);
    i18n.changeLanguage(language);
  };
  return (
    <div className={styles.languageSelect}>
      {supportedLanguages?.map((item) => (
        <button
          key={item}
          className={styles.item}
          onClick={() => setLanguage(item)}
          type="button"
        >
          {t(`common.${item}`)}
        </button>
      ))}
    </div>
  );
};

const LangSwitcher = () => {
  const { i18n, t } = useTranslation();
  return (
    <BootstrapTooltip title={<LanguageSelect />}>
      <div className={styles.lang}>
        <Globe />
        {t(`common.${i18n.language}`)}
        <ChevronDown size={26} />
      </div>
    </BootstrapTooltip>
  );
};
export default memo(LangSwitcher);

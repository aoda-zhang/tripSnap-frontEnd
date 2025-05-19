import { type FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@mui/material';
import storage from '@/shared/utils/storage';
import globalStore from '@/store/globalStore';
import StorageKeys from '@/typings/storage.types';

import envConfig from '@/config';
import ImageWithSkeleton from '@/shared/components/ImageWithSkeleton';
import LangSwitcher from '@/shared/components/LangSwitcher';
import style from './index.module.scss';
import { AuthAPI } from '@/apis';
import FormInput from '@/shared/components/Form/FormInput';

const Login: FC = () => {
  const formProps = useForm({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUserInfo } = globalStore();
  const { mutate, isLoading } = useMutation(AuthAPI.login, {
    onSuccess: (loginInfo) => {
      if (loginInfo?.accessToken && loginInfo?.refreshToken) {
        storage.set(StorageKeys.accessToken, loginInfo?.accessToken);
        storage.set(StorageKeys.refreshToken, loginInfo?.refreshToken);
        setUserInfo(loginInfo?.baseUserInfo);
        navigate('/trip/step1');
      }
    },
  });
  return (
    <div className={style.loginBox}>
      <div className={style.welcomeBanner}>
        <ImageWithSkeleton
          imgSrc={envConfig?.login?.loginBannerURL}
          title={t('login.welcome')}
          className={style.loginBG}
        />
      </div>

      <div className={style.loginForm}>
        <div className={style.welcome}>
          <span className={style.text}>{t('login.welcome')}</span>
          <LangSwitcher />
        </div>
        <FormProvider {...formProps}>
          <form>
            <FormInput
              variant="outlined"
              size="small"
              className={style.baseForm}
              label={t('login.userName')}
              name="userName"
            />
            <FormInput
              type="password"
              variant="outlined"
              size="small"
              label={t('login.password')}
              name="password"
            />
            <Button
              disabled={isLoading}
              type="submit"
              className={style.submitBtn}
              variant="contained"
              onClick={formProps.handleSubmit((data) => {
                mutate({
                  userName: data.userName,
                  password: data.password,
                });
              })}
            >
              {t('login.primary_login')}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
export default memo(Login);

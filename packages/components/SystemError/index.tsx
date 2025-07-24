import { Trans } from 'react-i18next';

const SystemError = () => {
  return (
    <Trans
      i18nKey="common.sys_error"
      components={{
        1: <p />,
        2: <p />,
        3: <p />,
        5: <a href="/">Home</a>,
      }}
    />
  );
};

export default SystemError;

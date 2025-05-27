import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useUserRegister } from '../queries';

import style from './index.module.scss';

import { AuthFieldType } from '@/typings/auth.types';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate } = useUserRegister(navigate);

  return (
    <div className={style.register}>
      <img
        src="https://s1.locimg.com/2024/08/03/fa988a7907564.png"
        alt=""
        className={style.icon}
      />
      <Form
        className={style.form}
        name="login"
        onFinish={(value) => {
          mutate(value);
        }}
        autoComplete="off"
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: '请输入注册账户名' }]}
        >
          <Input placeholder={t('login.userName')} />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="password"
          rules={[{ required: true, message: '请输入注册密码' }]}
        >
          <Input.Password placeholder={t('login.password')} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={style.submitBtn}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;

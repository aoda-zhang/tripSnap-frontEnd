import { Button, Form, Input, message } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import storage from "@/shared/utils/storage";
import type { AuthFieldType } from "@/typings/auth.types";
import StorageKeys from "@/typings/storage.types";

import authAPI from "../apis";

import style from "./index.module.scss";

const Register: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate } = useMutation(authAPI.register, {
    onSuccess: async (isRegrester, value) => {
      if (isRegrester) {
        const loginInfo = await authAPI.login({
          userName: value?.userName,
          password: value?.password,
        });
        await storage.set(StorageKeys.accessToken, loginInfo.accessToken);
        await storage.set(StorageKeys.refreshToken, loginInfo.refreshToken);
        navigate("/trip");
      }
    },
    onError: (error) => {
      message.error(`注册失败:${error}`);
    },
  });
  return (
    <div className={style.register}>
      <img src="https://s1.locimg.com/2024/08/03/fa988a7907564.png" alt="" className={style.icon} />
      <Form
        className={style.form}
        name="login"
        onFinish={(value) => {
          mutate(value);
        }}
        autoComplete="off"
      >
        <Form.Item<AuthFieldType> name="userName" rules={[{ required: true, message: "请输入注册账户名" }]}>
          <Input placeholder={t("login.userName")} />
        </Form.Item>

        <Form.Item<AuthFieldType> name="password" rules={[{ required: true, message: "请输入注册密码" }]}>
          <Input.Password placeholder={t("login.password")} />
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

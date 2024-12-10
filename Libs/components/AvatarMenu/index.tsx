import { Avatar, Divider, Dropdown, type MenuProps, Modal } from "antd";
import { type FC, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSettings } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import storageTool from "@/shared/utils/storage";

import styles from "./index.module.scss";
type Props = {
  userInfo: {
    userName: string;
    [key: string]: unknown;
  };
};

const AvatarMenu: FC<Props> = ({ userInfo }) => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOepn] = useState(false);
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "setting",
      icon: <CiSettings className={styles.item} />,
      label: <span className={styles.item}>{t("common.setting")}</span>,
      onClick: () => {
        setModalOepn(true);
      },
    },
    {
      type: "divider",
      key: "divider",
    },
    {
      key: "loginOut",
      icon: <IoLogInOutline className={styles.item} />,
      label: <span className={styles.item}>{t("login.logout")}</span>,
      onClick: () => {
        storageTool.clearAll();
        navigate("/login");
      },
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click", "hover"]}>
        <Avatar size="large" className={styles.avatar}>
          {userInfo?.userName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </Dropdown>

      <Modal
        title={t("common.setting")}
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setModalOepn(false);
        }}
      >
        <Divider />
      </Modal>
    </>
  );
};
export default memo(AvatarMenu);

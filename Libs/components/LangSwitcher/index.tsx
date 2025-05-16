import China from "@/shared/assets/images/china.svg";
import USA from "@/shared/assets/images/usa.svg";
import LocaleKeys from "@/shared/constants/localeKey";
import globalStore from "@/store/globalStore";
import { Dropdown, type MenuProps, Space } from "antd";
import { memo } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import styles from "./index.module.scss";

const LangSwitcher = () => {
  const { setLocale, locale } = globalStore();
  const items: MenuProps["items"] = [
    {
      label: (
        <div className={styles.langItem}>
          <img
            style={{ width: "18px", marginRight: "8px" }}
            src={China}
            alt="China"
            title="China"
          />
          <span>简体中文</span>
        </div>
      ),
      key: LocaleKeys.zh_CN,
    },
    {
      type: "divider",
    },
    {
      label: (
        <div className={styles.langItem}>
          <img style={{ width: "18px", marginRight: "8px" }} src={USA} alt="UAS" title="USA" />
          <span>English(USA)</span>
        </div>
      ),
      key: LocaleKeys.en_US,
    },
  ];
  const onSwitchLan = ({ key }) => {
    setLocale(key);
  };
  return (
    <div className={styles.lang}>
      <Dropdown
        menu={{ items, onClick: onSwitchLan }}
        trigger={["click", "hover"]}
        placement="bottom"
      >
        <Space>
          <img
            width="20px"
            className="langSwitcherIcon"
            src={locale === LocaleKeys.zh_CN ? China : USA}
            alt={locale}
            title={locale}
          />
          <IoChevronDownOutline />
        </Space>
      </Dropdown>
    </div>
  );
};
export default memo(LangSwitcher);

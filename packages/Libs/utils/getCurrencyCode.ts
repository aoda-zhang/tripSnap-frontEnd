const getCurrencyCode = (countryCode) => {
  const currencyCodes = {
    en_US: "$", // United States
    zh_CN: "¥", // China
    ja_JP: "¥", // Japan
    en_GB: "£", // United Kingdom
    de_DE: "€", // Germany (Euro)
    fr_FR: "€", // France (Euro)
    it_IT: "€", // Italy (Euro)
    es_ES: "€", // Spain (Euro)
    ko_KR: "₩", // South Korea
    ru_RU: "₽", // Russia
    in_IN: "₹", // India
    pt_BR: "R$", // Brazil
    ar_SA: "﷼", // Saudi Arabia
    tr_TR: "₺", // Turkey
    pl_PL: "zł", // Poland
    th_TH: "฿", // Thailand
    vn_VN: "₫", // Vietnam
    id_ID: "Rp", // Indonesia
    my_MY: "RM", // Malaysia
    ph_PH: "₱", // Philippines
    ch_CH: "Fr", // Switzerland
    se_SE: "kr", // Sweden
    dk_DK: "kr", // Denmark
    no_NO: "kr", // Norway
    sg_SG: "S$", // Singapore
    hk_HK: "HK$", // Hong Kong
    tw_TW: "NT$", // Taiwan
    au_AU: "A$", // Australia
    nz_NZ: "NZ$", // New Zealand
    ca_CA: "C$", // Canada
    mx_MX: "Mex$", // Mexico
    za_ZA: "R", // South Africa
    il_IL: "₪", // Israel
    ae_AE: "د.إ", // UAE
    eg_EG: "E£", // Egypt
    // Euro zone countries
    nl_NL: "€", // Netherlands
    be_BE: "€", // Belgium
    pt_PT: "€", // Portugal
    gr_GR: "€", // Greece
    ie_IE: "€", // Ireland
    at_AT: "€", // Austria
    fi_FI: "€", // Finland
    sk_SK: "€", // Slovakia
    lv_LV: "€", // Latvia
    lt_LT: "€", // Lithuania
    ee_EE: "€", // Estonia
  };

  return currencyCodes[countryCode] ?? "$";
};

export default getCurrencyCode;

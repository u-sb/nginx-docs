import { type DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <>
      <span className="nx-font-extrabold">N.WTF</span>
      <span className="nx-ml-2 nx-hidden nx-font-normal nx-text-gray-600 md:nx-inline">nginx with latest features</span>
    </>
  ),
  i18n: [],
  // project: {
  //   link: 'https://github.com/dns-sb/dns.sb'
  // },
  // TODO: remove once https://github.com/shuding/nextra/issues/1210 is fixed
  toc: {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    extraContent: <></>
  }
};

export default config;

import React from "react";
import {useLang} from "./Metronici18n";
import {IntlProvider} from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/de";
import "@formatjs/intl-relativetimeformat/dist/locale-data/es";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fr";
import "@formatjs/intl-relativetimeformat/dist/locale-data/ja";
import "@formatjs/intl-relativetimeformat/dist/locale-data/zh";
import "@formatjs/intl-relativetimeformat/dist/locale-data/vi";

import deMessages from "./messages/de";
import enMessages from "./messages/en";
import esMessages from "./messages/es";
import frMessages from "./messages/fr";
import jaMessages from "./messages/ja";
import zhMessages from "./messages/zh";
import viMessages from "./messages/vi";

const allMessages = {
  de: deMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  ja: jaMessages,
  zh: zhMessages,
  vi: viMessages
};

export function I18nProvider({ children }) {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
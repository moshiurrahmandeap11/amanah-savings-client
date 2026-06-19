import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "bn"];
const defaultLocale = "en";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = locales.includes(cookieLocale) ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../app/messages/${locale}.json`)).default,
  };
});

const { match } = require("@formatjs/intl-localematcher");
const Negotiator = require("negotiator");
const { NextResponse } = require("next/server");

let locales = ["bn", "en"];
let defaultLocale = "en";

const getLocale = (request) => {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  let headers = { "accept-language": acceptedLanguage };
  let languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
};

export const middleware = (request) => {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
};

export const config = {
  matcher: ["/((?!api|assets|.*\\..*|_next).*)"],
};

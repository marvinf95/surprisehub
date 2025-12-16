import Home from "./Home"; 
import { cookies, headers } from "next/headers";

function detectLocale() {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get("lang")?.value;

  if (cookieLocale === "de" || cookieLocale === "en") return cookieLocale;

  const acceptLang = headers().get("accept-language") || "";
  if (acceptLang.startsWith("de")) return "de";
  return "en";
}

export default function Page() {
  const lang = detectLocale();
  return <Home initialLang={lang} />;
}

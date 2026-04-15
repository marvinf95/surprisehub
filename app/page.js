import Home from "./Home.jsx"; 
import { cookies, headers } from "next/headers";

async function detectLocale() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("lang")?.value;

  if (cookieLocale === "de" || cookieLocale === "en") return cookieLocale;

  const acceptLang = (await headers()).get("accept-language") || "";
  if (acceptLang.startsWith("de")) return "de";
  return "en";
}

export default async function Page() {
  const lang = await detectLocale();
  return <Home initialLang={lang} />;
}

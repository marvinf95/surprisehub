const encode = (text) =>
  encodeURIComponent(text.toLowerCase().replace(/["']/g, ""));

export const getAmazonDomain() {
    const lang = navigator.language;

    if (lang.startsWith("de")) return "amazon.de";
    if (lang.startsWith("en-GB")) return "amazon.co.uk";
    if (lang.startsWith("us")) return "amazon.com";
    if (lang.startsWith("fr")) return "amazon.fr";
    if (lang.startsWith("it")) return "amazon.it";
    if (lang.startsWith("es")) return "amazon.es";

    return "amazon.com"; // fallback
  }

export const amazonAffiliateLink(idea) {
    const domain = getAmazonDomain();
    const query = encode(idea);

    const tags = {
      "amazon.de": "surprisehub01-21",
      "amazon.com": "surprisehub0c-20",
      "amazon.co.uk": "surprisehub0d-21",
      "amazon.fr": "surprisehub09-21",
      "amazon.it": "surprisehub0f-21",
      "amazon.es": "surprisehub04-21",
    };

    const tag = tags[domain] || tags["amazon.com"];

    return `https://www.${domain}/s?k=${query}&tag=${tag}`;
  }
const BASE_URL = 'https://surprisehub.app';

const enCategories = ['friend', 'girlfriend', 'boyfriend', 'dad', 'mom', 'birthday', 'christmas'];
const deCategories = ['freund', 'freundin', 'vater', 'mutter', 'geburtstag', 'weihnachten'];

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/gift-ideas-by-budget`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/last-minute-gift-ideas`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/geschenkidee-fuer-freund-30-euro`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/geschenkidee-fuer-freundin-geburtstag`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/geschenkidee-fuer-vater-der-alles-hat`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/personalisierte-geschenkidee`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const enCategoryPages = enCategories.map((cat) => ({
    url: `${BASE_URL}/gift-ideas/${cat}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const deCategoryPages = deCategories.map((cat) => ({
    url: `${BASE_URL}/geschenkidee/${cat}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...enCategoryPages, ...deCategoryPages];
}

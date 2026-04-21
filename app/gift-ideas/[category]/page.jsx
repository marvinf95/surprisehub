import SEOPage from '../../../components/seo/SEOPage';
import styles from './page.module.css';

const categoryContent = {
  friend: {
    title: 'Gift Ideas for Friend',
    description: 'Find the perfect gift for your friend. For every occasion and budget.',
    intro: 'Looking for a <strong>gift idea for your friend</strong>? We have inspiration for every taste – from tech lovers to outdoor enthusiasts.',
    sections: [
      {
        title: 'By Occasion',
        items: [
          'Birthday gifts for friends',
          'Christmas gifts for friends',
          'Anniversary gifts for friends',
          'Housewarming gifts for friends'
        ]
      },
      {
        title: 'By Budget',
        items: [
          'Cheap gifts for friends (under $25)',
          'Mid-range gifts for friends ($25-50)',
          'Premium gifts for friends ($100+)'
        ]
      }
    ]
  },
  girlfriend: {
    title: 'Gift Ideas for Girlfriend',
    description: 'The best gifts for your girlfriend. From beauty to experiences.',
    intro: 'A <strong>gift for your girlfriend</strong> that shows you care.',
    sections: [
      {
        title: 'Classics',
        items: [
          'Jewelry for girlfriend',
          'Perfume for girlfriend',
          'Spa day for girlfriend',
          'Handbag for girlfriend'
        ]
      },
      {
        title: 'Experiences',
        items: [
          'Brunch date',
          'Wellness weekend',
          'Concert tickets',
          'Cooking class together'
        ]
      }
    ]
  },
  boyfriend: {
    title: 'Gift Ideas for Boyfriend',
    description: 'Find the perfect gift for your boyfriend.',
    intro: 'A <strong>gift for your boyfriend</strong> that he will love.',
    sections: [
      {
        title: 'Tech',
        items: [
          'Gaming accessories',
          'Headphones for him',
          'Smart home devices',
          'Fitness tracker'
        ]
      }
    ]
  },
  dad: {
    title: 'Gift Ideas for Dad',
    description: 'The perfect gift for Dad. From tools to experiences.',
    intro: 'A <strong>gift for your dad</strong> that he will actually use.',
    sections: [
      {
        title: 'For Dad',
        items: [
          'Tools for Dad',
          'Grilling accessories',
          'Sports gear',
          'Experience gifts for Dad'
        ]
      }
    ]
  },
  mom: {
    title: 'Gift Ideas for Mom',
    description: 'Gifts for Mom that touch the heart.',
    intro: 'A <strong>gift for Mom</strong> that shows how much she means to you.',
    sections: [
      {
        title: 'For Mom',
        items: [
          'Personalized gifts for Mom',
          'Wellness gifts for Mom',
          'Cooking accessories for Mom',
          'Experience gifts for Mom'
        ]
      }
    ]
  },
  birthday: {
    title: 'Birthday Gift Ideas',
    description: 'The best birthday gifts for everyone.',
    intro: 'A <strong>birthday gift</strong> they will never forget.',
    sections: [
      {
        title: 'By Age',
        items: [
          'Gift ideas turning 18',
          'Gift ideas turning 30',
          'Gift ideas turning 40',
          'Gift ideas turning 50'
        ]
      }
    ]
  },
  christmas: {
    title: 'Christmas Gift Ideas',
    description: 'The best Christmas gifts for the whole family.',
    intro: '<strong>Christmas gifts</strong> that shine under the tree.',
    sections: [
      {
        title: 'Classics',
        items: [
          'Board games for Christmas',
          'Books for Christmas',
          'Electronics for Christmas',
          'Experiences for Christmas'
        ]
      }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(categoryContent).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const category = awaitedParams.category;
  const content = categoryContent[category];
  
  if (!content) return { title: 'Not Found' };
  
  return {
    title: content.title,
    description: content.description,
  };
}

export default async function CategoryPage({ params }) {
  const awaitedParams = await params;
  const category = awaitedParams.category;
  const content = categoryContent[category];
  
  if (!content) {
    return (
      <SEOPage locale="en">
        <h1>Page Not Found</h1>
        <p>This category does not exist.</p>
      </SEOPage>
    );
  }

  return (
    <SEOPage title={content.title} description={content.description} locale="en">
      <article className={styles.article}>
        <header className={styles.hero}>
          <h1>{content.title}</h1>
          <p className={styles.intro} dangerouslySetInnerHTML={{ __html: content.intro }} />
        </header>

        <section className={styles.content}>
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.cta}>
            <a href="/" className={styles.ctaButton}>
              Find Your Gift 🎁
            </a>
          </div>
        </section>
      </article>
    </SEOPage>
  );
}
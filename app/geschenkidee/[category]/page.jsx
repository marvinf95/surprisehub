import SEOPage from '../../../components/seo/SEOPage';
import styles from './page.module.css';

const categoryContent = {
  freund: {
    title: 'Geschenkidee für Freund',
    description: 'Finde die perfekte Geschenkidee für deinen Freund. Für jeden Anlass und jedes Budget.',
    intro: 'Du suchst eine <strong>Geschenkidee für deinen Freund</strong>? Wir haben Inspirationen für jeden Geschmack – von Technik-Fans bis Sportler.',
    sections: [
      {
        title: 'Nach Anlass',
        items: [
          'Geburtstagsgeschenk für Freund',
          'Weihnachtsgeschenk für Freund',
          'Jubiläumsgeschenk für Freund',
          'Couchgeschenk für Freund'
        ]
      },
      {
        title: 'Nach Budget',
        items: [
          'Günstige Geschenke für Freund (unter 20€)',
          'Geschenke für Freund bis 50€',
          'Premium Geschenke für Freund (über 100€)'
        ]
      },
      {
        title: 'Nach Interesse',
        items: [
          'Technik-Gadgets für Freunde',
          'Sport-Accessoires für Freunde',
          'Gaming-Geschenke für Freunde',
          'Outdoor-Ausrüstung für Freunde'
        ]
      }
    ]
  },
  freundin: {
    title: 'Geschenkidee für Freundin',
    description: 'Die schönsten Geschenke für deine beste Freundin. Von Beauty bis Erlebnisse.',
    intro: 'Eine <strong>Geschenkidee für deine Freundin</strong> zu finden ist leichter als du denkst. Wir zeigen dir die besten Optionen.',
    sections: [
      {
        title: 'Klassiker',
        items: [
          'Spa-Gutschein für Freundin',
          'Schmuck für Freundin',
          'Parfüm für Freundin',
          'Handtasche für Freundin'
        ]
      },
      {
        title: 'Erlebnisse',
        items: [
          'Brunch mit Freundin',
          'Wellness-Tag für Freundin',
          'Shopping-Tag mit Freundin',
          'Kochkurs für Freundin'
        ]
      }
    ]
  },
  vater: {
    title: 'Geschenkidee für Vater',
    description: 'Das perfekte Geschenk für Papa. Von Tools bis Erlebnisse.',
    intro: 'Ein <strong>Geschenk für deinen Vater</strong> zu finden muss nicht schwer sein. Wir haben die besten Ideen.',
    sections: [
      {
        title: 'Für Papa',
        items: [
          'Werkzeug für Väter',
          'Garten-Accessoires',
          'Grill-Zubehör',
          'Sport-Ausrüstung'
        ]
      }
    ]
  },
  mutter: {
    title: 'Geschenkidee für Mutter',
    description: 'Geschenke für Mama die berühren. Von Blumen bis personalisierte Geschenke.',
    intro: 'Ein <strong>Geschenk für deine Mutter</strong> zeigt ihr, wie sehr du sie schätzt.',
    sections: [
      {
        title: 'Für Mama',
        items: [
          'Personalisierte Geschenke für Mutter',
          'Wellness-Geschenke für Mutter',
          'Kochzubehör für Mütter',
          'Erlebnisgeschenke für Mutter'
        ]
      }
    ]
  },
  geburtstag: {
    title: 'Geburtstagsgeschenke',
    description: 'Die besten Geburtstagsgeschenke für jeden. Kreativ, persönlich, einzigartig.',
    intro: 'Ein <strong>Geburtstagsgeschenk</strong> das in Erinnerung bleibt.',
    sections: [
      {
        title: 'Nach Alter',
        items: [
          'Geschenke für 18. Geburtstag',
          'Geschenke für 30. Geburtstag',
          'Geschenke für 40. Geburtstag',
          'Geschenke für 50. Geburtstag'
        ]
      }
    ]
  },
  weihnachten: {
    title: 'Weihnachtsgeschenke',
    description: 'Die schönsten Weihnachtsgeschenke. Für die ganze Familie.',
    intro: '<strong>Weihnachtsgeschenke</strong> die unter dem Baum begeistern.',
    sections: [
      {
        title: 'Klassiker',
        items: [
          'Spiele zu Weihnachten',
          'Bücher zu Weihnachten',
          'Elektronik zu Weihnachten',
          'Erlebnisse zu Weihnachten'
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
      <SEOPage locale="de">
        <h1>Seite nicht gefunden</h1>
        <p>Diese Kategorie existiert nicht.</p>
      </SEOPage>
    );
  }

  return (
    <SEOPage title={content.title} description={content.description} locale="de">
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
              Geschenkidee finden 🎁
            </a>
          </div>
        </section>
      </article>
    </SEOPage>
  );
}
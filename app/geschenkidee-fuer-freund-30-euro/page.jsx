import SEOPage from '../../components/seo/SEOPage';
import styles from './page.module.css';

export const metadata = {
  title: 'Geschenkidee für Freund: Die besten Ideen bis 30 Euro',
  description: 'Finde kreative Geschenkideen für deinen besten Freund mit einem Budget bis 30 Euro. Von personalisierten Geschenken bis hin zu Erlebnisgeschenken.',
  keywords: ['Geschenkidee Freund 30 Euro', 'Geschenk für Freund', 'Geburtstagsgeschenk Freund', 'günstige Geschenke für Freunde', 'persönliche Geschenke'],
};

export default function GeschenkideeFreund30Euro() {
  return (
    <SEOPage title={metadata.title} description={metadata.description} locale="de">
      <article className={styles.article}>
        <header className={styles.hero}>
          <h1>Geschenkidee für Freund: Die besten Ideen bis 30 Euro</h1>
          <p className={styles.intro}>
            Du suchst eine <strong>Geschenkidee für deinen Freund</strong> mit einem Budget von 30 Euro? 
            Wir haben die besten Inspirationen gesammelt – von personalisierten Geschenken bis hin zu 
            Erlebnisgeschenken, die dein Freund nie vergessen wird.
          </p>
        </header>

        <section className={styles.content}>
          <h2>Persönliche Geschenke bis 30€</h2>
          <p>
            Ein persönliches Geschenk zeigt, dass du dir wirklich Gedanken gemacht hast. Mit einem Budget 
            von 30 Euro kannst du einzigartige Geschenke gestalten:
          </p>
          <ul>
            <li><strong>Personalisierter Schlüsselanhänger</strong> – mit Gravur seines Namens oder eines besonderen Datums</li>
            <li><strong>Foto-Collage</strong> – gerahmte Erinnerungen an gemeinsame Erlebnisse</li>
            <li><strong>Custom Spotify Playlist</strong> – mit Lieblingssongs auf einem personalisierten Player</li>
            <li><strong>Maßangefertigtes Armband</strong> – mit Koordinaten eines besonderen Ortes</li>
          </ul>

          <h2>Erlebnisgeschenke für Freunde</h2>
          <p>
            Erlebnisse sind oft wertvoller als materielle Geschenke. Mit 30 Euro könnt ihr gemeinsam:
          </p>
          <ul>
            <li><strong>Escape Room</strong> – Action und Nervenkitzel für 2 Personen</li>
            <li><strong>Topgolf oder Bowling</strong> – ein lustiger Abend zu zweit</li>
            <li><strong>Trimm-Dich-Pfad</strong> mit Picknick – outdoor Spaß für Minimalisten</li>
            <li><strong>Virtuelle Reality Session</strong> – modernes Gaming-Erlebnis</li>
          </ul>

          <h2>Geschenke nach Interessen</h2>
          <p>
            Der perfekte Griff zeigt, dass du seine Interessen kennst und schätzt:
          </p>
          <ul>
            <li><strong>Für Gamer</strong> – Merchandise seines Lieblingsspiels oder eine Gaming-Mouse</li>
            <li><strong>Für Sportler</strong> – Fitness-Tracker oder hochwertige Trinkflasche</li>
            <li><strong>Für Musikliebhaber</strong> – Vinyl seiner Lieblingsband oder Konzertkarten</li>
            <li><strong>Für Genießer</strong> – hochwertige Whisky-Probe oder eine Craft-Bier-Box</li>
          </ul>

          <h2>Noch mehr Ideen mit KI</h2>
          <p>
            Brauchst du noch mehr Inspiration? Unser KI-Geschenkefinder hilft dir, 
            <strong>personalisierte Geschenkideen</strong> zu finden, die perfekt zu deinem Freund passen.
          </p>
          <div className={styles.cta}>
            <a href="/" className={styles.ctaButton}>
              Jetzt Geschenkidee finden 🎁
            </a>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>💡 Quick-Tipps</h3>
            <ul>
              <li>Denke an gemeinsame Erinnerungen</li>
              <li>Frage seine engsten Freunde</li>
              <li>Achte auf versteckte Wünsche</li>
              <li>Ein Gutschein zeigt Initiative</li>
            </ul>
          </div>
        </aside>
      </article>
    </SEOPage>
  );
}
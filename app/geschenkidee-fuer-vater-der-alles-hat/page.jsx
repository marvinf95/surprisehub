import SEOPage from '../../components/seo/SEOPage';
import styles from './page.module.css';

export const metadata = {
  title: 'Geschenk für Vater der alles hat | Perfekte Ideen',
  description: 'Der perfekte Gegenwarts-Tipp für Väter, die angeblich alles haben. Kreative Geschenkideen, die wirklich überraschen.',
  keywords: ['Geschenk Vater alles hat', 'Geschenk für Papa', 'Vatersday Geschenk', 'besonderes Geschenk für Papa'],
};

export default function GeschenkideeVater() {
  return (
    <SEOPage title={metadata.title} description={metadata.description} locale="de">
      <article className={styles.article}>
        <header className={styles.hero}>
          <h1>Geschenk für Vater, der alles hat 🎁</h1>
          <p className={styles.intro}>
            Väter, die alles zu haben scheinen, sind die größte Herausforderung. 
            Doch mit etwas Kreativität findest du <strong>Geschenke, die berühren</strong> – 
            nicht weil sie teuer sind, sondern weil sie von Herzen kommen.
          </p>
        </header>

        <section className={styles.content}>
          <h2>Zeit statt Stuff: Die besten Erlebnisse</h2>
          <p>
            Für Väter, die "alles haben", sind Erlebnisse oft wertvoller als Gegenstände:
          </p>
          <ul>
            <li><strong>Vater-Sohn / Vater-Tochter Tag</strong> – ein ganzer Tag nur für euch zwei</li>
            <li><strong>Erstes Konzert gemeinsam</strong> – Tickets für seinen Lieblingskünstler</li>
            <li><strong>gemeinsames Kochen</strong> – ein neues Rezept als Erlebnis</li>
            <li><strong>Wanderwochenende</strong> – Natur erleben ohne Ablenkung</li>
          </ul>

          <h2>Persönliche Geschenke mit Story</h2>
          <p>
            Geschenke mit Bedeutung erzählen eine Geschichte:
          </p>
          <ul>
            <li><strong>Video-Zusammenschnitt</strong> – Grüße von Familie und Freunden</li>
            <li><strong>Familienchronik</strong> – Buch mit Fotos und Anekdoten</li>
            <li><strong>Brief-Sammlung</strong> – was er dir bedeutet hat</li>
            <li><strong>GPS-Koordinaten</strong> – Ort der wichtigsten Erinnerung</li>
          </ul>

          <h2>Kreative Lösungen für "alles haben"</h2>
          <p>
            Der Trick: Nicht dasWAS zählt, sondern das WIE:
          </p>
          <ul>
            <li><strong>Handgeschriebener Brief</strong> – statt gekauftem Kitsch</li>
            <li><strong>Tradition starten</strong> – jährliches Ritual einführen</li>
            <li><strong>Erlebnis-Wertgutschein</strong> – deine Zeit als Geschenk</li>
            <li><strong>Handwerkliche Projekte</strong> – selbstgemacht mit Stolz</li>
          </ul>

          <div className={styles.cta}>
            <a href="/" className={styles.ctaButton}>
              Mehr Geschenkideen mit KI 🎁
            </a>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>💡 Profi-Tipps</h3>
            <ul>
              <li>Frag seine Partnerin/WGF</li>
              <li>Denke an seine Kindheit</li>
              <li>Nutze seine Hobbys anders</li>
              <li>Eine Reise muss nicht weit sein</li>
            </ul>
          </div>
        </aside>
      </article>
    </SEOPage>
  );
}
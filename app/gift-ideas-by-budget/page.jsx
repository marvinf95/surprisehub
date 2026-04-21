import SEOPage from '../../components/seo/SEOPage';
import styles from './page.module.css';

export const metadata = {
  title: 'Gift Ideas by Budget | Find Perfect Gifts at Any Price',
  description: 'Find thoughtful gift ideas for every budget. From $10 to $100+, discover gifts that impress without breaking the bank.',
  keywords: ['gift ideas by budget', 'cheap gift ideas', 'affordable gifts', 'expensive gifts under 100', 'budget gifts'],
};

export default function GiftIdeasByBudget() {
  return (
    <SEOPage title={metadata.title} description={metadata.description} locale="en">
      <article className={styles.article}>
        <header className={styles.hero}>
          <h1>Gift Ideas by Budget 💰</h1>
          <p className={styles.intro}>
            Finding the <strong>perfect gift</strong> shouldn't mean going broke. 
            From impulse purchases to investment pieces – we've organized the best 
            gift ideas by budget so you can celebrate every occasion with confidence.
          </p>
        </header>

        <section className={styles.content}>
          <h2>Under $25</h2>
          <p>
            Small budget, big thought:
          </p>
          <ul>
            <li><strong>Reusable Water Bottle</strong> – High-quality brands like Hydro Flask</li>
            <li><strong>Puzzle or Board Game</strong> – Quality family entertainment</li>
            <li><strong>Specialty Tea/Coffee</strong> – Gourmet samplers</li>
            <li><strong>Succulent Plant</strong> – Low maintenance, stylish</li>
            <li><strong>Candle</strong> – Branded, luxury scents</li>
          </ul>

          <h2>$25 - $50</h2>
          <p>
            The sweet spot for most occasions:
          </p>
          <ul>
            <li><strong>Streaming Gift Card</strong> – Netflix, Spotify, Audible</li>
            <li><strong>Quality Headphones</strong> – Bluetooth, noise-canceling</li>
            <li><strong>Leather Wallet</strong> – Monogrammed, timeless</li>
            <li><strong>Cocktail Kit</strong> – Complete bar set</li>
            <li><strong>Experience Voucher</strong> – Escape room, cooking class</li>
          </ul>

          <h2>$50 - $100</h2>
          <p>
            Premium gifts that make an impact:
          </p>
          <ul>
            <li><strong>Smart Watch Band</strong> – Apple Watch, Fitbit</li>
            <li><strong>Portable Speaker</strong> – JBL, Bose SoundLink</li>
            <li><strong>Designer Scarf</strong> – Branded, quality material</li>
            <li><strong>Gaming Accessory</strong> – Controller, headset, chair</li>
            <li><strong>Ninja/Coffee Machine</strong> – Small countertop appliances</li>
          </ul>

          <h2>$100+</h2>
          <p>
            Investment pieces and splurges:
          </p>
          <ul>
            <li><strong>Tablet</strong> – iPad, Kindle, Samsung</li>
            <li><strong>Weekend Trip</strong> – Hotel + experience nearby</li>
            <li><strong>Drones</strong> – DJI Mini, beginner models</li>
            <li><strong>Quality Headphones</strong> – Sony WH-1000XM5, AirPods Max</li>
            <li><strong>Designer Accessory</strong> – Bag, wallet, jewelry</li>
          </ul>

          <div className={styles.cta}>
            <a href="/" className={styles.ctaButton}>
              Get Personalized Gift Ideas 🎁
            </a>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>💡 Budget Tips</h3>
            <ul>
              <li>Think experiences over stuff</li>
              <li>Personalization adds perceived value</li>
              <li>Quality beats quantity</li>
              <li>Dig deeper: hobbies, needs, wishes</li>
            </ul>
          </div>
        </aside>
      </article>
    </SEOPage>
  );
}
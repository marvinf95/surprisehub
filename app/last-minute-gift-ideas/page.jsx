import SEOPage from '../../components/seo/SEOPage';
import styles from './page.module.css';

export const metadata = {
  title: 'Last Minute Gift Ideas | Quick & Thoughtful Gifts',
  description: 'Need a last minute gift? Find quick, thoughtful gift ideas that look like you planned ahead. Perfect for procrastinators and busy people.',
  keywords: ['last minute gift ideas', 'quick gifts', 'same day gifts', 'fast gift ideas', 'procrastinator gifts'],
};

export default function LastMinuteGiftIdeas() {
  return (
    <SEOPage title={metadata.title} description={metadata.description} locale="en">
      <article className={styles.article}>
        <header className={styles.hero}>
          <h1>Last Minute Gift Ideas 🎁</h1>
          <p className={styles.intro}>
            It's tomorrow and you need a gift <strong>today</strong>? Don't panic. We've got 
            <strong>quick gift ideas</strong> that look thoughtful, not rushed. From digital 
            downloads to store pickups – ideas that arrive fast.
          </p>
        </header>

        <section className={styles.content}>
          <h2>Digital Gifts (Instant Delivery)</h2>
          <p>
            Download, stream, or send instantly:
          </p>
          <ul>
            <li><strong>Netflix / Spotify Gift Card</strong> – Entertainment for months</li>
            <li><strong>Digital Photo Frame</strong> – Pre-loaded with memories</li>
            <li><strong>Online Course</strong> – Skillshare, MasterClass, Udemy</li>
            <li><strong>Streaming Subscriptions</strong> – Audible, Disney+, Xbox</li>
          </ul>

          <h2>Same-Day Pickup Ideas</h2>
          <p>
            Local stores and quick solutions:
          </p>
          <ul>
            <li><strong>Food Delivery</strong> – Uber Eats / DoorDash gift card</li>
            <li><strong>Local Restaurant</strong> – Gift certificate, call ahead</li>
            <li><strong>Gas Station Card</strong> – Practical and appreciated</li>
            <li><strong>Pharmacy Gift Set</strong> – Skincare, wellness bundles</li>
          </ul>

          <h2>DIY Last Minute Ideas</h2>
          <p>
            Handmade with love:
          </p>
          <ul>
            <li><strong>I Owe You Voucher</strong> – Babysitting, cooking, help with projects</li>
            <li><strong>Coupon Book</strong> – Personalized promises for the year</li>
            <li><strong>Playlist on USB</strong> – Curated songs with cover art</li>
            <li><strong>Framed Photo</strong> – Print at home, improvise frame</li>
          </ul>

          <h2>Emergency Gift Strategy</h2>
          <p>
            When time is short, think BIG:
          </p>
          <ul>
            <li><strong>Expensive Champagne</strong> – Budget 3x normal, skip the bow</li>
            <li><strong>Catered Dinner</strong> – Hire someone to cook</li>
            <li><strong>Surprise Trip</strong> – Hotel + experiences nearby</li>
            <li><strong>Professional Photo Shoot</strong> – Book a session, frame results</li>
          </ul>

          <div className={styles.cta}>
            <a href="/" className={styles.ctaButton}>
              Get More Gift Ideas 🎁
            </a>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>⏱️ Quick Timeline</h3>
            <ul>
              <li><strong>Today:</strong> Digital, delivery, vouchers</li>
              <li><strong>Tomorrow:</strong> Same-day pickup</li>
              <li><strong>This Week:</strong> Experience gifts</li>
            </ul>
          </div>
        </aside>
      </article>
    </SEOPage>
  );
}
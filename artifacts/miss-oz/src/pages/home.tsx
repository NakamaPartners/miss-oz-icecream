import Loader from '../components/Loader';
import Postcard from '../components/Postcard';
import Marquee from '../components/Marquee';
import Story from '../components/Story';
import Wholesale from '../components/Wholesale';
import Events from '../components/Events';
import VoteFlavor from '../components/VoteFlavor';
import Guestbook from '../components/Guestbook';
import Footer from '../components/Footer';
import FlavorDrop from '../components/FlavorDrop';

const CheckerRule = () => (
  <div className="checker-floor h-[26px] border-y-2 border-[var(--cocoa)]" aria-hidden="true" />
);

export default function Home() {
  return (
    <main className="relative bg-[var(--cream)] min-h-screen">
      <Loader />
      <div className="paper-overlay" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <Postcard />
      <Marquee />
      <div id="about"><Story /></div>
      <CheckerRule />
      <div id="menu"><FlavorDrop /></div>
      <div id="wholesale"><Wholesale /></div>
      <div id="events"><Events /></div>
      <CheckerRule />
      <Guestbook />
      <div id="vote"><VoteFlavor /></div>
      <Footer />
    </main>
  );
}

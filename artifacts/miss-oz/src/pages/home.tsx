import Loader from '../components/Loader';
import PosterBoard from '../components/PosterBoard';
import Marquee from '../components/Marquee';
import Story from '../components/Story';
import Wholesale from '../components/Wholesale';
import Events from '../components/Events';
import VoteFlavor from '../components/VoteFlavor';
import Guestbook from '../components/Guestbook';
import Footer from '../components/Footer';
import FlavorDrop from '../components/FlavorDrop';

const CheckerRule = () => (
  <div className="checker-strip h-[15px] border-y-2 border-[var(--cocoa)]" aria-hidden="true" />
);

export default function Home() {
  return (
    <main className="relative bg-[var(--cream)] min-h-screen">
      <Loader />
      <div className="grain-overlay" aria-hidden="true" />
      <PosterBoard />
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

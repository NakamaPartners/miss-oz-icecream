import Loader from '../components/Loader';
import PosterBoard from '../components/PosterBoard';
import Marquee from '../components/Marquee';
import Story from '../components/Story';
import Menu from '../components/Menu';
import Wholesale from '../components/Wholesale';
import Events from '../components/Events';
import VoteFlavor from '../components/VoteFlavor';
import Guestbook from '../components/Guestbook';
import Footer from '../components/Footer';
import FlavorDrop from '../components/FlavorDrop';

export default function Home() {
  return (
    <main className="relative bg-[var(--cream)] min-h-screen">
      <Loader />
      <div className="grain-overlay" aria-hidden="true" />
      <PosterBoard />
      <Marquee />
      <div id="about"><Story /></div>
      <div id="menu"><Menu /></div>
      <FlavorDrop />
      <div id="wholesale"><Wholesale /></div>
      <div id="events"><Events /></div>
      <Guestbook />
      <div id="vote"><VoteFlavor /></div>
      <Footer />
    </main>
  );
}

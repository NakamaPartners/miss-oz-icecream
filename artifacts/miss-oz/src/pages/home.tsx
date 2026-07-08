import Loader from '../components/Loader';
import Cursor from '../components/Cursor';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Story from '../components/Story';
import Menu from '../components/Menu';
import Wholesale from '../components/Wholesale';
import Events from '../components/Events';
import SweetNotes from '../components/SweetNotes';
import VoteFlavor from '../components/VoteFlavor';
import Footer from '../components/Footer';
import NowPlaying from '../components/NowPlaying';

export default function Home() {
  return (
    <main className="relative bg-[var(--cream)] min-h-screen">
      <Loader />
      <Cursor />
      <div className="grain-overlay" aria-hidden="true" />
      <NowPlaying />
      <Nav />
      <Hero />
      <Marquee />
      <div id="about"><Story /></div>
      <div id="menu"><Menu /></div>
      <div id="wholesale"><Wholesale /></div>
      <div id="events"><Events /></div>
      <SweetNotes />
      <VoteFlavor />
      <Footer />
    </main>
  );
}

import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Services from "../components/Services";
import StatsBand from "../components/StatsBand";
import Sectors from "../components/Sectors";
import About from "../components/About";
import Affiliate from "../components/Affiliate";
import Contact from "../components/Contact";
import Footer, { WhatsAppFab } from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <StatsBand />
      <Sectors />
      <About />
      <Affiliate />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}

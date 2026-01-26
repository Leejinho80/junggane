import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import FloatingButton from '@/components/FloatingButton';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Location />
      </main>
      <Footer />
      <FloatingButton />
    </>
  );
}

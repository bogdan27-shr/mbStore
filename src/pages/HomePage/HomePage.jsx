import './HomePage.scss';

import Header from '../../components/Header/Header';
import HomeProducts from '../../features/homeProducts/HomeProducts';
import Footer from '../../components/Footer/Footer';
import HomeBanner from '../../features/homeBanner/HomeBanner';

export default function HomePage() {

  return (
    <div className="home-page">
      <Header />

      <main className="home-page__main">
        <HomeBanner />
        <HomeProducts/>
      </main>

      <Footer />
    </div>
  );
}

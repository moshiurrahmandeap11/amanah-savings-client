import Footer from "../components/shared/Footer/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

export default async function GeneralLayout({ children }) {
  return (
    <dev className="min-h-full flex flex-col">
      <nav className="sticky top-0 z-50">
        <Navbar />
      </nav>
      {children}
      <footer>
        <Footer />
      </footer>
    </dev>
  );
}

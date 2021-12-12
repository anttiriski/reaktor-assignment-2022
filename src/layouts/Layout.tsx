import LiveGames from "../components/LiveGames";
import Navigation from "../components/Navigation";

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />

      <main className="w-full max-w-screen-xl sm:pl-20 mx-auto">
        {children}
      </main>

      <LiveGames />
    </div>
  );
};

export default Layout;

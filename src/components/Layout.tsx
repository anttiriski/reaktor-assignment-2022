import LiveGames from "./LiveGames";
import Navigation from "./Navigation";

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

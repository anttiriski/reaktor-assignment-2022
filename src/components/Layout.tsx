import LiveGames from "./LiveGames";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <main className="flex">
      <div className="fixed w-20 h-screen border-x">
        <Navigation />
      </div>

      <main className="ml-20 mt-12">{children}</main>

      <LiveGames />
    </main>
  );
};

export default Layout;

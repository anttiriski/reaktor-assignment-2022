import LiveGames from "./LiveGames";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <main className="flex">
      <div className="fixed w-20 h-screen border-x">
        <Navigation />
      </div>

      <main className="w-full max-w-screen-xl pl-20 mx-auto">{children}</main>

      <LiveGames />
    </main>
  );
};

export default Layout;

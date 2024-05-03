import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ title, children }) {
  return (
    <div>
      <Header />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

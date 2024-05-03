import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ title, children, ...rest }) {
  return (
    <div>
      <Header {...rest} />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

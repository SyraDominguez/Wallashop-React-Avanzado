import logo from "../../assets/logo-wallashop.svg";

export default function Header() {
  return (
    <header>
      <div style={{ position: "relative", top: "10px", left: "0px" }}>
        <img
          src={logo}
          alt="logo"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
      <nav></nav>
    </header>
  );
}

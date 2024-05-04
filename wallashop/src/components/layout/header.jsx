import logo from "../../assets/logo-wallashop.svg";
import AuthButton from "../../pages/auth/AuthButton";
import Button from "../button";

export default function Header() {
  return (
    <header>
      <div style={{ display: "flex" }}>
        <div style={{ position: "relative", top: "-55px", left: "0px" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <nav style={{ marginLeft: "auto" }} className="header-nav">
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Buscar Articulo"
              style={{
                marginLeft: "5px",
                width: "200px",
                padding: "5px",
                marginTop: "35px",
                borderRadius: "500px",
                border: "solid 2px rgb(79, 211, 211)",
              }}
            />

            <Button
              style={{
                width: "50px",
                marginLeft: "5px",
                padding: "5px",
                marginTop: "35px",
                borderRadius: "500px",
                border: "solid 2px rgb(79, 211, 211)",
              }}
            >
              <i className="fas fa-search"></i>
            </Button>
            <div>
              <AuthButton
                className="header-button"
                style={{
                  width: "50px",
                  marginLeft: "5px",
                  padding: "5px",
                  marginTop: "35px",
                  borderRadius: "500px",
                  border: "solid 2px rgb(79, 211, 211)",
                }}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

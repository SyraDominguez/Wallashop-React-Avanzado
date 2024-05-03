import logo from "../../assets/logo-wallashop.svg";
import { logout } from "../../pages/auth/service";
import Button from "../button";

export default function Header({ isLogged, onLogout }) {
  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <header>
      <div style={{ display: "flex" }}>
        <div style={{ position: "relative", top: "-25px", left: "0px" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <nav style={{ marginLeft: "auto" }}>
          {isLogged ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button $variant="primary">Login</Button>
          )}
          <div style={{ display: "flex" }}>
            <input
              type="text"
              placeholder="Buscar Articulo"
              style={{
                marginLeft: "5px",
                width: "200px",
                padding: "5px",
                marginTop: "35px",
              }}
            />
            <Button
              style={{
                width: "50px",
                marginLeft: "5px",
                padding: "5px",
                marginTop: "35px",
                borderRadius: "500px",
              }}
            >
              <i className="fas fa-search"></i>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

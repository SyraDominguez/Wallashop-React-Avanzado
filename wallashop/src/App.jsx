import AdsPage from "./pages/ads/adsPage.jsx";
import Button from "./components/button.jsx";

function App() {
  return (
  <div>
    <Button
      onClick={() => { 
        console.log('Click')
        }}
        $variant = "primary"
      >
          Login
    </Button>

    <Button 
      onClick={() => { 
        console.log('Click')
        }}
        $variant = "primary"
        >
          Register
    </Button>


    <AdsPage />
  </div>
  );
}

export default App

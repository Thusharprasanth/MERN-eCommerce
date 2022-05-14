import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          
       
            <Routes>
            <Route exact path ='/' element={<HomeScreen/>}></Route>
            <Route  path='/product/:id' element={<ProductScreen/>}></Route>
            <Route  path='/cart' element={<CartScreen/>}></Route>
            <Route  path='/cart/:id' element={<CartScreen/>}></Route>
            </Routes>
        
 
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductForm from "./Pages/ProductForm";
import PreviewPage from "./Pages/PreviewPage";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import ImageGallery from "./Pages/ImageGallery";
import OrderPage from "./Pages/OrderPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddListing" element={<ProductForm />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/orderpage" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

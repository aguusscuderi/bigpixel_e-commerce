import { useState, useEffect } from 'react';
import axios from 'axios';
// import { getData } from '../utils/fetchData';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar' 
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Card from '../components/Products/Card'
import { Filter } from '../components/Products/Filter';
import { Product } from '../interfaces/types'

// interface databaseProductsResult {
//   result: number,
//   products: [],
//   status: string
// }

const ProductsView = () => {
  const location = useLocation()
  const { search } = location

  const [products, setProducts] = useState<Product[]>([]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const fetchProducts = async () => {
    try {
      // const response = await getData(`products?title=${search ? search : "all"}&category=${category ? category : "all"}`)
      // const response = await getData(`products?title=${search ? search : "all"}`)
      const response = await axios.get<Product[]>(`http://localhost:4040/api/products${search}`);
      // const response = await axios.get<Product[]>(`http://localhost:4040/api/products`);
      const productsData = response.data;
      console.log('PRODUCTS DATA: ', productsData)
      setProducts(productsData);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]); // El segundo argumento vacío [] significa que este efecto se ejecuta solo una vez al montar el componente


    return (
        <div className="home_page">
          <div>
            <title>Products Page</title>
          </div>
          <NavBar/>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2} lg={2}>
             <Box sx={{ flexGrow: 1, p: 2, border: '1px dashed grey'}}>
              <Grid mt={6}>
              {/* <FilterCategory/> */}
              </Grid>
             </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <Box sx={{ flexGrow: 1, p: 2, border: '1px dashed grey'}}>
                <Grid container spacing={2} mt={4} alignItems='center' justifyContent='center'>
                  <Grid item xs={12} sm={12} md={8} lg={7}>
                  <Filter/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={3}>
                  {/* <FilterOrder/> */}
                  </Grid>
                </Grid>
                {products.length === undefined ? (
                    <h2>Falta agregar productos</h2>
                ) : (
                      <div className="cards-container">
                        {products.map((card, idx) => (
                            <div key={idx} className='card-container'>
                                <Card
                                    title={capitalizeFirstLetter(card.name)}
                                    imageSource={card.photo_url}
                                    text={card.description}
                                    price={card.price}
                                    id={card.id}
                                />
                            </div>
                        ))}
                      </div>
                    )
                }
              </Box>
            </Grid>
          </Grid>
    
    
        </div>
      );

}

export default ProductsView
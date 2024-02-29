const ProductsView = () => {

    return (
        <div>
           <h1> Aqui va Products.</h1> 
        </div>
    )

    // return (
    //     <div className="home_page">
    //       <Head>
    //         <title>Products Page</title>
    //       </Head>
    //       <NavBar/>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12} sm={12} md={2} lg={2}>
    //          <Box sx={{ flexGrow: 1, p: 2, border: '1px dashed grey'}}>
    //           <Grid mt={6}>
    //           <FilterCategory/>
    //           </Grid>
    //          </Box>
    //         </Grid>
    //         <Grid item xs={12} sm={12} md={10} lg={10}>
    //           <Box sx={{ flexGrow: 1, p: 2, border: '1px dashed grey'}}>
    //             <Grid container spacing={2} mt={4} alignItems='center' justifyContent='center'>
    //               <Grid item xs={12} sm={12} md={8} lg={7}>
    //               <Filter/>
    //               </Grid>
    //               <Grid item xs={12} sm={12} md={4} lg={3}>
    //               <FilterOrder/>
    //               </Grid>
    //             </Grid>
    //             {products.length === undefined ? (
    //                 <h2>Falta agregar productos</h2>
    //             ) : (
    //                   <div className="cards-container">
    //                     {products.map((card, idx) => (
    //                         <div key={idx} className='card-container'>
    //                             <Card
    //                                 title={capitalizeFirstLetter(card.title)}
    //                                 imageSource={card.photo_url}
    //                                 text={card.description}
    //                                 price={card.price}
    //                                 id={card._id}
    //                             />
    //                         </div>
    //                     ))}
    //                   </div>
    //                 )
    //             }
    //           </Box>
    //         </Grid>
    //       </Grid>
    
    
    //     </div>
    //   );
    
}

export default ProductsView

// 
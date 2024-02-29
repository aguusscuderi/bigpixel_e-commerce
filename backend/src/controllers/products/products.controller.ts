import { Router, Request, Response } from 'express';
import Products from '../../models/products';
import arrProducts from '../../models/mocks/products.mocks'

const router = Router();

router.post('/add', async (req: Request, res: Response) => {
  try {
    const productSaved = await Products.bulkCreate(arrProducts);

    res.json({
      message: 'Productos creados exitosamente!',
      productSaved,
    });
  } catch (error) {
    console.error('Error al crear productos:', error);
    res.status(500).json({ error: 'Error al crear productos' });
  }
});

router.get('/all', async (req: Request, res: Response) => {
  try {
    // Consulta todos los productos desde la base de datos
    const products = await Products.findAll();

    // Envía los productos como respuesta
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// update 

// delete

export default router;
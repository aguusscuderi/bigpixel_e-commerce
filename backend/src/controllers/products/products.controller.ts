import { Router, Request, Response } from 'express';
import Products from '../../models/products';

const router = Router();

router.post('/add', async (req: Request, res: Response) => {
  try {
    const arrProducts = [
      {
        nombre: 'Producto 1',
        categorias: 'Categoría 1',
        precio: 10,
      },
      {
        nombre: 'Producto 2',
        categorias: 'Categoría 2',
        precio: 20,
      },
      {
        nombre: 'Producto 3',
        categorias: 'Categoría 3',
        precio: 30,
      },
    ];

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

router.get('/all', (req: Request, res: Response) => {
  // Aquí puedes escribir la lógica para obtener todos los productos de la base de datos
  // Por ahora, simplemente enviamos un mensaje de prueba
  res.send('Productos encontrados');
});

// update 

// delete

export default router;
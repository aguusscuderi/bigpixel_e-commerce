import { Request, Response } from 'express';
import Products from '../../models/products';
import arrProducts from '../../models/mocks/products.mocks'

// UNA VEZ HECHA LA AUTENTICACION, HAY QUE EJECUTAR LOS MIDDLEWARES
// CORRESPONDIENTES PARA FILTRAR LOS USUARIOS QUE PUEDEN O NO, REALIZAR CRUD.

// POST

export async function addProducts (req: Request, res: Response) {
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
}


//GET

export async function readProducts (req: Request, res: Response) {
  try {
    // Consulta todos los productos desde la base de datos
    const products = await Products.findAll();

    // Envía los productos como respuesta
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
}


// UPDATE 

// DELETE

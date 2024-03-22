// IMPORTADO DESDE LA APP DE NEXT, HAY QUE ACOMODARLO Y MIGRARLO ACORDE.

/*import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from 'utils/database';
import { Query } from "mongoose";
import controllersProducts from 'controllers/productos'
import Product from 'models/products'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
        query: {id}
     } = req

    switch (method) {
        case "GET":
            if (id) {
                const product = await controllersProducts.readOne(id)
                if (!product) return (res.redirect('/notfound'))
                return res.status(200).json(product)
            }else{
                await getProducts(req, res)
            }
            break
        case "POST":
            return controllersProducts.write(req, res)
        case "DELETE":
            return controllersProducts.deleted(req, res)
        case "PUT":
            return controllersProducts.update(req, res)
        default:
            return res.status(404).json('invalid method')
    }
}


class APIfeatures {
    query: Query<any[], any, {}, any>
    queryString: any
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    
    filtering(){
        const queryObj = {...this.queryString}

        // const excludeFields = ['page', 'sort', 'limit']
        // excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.category && queryObj.category !== 'all')
            this.query.find({category: queryObj.category})
        if(queryObj.title && queryObj.title !== 'all')
            this.query.find({title: {$regex: queryObj.title}})

        this.query.find()
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const features = new APIfeatures(Product.find(), req.query).filtering()
        const products = await features.query

        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({err: err})
    }
}

*/
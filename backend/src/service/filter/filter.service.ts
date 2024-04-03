import Products from "../../models/products";
import { QueryTypes } from "sequelize";
import { Request, Response } from "express";

class APIfeatures {
    query: any
    queryString: any
    constructor(query: any, queryString: any){
        this.query = query;
        this.queryString = queryString;
    }

    
    async filtering(){
        const queryObj = {...this.queryString}
        let result: any = []
        // const excludeFields = ['page', 'sort', 'limit']
        // excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.category && queryObj.category !== 'all')
            // this.query.findAll({category: queryObj.category})
            result = await this.query.findAll({where: {category: queryObj.category}})
        if(queryObj.name && queryObj.name !== 'all')
            // this.query.find({name: {$regex: queryObj.name}})
            result = await this.query.findAll({where: {name: queryObj.name}})

        result = await this.query.findAll()

        // console.log(result)
        
        return result;
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

export const getProducts = async (req: Request, res: Response) => {
    try {
        console.log('EJECUTANDO FUNCION GET PRODUCTS, BACKEND.', req.query)

        const features = new APIfeatures(Products, req.query)
        const filteredProducts = await features.filtering()

        console.log(filteredProducts)

        res.json(filteredProducts)

        // res.json({
        //     status: 'success',
        //     result: filteredProducts.length,
        //     products: filteredProducts
        // })

    } catch (err) {
        return res.status(500).json({err: err})
    }
}


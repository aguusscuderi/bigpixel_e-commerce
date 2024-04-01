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

    
    filtering(){
        const queryObj = {...this.queryString}

        // const excludeFields = ['page', 'sort', 'limit']
        // excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.category && queryObj.category !== 'all')
            this.query.find({category: queryObj.category})
        if(queryObj.title && queryObj.title !== 'all')
            this.query.find({name: {$regex: queryObj.name}})

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

export const getProducts = async (req: Request, res: Response) => {
    try {
        const features = new APIfeatures(Products.findAll(), req.query).filtering()
        const products = await features.query

        console.log('PRODUCTS:', products)

        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({err: err})
    }
}


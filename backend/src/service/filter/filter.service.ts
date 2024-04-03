import Products from "../../models/products";
import { Request, Response } from "express";
import { Op } from 'sequelize';

class APIfeatures {
    query: any
    queryString: any
    constructor(query: any, queryString: any){
        this.query = query;
        this.queryString = queryString;
    }

    
    async filtering(){
        const queryObj = {...this.queryString}
        let filterQuery: any = {};

        if(queryObj.category && queryObj.category !== 'all')
            filterQuery.category = queryObj.category;
        if(queryObj.name && queryObj.name !== 'all')
            filterQuery.name = { [Op.iLike]: `%${queryObj.name}%` };

        const result = await this.query.findAll({ where: filterQuery });
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
        const features = new APIfeatures(Products, req.query)
        const filteredProducts = await features.filtering()

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


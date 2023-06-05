import { NextFunction, Request, Response } from "express";
import Buku from "../models/BukuModel";
import Penerbit from "../models/PenerbitModel";
import sequelize from "sequelize";

export const getAllBuku = async (req:Request, res:Response, next: NextFunction) => {
    try {
        let order = null;
        if (req.query.order){
            order = req.query.order.toString()
        } else {
            order = 'id'
        }
        const filterWhere = <any>{}
        const penerbitWhere = <any>{}

        const { kategori, nama, harga, stok, penerbit } = req.query;
        if(nama) filterWhere.nama = {
            [sequelize.Op.like]: `%${nama}%`,
        }
        if(kategori) filterWhere.kategori = {
            [sequelize.Op.like]: `%${kategori}%`,
        }
        if(harga) filterWhere.harga = {
            [sequelize.Op.eq]: harga,
        }
        if(stok) filterWhere.stok = {
            [sequelize.Op.eq]: stok,
        }
        if(penerbit) penerbitWhere.nama = {
            [sequelize.Op.like]: `%${penerbit}%`,
        }
        const response = await Buku.findAll({
            where: filterWhere,
            include: {
                model: Penerbit,
                where: penerbitWhere,
            },
            order: [[order, 'asc']]
        });
        res.status(200).json({
            code: 200,
            info: 'success get all buku',
            data: response,
        });
    } catch(error) {
        console.log(error.message);
    }
};

export const getBukuById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await Buku.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({
            code: 200,
            info: 'success get buku by id',
            data: response,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const createBuku = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Buku.create(req.body);
        res.status(201).json({
            code: 201,
            info: 'buku created',
            data: null,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateBukuById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { kategori, nama, harga, stok, id_penerbit } = req.body
        const selectedBuku = await Buku.findOne({
            where: {
                id: id
            },
        });

        if(!selectedBuku){
            res.status(400).json({
                code: 400,
                info: `buku with id ${id} not found`,
                data: null,
            });
        }

        const update = <any>{}
        if(nama) update.nama = nama
        if(kategori) update.kategori = kategori
        if(harga) update.harga = harga
        if(stok) update.stok = stok
        if(id_penerbit) update.id_penerbit = id_penerbit

        const updateBuku = await Buku.update(update, {
            where: {
                id: id
            },
        })

        if(!updateBuku){
            res.status(400).json({
                code: 400,
                info: `buku with id ${id} update failed`,
                data: null,
            });
        }

        res.status(200).json({
            code: 200,
            info: 'success update buku',
            data: null,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteBuku = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const selectedBuku = await Buku.findByPk(req.params.id);
        if(!selectedBuku){
            res.status(400).json({
                code: 400,
                info: `buku with id ${req.params.id} not found`,
                data: null,
            });
        }

        await selectedBuku.destroy()

        res.status(200).json({
            code: 200,
            info: 'success delete buku by id',
            data: null,
        });
    } catch (error) {
        console.log(error.message);
    }
};

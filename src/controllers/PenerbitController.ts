import { NextFunction, Request, Response } from "express";
import sequelize from "sequelize";
import Penerbit from "../models/PenerbitModel";

export const getAllPenerbit = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const filterWhere = <any>{};

        const { nama, alamat, kota, telpon } = req.query;
        if(nama) filterWhere.nama = {
            [sequelize.Op.like]: `%${nama}%`,
        }
        if(alamat) filterWhere.alamat = {
            [sequelize.Op.like]: `%${alamat}%`,
        }
        if(kota) filterWhere.kota = {
            [sequelize.Op.like]: `%${kota}%`,
        }
        if(telpon) filterWhere.telpon = {
            [sequelize.Op.like]: `%${telpon}%`,
        }
        const response = await Penerbit.findAll({
            attributes: [
            'id',
            'nama',
            'alamat',
            'kota',
            'telpon',
            'createdAt',
            'updatedAt'
        ],
            where: filterWhere,
        });
        res.status(200).json({
            code: 200,
            info: 'success get all penerbit',
            data: response,
        });
    } catch(error) {
        console.log(error.message);
    }
};

export const getPenerbitById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await Penerbit.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({
            code: 200,
            info: 'success get penerbit by id',
            data: response,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPenerbit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Penerbit.create(req.body);
        res.status(201).json({
            code: 201,
            info: 'penerbit created',
            data: null,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePenerbitById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { nama, alamat, kota, telpon } = req.body
        const selectedPenerbit = await Penerbit.findOne({
            where: {
                id: id
            },
        });

        if(!selectedPenerbit){
            res.status(400).json({
                code: 400,
                info: `penerbit with id ${id} not found`,
                data: null,
            });
        }

        const update = <any>{}
        if(nama) update.nama = nama
        if(alamat) update.alamat = alamat
        if(kota) update.kota = kota
        if(telpon) update.telpon = telpon

        const updatePenerbit = await Penerbit.update(update, {
            where: {
                id: id
            }
        })

        if(!updatePenerbit){
            res.status(400).json({
                code: 400,
                info: `penerbit with id ${id} update failed`,
                data: null,
            });
        }

        res.status(200).json({
            code: 200,
            info: 'success update penerbit',
            data: null,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePenerbit = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const selectedPenerbit = await Penerbit.findByPk(req.params.id);
        if(!selectedPenerbit){
            res.status(400).json({
                code: 400,
                info: `penerbit with id ${req.params.id} not found`,
                data: null,
            });
        }

        await selectedPenerbit.destroy()

        res.status(200).json({
            code: 200,
            info: 'success delete penerbit by id',
            data: null,
        });
    } catch (error) {
        console.log(error.message);
    }
};

// export const getPenerbitReportShift = async (req:Request, res:Response, next: NextFunction) => {
//     try {
//         const filterWhere = <any>{};

//         const { Penerbit_id, start_date, end_date } = req.body;
//         if(start_date && end_date) filterWhere.Buku_date = {
//             [sequelize.Op.between]: [start_date, end_date],
//         };
//         const response = await Penerbit.findOne({
//             attributes: ['name',
//             'department',
//             'email',
//             'shift_id',
//             'createdAt',
//             'updatedAt'],
//             where: {
//                 id: Penerbit_id,
//             },
//             include: [Shift, {
//                 model: Buku,
//                 where: filterWhere,
//                 include: [ShiftTime],
//             }],
//         });
//         res.status(200).json({
//             guid: req.body.token,
//             code: 200,
//             info: "get shift success",
//             data: response,
//         });
//     } catch (error) {
//         console.log(error.message);
//     }
// };

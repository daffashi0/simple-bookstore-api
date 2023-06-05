import { NextFunction, Request, Response } from "express";
import Employee from "../models/PenerbitModel";
import bcrypt from 'bcrypt';
import Point from "../models/PointModel";
import sequelize from "sequelize";
import Shift from "../models/ShiftModel";
import ShiftTime from "../models/ShiftTimeModel";
import Attendance from "../models/BukuModel";
import dayjs from 'dayjs';
import Token from "../models/TokenModel";
import jwt from 'jsonwebtoken';

export const getEmployees = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await Employee.findAll();
        res.status(200).json({
            guid: req.body.token,
            code: 200,
            info: 'success get employees',
            data: response,
        });
    } catch(error) {
        console.log(error.message);
    }
};

export const getEmployeeById = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await Employee.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({
            guid: req.body.token,
            code: 200,
            info: 'success get employees',
            data: response,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Employee.create(req.body);
        res.status(201).json({
            guid: null,
            code: 201,
            info: 'user created',
            data: null,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const employee = await Employee.findOne({
            where: {
                email: email,
            },
        });

        if (!employee){
            res.status(401).send({
                guid: null,
                code: 401,
                info: "user doesn't exist",
                data: null,
            });
            next();
        }

        const employeeJson = employee.toJSON();

        const savedPassword = employeeJson.password;

        const userToken = jwt.sign({ email: employee.dataValues.email, password: employee.dataValues.password },
            process.env.ACCESS_TOKEN_SECRET);

        bcrypt.compare(password, savedPassword, async (err, result) => {
            if (err) {
              // Jika terjadi error, kirimkan response error
              res.status(500).send({
                guid: null,
                code: 500,
                info: "internal server error",
                data: null,
            });
            } else if (result === false) {
              // Jika password tidak cocok, kirimkan response error
              res.status(401).send({
                guid: null,
                code: 401,
                info: "invalid credentials",
                data: null,
            });
            } else {
                const output = <any>{
                    id: employeeJson.id,
                    name: employeeJson.name,
                    department: employeeJson.department,
                    email: employeeJson.email,
                    shift_id: employeeJson.shift_id,
                };

                const tokenData = await Token.findOne({
                    where: {
                        value: userToken,
                    },
                });

                if(!tokenData){
                    await Token.create({
                        value: userToken,
                    });
                }
              // Jika password cocok, kirimkan response sukses
              res.status(200).send({
                guid: userToken,
                code: 200,
                info: "login success",
                data: output,
            });
            }
          });
    } catch (error) {
        console.log(error.message);
    }
};

export const getShiftByEmployeeId = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const response = await Employee.findOne({
            attributes: ['name', 'department', 'email', 'shift_id', 'createdAt', 'updatedAt'],
            where: {
                id: req.body.employee_id,
            },
            include: {
                model: Shift,
                include: [ShiftTime],
            },
        });
        res.status(200).json({
            guid: req.body.token,
            code: 200,
            info: "get shift success",
            data: response,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getTodayShiftByEmployeeId = async (req:Request, res:Response, next: NextFunction) => {
    try {
        let status = 0;
        const reqDay = dayjs(req.body.date).day() + 1;
        const reqDate = dayjs(req.body.date).format("YYYY-MM-DD");

        const attendance = await Attendance.findOne({
            where:{
                employee_id: req.body.employee_id,
                attendance_date: { [sequelize.Op.gte]: reqDate },
            },
        });

        if(attendance){
            status = 1;
            if(attendance.dataValues.clock_out !== null){
                status = 2;
            }
        }

        const response = await Employee.findOne({
            attributes: ['name',
            'department',
            'email',
            'shift_id',
            'createdAt',
            'updatedAt',
            [sequelize.literal(status.toString()), 'status']],
            where: {
                id: req.body.employee_id,
            },
            include: {
                model: Shift,
                include: [{
                    model: ShiftTime,
                    where: {
                        day: reqDay,
                    },
                }],
            },
        });
        res.status(200).json({
            guid: req.body.token,
            code: 200,
            info: "get shift success",
            data: response,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getEmployeeReportShift = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const filterWhere = <any>{};

        const { employee_id, start_date, end_date } = req.body;
        if(start_date && end_date) filterWhere.attendance_date = {
            [sequelize.Op.between]: [start_date, end_date],
        };
        const response = await Employee.findOne({
            attributes: ['name',
            'department',
            'email',
            'shift_id',
            'createdAt',
            'updatedAt'],
            where: {
                id: employee_id,
            },
            include: [Shift, {
                model: Attendance,
                where: filterWhere,
                include: [ShiftTime],
            }],
        });
        res.status(200).json({
            guid: req.body.token,
            code: 200,
            info: "get shift success",
            data: response,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getListPoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const where = <any>{};
        const { start_date, end_date } = req.query;

        if(start_date && end_date) {
            where.point_date = { [sequelize.Op.between]: [start_date, end_date] };
        }

        const response = await Employee.findAll({
            attributes: [
                'id','name', 'department', 'email', [sequelize.fn('SUM', sequelize.col('points.value')), 'total_value'],
            ],
            include: {
                model: Point,
                attributes: [],
                where: where,
            },
            group: ['employees.id'],
            order: [['total_value', 'DESC']],
        });

        res.status(200).send({
            guid: req.body.token,
            code: 200,
            info: "success get employee points",
            data: response,
        });
    } catch (error) {
        console.log(error.message);
    }
};

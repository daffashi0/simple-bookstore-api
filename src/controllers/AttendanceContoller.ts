import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import ShiftTime from "../models/ShiftTimeModel";
import Attendance from "../models/BukuModel";
import Point from "../models/PointModel";

export const attendShift = async (req:Request, res:Response, next: NextFunction) => {
    try {
        const clock_in = dayjs(req.body.attendance_date).format('HH:mm:ss');
        const shiftTime = await ShiftTime.findByPk(req.body.shift_time_id);

        const payload = {
            employee_id: req.body.employee_id,
            attendance_date: req.body.attendance_date,
            clock_in: clock_in,
            lat: req.body.lat,
            long: req.body.long,
            is_late: 0,
        };

        if(clock_in > shiftTime.dataValues.end_begin_time){
            payload.is_late = 1;
        }

        await Attendance.create(payload);

        const pointValue = () => {
            if(clock_in <= shiftTime.dataValues.end_begin_time){
                return 10;
            } else {
                return 5;
            }
        };

        await Point.create({
            employee_id: req.body.employee_id,
            point_date: req.body.attendance_date,
            value: pointValue(),
        });

        res.status(200).json({
            guid: req.body.token,
            code: 200,
            info: "attendance success",
            data: null,
        });
    } catch(error) {
        console.log(error.message);
    }
};

export const endShift = async (req:Request, res:Response, next: NextFunction) => {
    try {
        await Attendance.update({
            clock_out: req.body.clock_out,
        }, {
            where: {
                id: req.body.id,
            },
        });
        res.status(201).json({
            guid: req.body.token,
            code: 201,
            info: "attendance success",
            data: null,
        });
    } catch(error) {
        console.log(error.message);
    }
};

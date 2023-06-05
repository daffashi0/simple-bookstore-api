import { body, param, query } from 'express-validator';

export const getAllShift = () => {
    query('name')
    .optional()
    .isString(),
    query('lat')
    .optional()
    .isNumeric(),
    query('long')
    .optional()
    .isNumeric(),
    query('start_time')
    .optional()
    .isTime({ hourFormat: 'hour24' }),
    query('end_time')
    .optional()
    .isTime({ hourFormat: 'hour24' }),
    query('day')
    .optional()
    .isNumeric();
};

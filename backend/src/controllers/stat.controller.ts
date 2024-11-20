import { Request, Response } from 'express'
import Stats from '../models/stats';

export const getStatUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const stat = await Stats.findOne({ where: { id_user: id } });

    if (stat) {
        res.json(stat);
    }
    
}

export const updateStats = async (req: Request, res: Response) => {
    const { points, text, id } = req.body; 
    const statExist = await Stats.findOne({ where: { id_user: id } });
    const { error, score } = statExist?.dataValues
    if (statExist) {
        try {
            if (text == 'score') {
                Stats.update({
                    score: points,
                    total: points - error
                    
                },
                    { where: { id_user: id } })
            }else{
                Stats.update({
                    error: points,
                    total: score - points
                },
                    { where: { id_user: id } })
            }
            res.status(200).json({ msg: 'Estadisticas actualizadas correctamente' })

        } catch (error) {
            res.status(400).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }
    }
    else {
        try {
            if(text == 'score'){
                Stats.create({
                    id_user: id,
                    score: points,
                    error: 0,
                    total: points
                })
            }else{
                Stats.create({
                    id_user: id,
                    score: 0,
                    error: points,
                    total: points
                })
            }         
            res.status(201).json({
                msg: `Estadisticas agregadas correctamente!`,
            })
        } catch (error) {
            res.status(400).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }
    }
}
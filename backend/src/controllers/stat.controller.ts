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
    const { score, text, id } = req.body;  
    const statExist = await Stats.findOne({ where: { id_user: id } });
    if (statExist) {
        try {
            if (text == 'score') {
                Stats.update({
                    score: score,
                },
                    { where: { id_user: id } })
            }else{
                Stats.update({
                    error: score,
                },
                    { where: { id_user: id } })
            }
            res.json({ msg: 'Estadisticas actualizadas correctamente' })

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
                    score: score,
                    error: 0
                })
            }else{
                Stats.create({
                    id_user: id,
                    score: 0,
                    error: score
                })
            }         
            res.json({
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
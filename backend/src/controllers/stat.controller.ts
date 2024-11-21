import { query, Request, Response } from 'express'
import Stats from '../models/stats';
import sequelize from '../db/conection';

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
    if (statExist) {
        const { error, score } = statExist?.dataValues
        try {
            if (text == 'score') {
                Stats.update({
                    score: points,
                    total: points - error
                    
                },
                    { where: { id_user: id } })
                    res.status(200).json({ msg: `Aciertos actualizados correctamente.  aciertos: ${points}` })
            }else if(text =='error'){
                Stats.update({
                    error: points,
                    total: score - points
                },
                    { where: { id_user: id } })
                    res.status(200).json({ msg: `Errores actualizados correctamente.  errores: ${points}` })
            }

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
                res.status(201).json({ msg: 'Aciertos agregados correctamente' })
            }else  if ( text == 'error'){
                Stats.create({
                    id_user: id,
                    score: 0,
                    error: points,
                    total: points
                })
                res.status(201).json({ msg: 'Errores agregados correctamente', errores: points })
            }         
        } catch (error) {
            res.status(400).json({
                msg: 'Ups ocurrio un error',
                error
            })
        }
    }
}
export const getRanking = async ( req: Request, res: Response) => {
    const ranking = await sequelize.query('SELECT id_user, score, error, total FROM f1Games.stats order by total desc');
    
    if(ranking){
        res.status(200).json(ranking[0]);
    }
    else{
        res.status(400).json({msg: 'Ups ocurrio un error al buscar los datos'});
    }
}
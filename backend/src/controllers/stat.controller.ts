import { Request, Response } from 'express'
import Stats from '../models/stats';

export const getStatUser = async ( req : Request, res : Response) =>{
    const {id} = req.params;
    const stat = await Stats.findOne( { where : { id_user: id}});

    if(stat){
        res.json(stat);
    }
}

export const updateStats = async ( req : Request, res : Response) => {
    const {body} = req.body;
    const {score, id_user} = body;

    const statExist = await Stats.findOne( {where : { id_user : id_user}});
    if(statExist){
        
        await Stats.update({score : score}, {where : { id_user : id_user}})
    }

}
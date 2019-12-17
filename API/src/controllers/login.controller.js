
import User from '../models/User';

export async function login(req,res){
    try{
        const { usuario } = req.body 
        const user = await User.findOne({where:{fullname : usuario}});
        res.json(user);
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}
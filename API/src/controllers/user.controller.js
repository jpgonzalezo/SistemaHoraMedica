import User from '../models/User';

export async function createUser(req,res){
    const { fullname, email } = req.body
    try{
        let newUser = await User.create({
            fullname: fullname,
            email: email
        }, {
            fields: ['fullname','email']
        });
        if(newUser){
            return res.json({
                message: 'User created successfully'
            });
        }
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}

export async function getUsers(req,res){
    try{
        const users = await User.findAll();
        res.json({
            data: users
        });
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}

export async function getUser(req,res){
    try{
        const { userID } = req.params 
        const user = await User.findOne({where:{id : userID}});
        res.json(user);
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}

export async function deleteUser(req,res){
    try{
        const { userID } = req.params 
        const user = await User.destroy({where:{id : userID}});
        res.json({
            message: 'User deleted successfully'
        });
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}

export async function updateUser(req,res){
    try{
        const { userID } = req.params
        const { fullname, email } = req.body
        const users = await User.findAll({
            attributes: [ 'id', 'fullname', 'email'],
            where: { id: userID}
        })
        if(users.length > 0){
            users.forEach(async user =>{
                await user.update({
                    fullname: fullname,
                    email: email
                })
            })
        }
        res.json({
            message: 'User updated successfully'
        });
    } catch(e){
        res.status(500).json({
            message: 'Error in the server'
        })
    }
}
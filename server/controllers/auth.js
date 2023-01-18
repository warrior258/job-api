const User = require('../models/User');

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = user.createJWT();
        res.status(201).json({userID: user._id, name: user.name, token: token});
    } catch (error) {
        // console.log(error);
        res.status(400).json(error);
    }
    
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(email === "" || password === ""){
        return res.status(400).json({err: 'Name and Password must be provided!'});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).send('User Does not Exists');
    }

    const isPassword = await user.comparePass(password);
    if(!isPassword){
        return res.status(400).send('Password Dont Match');
    }

    const token = user.createJWT();

   res.status(200).json({user: user.name, token: token});   

}


module.exports = {login, register};
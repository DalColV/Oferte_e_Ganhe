const bcrypt = require('bcryptjs');

    const hasharPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);

};

    const isEqualPassword = async (password, hashedPass) =>{
    return bcrypt.compare(password, hashedPass);
};
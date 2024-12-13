const  User  = require('../models/userModel');
const jwt = require('jsonwebtoken');

//Pegar Perfil Por Token
const getProfileFromToken = async (token) => {
  try {
      if (!token) {
          throw new Error('Authentication token not found');
      }
 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.profile_name) {
          throw new Error('Invalid token or profile name not found');
      }

      return { profile_name: decoded.profile_name };
  } catch (error) {
      console.error('Error while decoding token:', error.message);
      throw error;
  }
};

// Serviço para pegar o e-mail do usuário
async function getUserEmailByEmail(email) {
  try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
          console.log('Usuário não encontrado no banco de dados:', email);
      }
      return user;
  } catch (error) {
      console.log('Erro ao buscar o usuário:', error.message);
      throw error;
  }
}

// Função para inserir um novo usuário
const insertUser = async (registration, username, store_id, profile_id, email, password) => {
  try {
    const existingUser = await User.findOne({ where: { registration } });
    if (existingUser) {
      throw new Error('User with this registration already exists');
    }

    const user = await User.create({
      registration,
      username,
      store_id,
      profile_id, 
      email,
      password,
    });
    return user;
  } catch (error) {
    console.error('Error while inserting user:', error.message);
    throw error;
  }
};
// Função para editar um usuário
const editUser = async (registration, username, store_id, profile_id, email, password) => {
  try {
    const user = await User.findOne({ where: { registration } });
    if (!user) {
      throw new Error('User not found');
    }

    const [rowsUpdated, [updatedUser]] = await User.update(
      {
        username,
        store_id,
        profile_id,
        email,
        password,
      },
      {
        where: { registration },
        returning: true, 
      }
    );

    if (rowsUpdated === 0) {
      throw new Error('User not updated');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error while editing user:', error.message);
    throw error;
  }
};

// Função para excluir um usuário
const deleteUser = async (registration) => {
  try {
    const user = await User.findOne({ where: { registration } });
    if (!user) {
      throw new Error('User not found');
    }

    await User.destroy({ where: { registration } });
    return user; 
  } catch (error) {
    console.error('Error while deleting user:', error.message);
    throw error;
  }
};

// Função para consultar todos os usuários
const userConsultAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error while consulting all users:', error.message);
    throw error;
  }
};

// Função para consultar um usuário por registro
const userConsultByRegistration = async (registration) => {
  try {
    const user = await User.findOne({ where: { registration } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error while consulting user by registration:', error.message);
    throw error;
  }
};

module.exports = { getUserEmailByEmail, insertUser, editUser, deleteUser, userConsultAll, userConsultByRegistration, getProfileFromToken };

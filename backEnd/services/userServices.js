const { User } = require('../model/index');

// Função para inserir um novo usuário
const insertUser = async (registration, username, store_id, profile_id, email, password) => {
  try {
    // Verifica se o usuário já existe antes de criar um novo
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
    return user; // Retorna os dados do usuário excluído
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

module.exports = { insertUser, editUser, deleteUser, userConsultAll, userConsultByRegistration };

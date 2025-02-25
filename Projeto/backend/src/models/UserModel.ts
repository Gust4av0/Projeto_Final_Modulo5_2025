import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';  // Importando a conexão com o banco

class UserModel extends Model {}

// Definindo o modelo de usuário
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM('admin', 'cliente'),
      defaultValue: 'cliente',  // Valor padrão como 'cliente'
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
  },
  {
    sequelize,  // Passando a instância do sequelize
    modelName: 'UserModel',  // Nome do modelo
    tableName: 'users',  // Nome da tabela no banco de dados
    timestamps: false
  }
);

export default UserModel;

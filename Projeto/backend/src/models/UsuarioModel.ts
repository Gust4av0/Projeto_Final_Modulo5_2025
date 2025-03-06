import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';  // Importando a conexão com o banco

class UsuarioModel extends Model {
  id: number | undefined;
  nome: string | undefined;
  email: string | undefined;
  senha: string | undefined;
  tipo: 'admin' | 'cliente' | undefined;
  cpf: string | undefined;
}

// Definindo o modelo de usuário
UsuarioModel.init(
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
    modelName: 'UsuarioModel',  // Nome do modelo
    tableName: 'usuarios',  // Nome da tabela no banco de dados
    timestamps: false
  }
);

export default UsuarioModel;

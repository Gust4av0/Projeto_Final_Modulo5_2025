// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/database';
// import { DATE } from 'sequelize';

// class VeiculosModel extends Model {}

// VeiculosModel.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       marca: {
//         type: DataTypes.STRING,
//         allowNull: false, 
//       },
//       modelo: {
//         type: DataTypes.STRING, 
//         allowNull: false,
//       },
//       ano: {
//         type: DataTypes.INTEGER, 
//         allowNull: false,
//       },
//       placa: {
//         type: DataTypes.STRING,
//         allowNull: false, 
//         unique: true,
//       },
//       preco_por_dia: {
//         type: DataTypes.FLOAT //VERIFICAR
//       },
//       imagem: {
//         type: DataTypes.STRING, 
//         allowNull: false,
//       }
//     },
//     {
//       sequelize, 
//       modelName: "VeiculosModel",
//       tableName: "veiculos",
//       timestamps: false,
//     }
//   );
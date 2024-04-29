module.exports = (sequelize, dataTypes) => {
  let alias = "Pedido";

  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: dataTypes.DATE,
      allowNull: true,
    },

    pedido: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    comentario_pago:{
      type: dataTypes.STRING(255),
      allowNull: false,
    },
    total_pago: {
      type: dataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
  };
  let config = {
    timestamps: true,
    updatedAt: "fecha",
    underscored: true,
  };
  const Pedido = sequelize.define(alias, cols, config);

  return Pedido;
};

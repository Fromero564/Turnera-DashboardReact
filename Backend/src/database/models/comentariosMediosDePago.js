module.exports = (sequelize, dataTypes) => {
  let alias = "ComentariosMediosDePago";
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
    comentario: {
      type: dataTypes.STRING(255),
      allowNull: true,
    },
    medio_de_pago: {
      type: dataTypes.STRING(255),
      allowNull: false,
    },
  };
  let config = {
    timestamps: false,
  };
  const ComentariosMediosDePago = sequelize.define(alias, cols, config);

  return ComentariosMediosDePago;
};

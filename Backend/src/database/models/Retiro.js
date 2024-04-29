module.exports = (sequelize, dataTypes) => {
    let alias = 'Retiro';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        };
    let config = {
        timestamps: false,
    }
    const Retiro = sequelize.define(alias, cols, config); 
    
    
    return Retiro
  
    };

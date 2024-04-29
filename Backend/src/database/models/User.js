module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        
        };
    let config = {
        timestamps: false,
    }
    const User = sequelize.define(alias, cols, config); 
    
    
    return User
  
    };

    

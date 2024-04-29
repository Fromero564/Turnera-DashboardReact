module.exports = (sequelize, dataTypes) => {
    let alias = 'Producto';
    let cols = {
        nombre: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        precio: {
            type: dataTypes.DECIMAL(6,2),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
         
    };
    let config = {
        timestamps: false,
       
    }
    const Producto = sequelize.define(alias, cols, config); 


    return Producto
}

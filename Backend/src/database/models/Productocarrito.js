

module.exports = (sequelize,DataTypes)=>{
    let alias = "Productocarrito"
    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        productos_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Productos',
                key: 'id',
              },
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        }

    
}
let config = {
    timestamps: false,
}
const Productocarrito = sequelize.define(alias, cols, config); 


// UN CARRITO PUEDE TENER MUCHOS PRODUCTOS

Productocarrito.associate = function (models) {
    Productocarrito.belongsTo(models.Producto,{
         foreignKey: 'productos_id' 
        });

    }

    return Productocarrito;
}
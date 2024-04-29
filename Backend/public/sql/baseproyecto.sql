-- Cambios para la tabla `comentariosMediosDePagos`
DROP TABLE IF EXISTS `comentariosMediosDePagos`;
CREATE TABLE `comentariosMediosDePagos`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `user_id` INTEGER,
    `comentario` TEXT NULL,
    `medio_de_pago` TEXT NOT NULL
);

-- Cambios para la tabla `productos`
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `nombre` TEXT NOT NULL,
    `precio` TEXT NOT NULL,
    `descripcion` TEXT NOT NULL
);

-- Cambios para la tabla `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT
);


-- Cambios para la tabla `productocarritos`
DROP TABLE IF EXISTS `productocarritos`;
CREATE TABLE `productocarritos`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `cantidad` INTEGER,
    `productos_id` INTEGER,
    `user_id` INTEGER
);

-- Cambios para la tabla `pedidos`
DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE `pedidos`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `user_id` INTEGER,
    `fecha` TEXT DEFAULT CURRENT_TIMESTAMP,
    `pedido` TEXT NOT NULL,
    `comentario_pago` TEXT NOT NULL,
    `total_pago` INTEGER,
    `created_at` TEXT DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Cambios para la tabla `pedidosderespaldos`
DROP TABLE IF EXISTS `pedidosderespaldos`;
CREATE TABLE `pedidosderespaldos`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `user_id` INTEGER,
    `fecha` TEXT DEFAULT CURRENT_TIMESTAMP,
    `pedido` TEXT NOT NULL,
    `comentario_pago` TEXT NOT NULL,
    `total_pago` INTEGER,
    `created_at` TEXT DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Cambios para la tabla `retiros`
DROP TABLE IF EXISTS `retiros`;
CREATE TABLE `retiros`(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `user_id` INTEGER
);

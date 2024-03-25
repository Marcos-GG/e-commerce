const { CompraProducto, Compras, Products, User } = require("../../db");

const handlerCompras = async (req, res) => {
  try {
    const { id } = req.query;

    const compras = await Compras.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: CompraProducto,
          include: {
            model: Products,
          },
        },
      ],
    });

    const user = await User.findByPk(id);

    return res.status(200).json({ compras, email: user.email });
  } catch (err) {
    return res.json({ error: err?.toString() });
  }
};

module.exports = handlerCompras;

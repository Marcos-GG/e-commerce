const {
  MercadoPagoConfig,
  Preference,
  Payment,
  MerchantOrder,
} = require("mercadopago");
const { Compras, CompraProducto, User } = require("../../db");
const compraFinalizada = require("../../Email/CompraFinalizada");

require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN || "",
});
const payment = new Payment(client);

const merchantOrder = new MerchantOrder(client);

const webhookHandler = async (req, res) => {
  // info del payment para solicitar / ver info del pago
  const query = req.query;

  try {
    if (query.type == "payment") {
      const paymentId = query["data.id"];

      const pymentInfo = await payment.get({ id: paymentId });
    }

    if (query.topic == "merchant_order") {
      const order = await merchantOrder.get({
        merchantOrderId: req.query.id,
      });

      const Find = await Compras.findAll({
        where: {
          id_merchant_order: req.query.id,
        },
      });

      if (Find?.length === 0) {
        const CompraCreada = await Compras.create({
          userId: order.additional_info,
          id_merchant_order: req.query.id,
          monto_total: order.total_amount,
          status: order.order_status,
        });

        const AgregarProductos = [];

        order.items.forEach((el) => {
          let quantity = el.quantity;

          for (let i = 0; i < quantity; i++) {
            AgregarProductos.push({
              id_compra: CompraCreada.id,
              id_producto: el.id,
            });
          }
        });

        const user = await User.findByPk(order.additional_info);

        compraFinalizada(user.name, user.email);

        await CompraProducto.bulkCreate(AgregarProductos);
      } else {
        await Compras.update(
          {
            status: order.order_status,
          },
          {
            where: {
              id_merchant_order: req.query.id,
            },
          }
        );
      }
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500);
  }
};

module.exports = webhookHandler;

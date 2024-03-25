// SDK
const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN || "",
});

const paymentHandler = async (req, res) => {
  try {
    const { products, userId } = req.body;

    const items = [];

    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      items.push({
        id: product.id,
        title: product.title,
        quantity: product.cantidad,
        currency_id: "ARS",
        unit_price: Number(product.price),
      });
    }

    const bodyProducts = {
      items,
      back_urls: {
        success: "http://localhost:5173/",
        failure: "http://localhost:5173/",
        pending: "http://localhost:5173/",
      },
      //timer al finalizar
      auto_return: "approved",
      notification_url: "https://1bhml602-38621.brs.devtunnels.ms/webhook",
      additional_info: userId,
    };

    const preference = new Preference(client);
    const response = await preference.create({ body: bodyProducts });

    return res.status(200).json({ id: response.id });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = paymentHandler;

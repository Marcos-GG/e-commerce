const { Products, Like, User, Comment, Answer } = require("../../db");

const getProductController = async (id) => {
  if (id) {
    const idProduct = await Products.findByPk(id, {
      include: [
        {
          model: Like,
          include: { model: User, attributes: ["name", "lastname"] },
        },
        {
          model: Comment,
          include: [
            { model: User, attributes: ["name", "lastname"] },
            {
              model: Answer,
              include: { model: User, attributes: ["name", "lastname"] },
            },
          ],
        },
      ],
    });

    return idProduct;
  }

  const allProducts = await Products.findAll({
    include: [
      {
        model: Like,
        include: { model: User, attributes: ["name", "lastname"] },
      },
      {
        model: Comment,
        include: [
          { model: User, attributes: ["name", "lastname"] },
          {
            model: Answer,
            include: { model: User, attributes: ["name", "lastname"] },
          },
        ],
      },
    ],
  });

  return allProducts;
};

module.exports = getProductController;

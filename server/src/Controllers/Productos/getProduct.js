const { Op } = require("sequelize");
const { Products, Like, User, Comment, Answer } = require("../../db");

const getProductController = async (id, search, page) => {
  try {
    let pageSize = 20;
    let offset = (page - 1) * pageSize;

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
              {
                model: User,
                attributes: ["name", "lastname", "admin", "active"],
              },
              {
                model: Answer,
                include: {
                  model: User,
                  attributes: ["name", "lastname", "admin", "active"],
                },
              },
            ],
          },
        ],
      });

      const relacionados = await Products.findAll({
        attributes: ["id", "image1", "price", "title"],
        where: {
          category: idProduct.category,
          gender: idProduct.gender,
        },
      });

      const productosRelacionados = relacionados.filter(
        (product) => product.id !== idProduct.id
      );

      return { idProduct, relacionados: productosRelacionados };
    }

    // separamos el valor de search
    const searchTerms = search ? search.split(" ") : [];
    const stopWords = [
      "del",
      "de",
      "el",
      "ella",
      "desde",
      "como",
      "pero",
      "la",
      "otro",
      "ellos",
      "ellas",
      "esos",
      "cómo",
      "donde",
      "e",
      "y",
      "a",
      "por",
      "que",
      "su",
      "se",
      "un",
      "una",
      "son",
      "tienen",
      "tienen",
      "tu",
      "tus",
      "unos",
    ];

    const filterSearchTerms = searchTerms.filter(
      (term) => !stopWords.includes(term.toLowerCase())
    );

    const palabras = filterSearchTerms.map((term) => ({
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${term}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${term}%`,
          },
        },
      ],
    }));

    // Op.and es el operador que permite combinar esas condiciones para formar una sola condición lógica. todas tienen que ser true ( en este caso las condiciones de palabras )

    if (search) {
      const products = await Products.findAll({
        where: {
          [Op.and]: palabras,
        },
        include: { model: Like },
        offset,
        limit: pageSize,
      });

      const totalFilteredProducts = await Products.count({
        where: {
          [Op.and]: palabras,
        },
      });

      return {
        products,
        productosFiltrados: totalFilteredProducts,
      };
    }

    if (page) {
      const paginatedProducts = await Products.findAll({
        include: [
          {
            model: Like,
            include: { model: User, attributes: ["name", "lastname"] },
          },
          {
            model: Comment,
            include: [
              { model: User, attributes: ["name", "lastname", "admin"] },
              {
                model: Answer,
                include: {
                  model: User,
                  attributes: ["name", "lastname", "admin"],
                },
              },
            ],
          },
        ],
        where: { status: true },
        offset,
        limit: pageSize,
      });

      const totalProducts = await Products.count({
        where: { status: true },
      });

      const precioMaximo = await Products.max("price", {
        where: { status: true },
      });

      return {
        products: paginatedProducts,
        totalProducts: totalProducts,
        precioMaximo,
      };
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
            { model: User, attributes: ["name", "lastname", "admin"] },
            {
              model: Answer,
              include: {
                model: User,
                attributes: ["name", "lastname", "admin"],
              },
            },
          ],
        },
      ],
    });

    return {
      products: allProducts,
    };
  } catch (error) {
    throw new Error("Error al obtener productos: " + error.message);
  }
};

module.exports = getProductController;

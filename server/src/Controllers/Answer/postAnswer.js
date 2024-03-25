const { Answer, User, Comment, Products } = require("../../db");

const postAnswerController = async ({ userId, commentId, answer }) => {
  const createAnswer = await Answer.create({
    userId,
    commentId,
    answer,
  });

  if (!createAnswer) throw new Error("No se pudo crear el comentario");

  const idAnswer = createAnswer.id;

  const answerCompleto = await Answer.findByPk(idAnswer, {
    include: [
      { model: User, attributes: ["name", "lastname"] },
      {
        model: Comment,
        attributes: ["id"],
        include: {
          model: Products,
          attributes: ["id"],
        },
      },
    ],
  });

  return answerCompleto;
};

module.exports = postAnswerController;

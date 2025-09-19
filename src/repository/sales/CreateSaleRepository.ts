import { PrismaClient } from "@prisma/client";
import { Sale } from "../../interfaces/SaleInterface";

const prisma = new PrismaClient();

export const CreateSaleRepository = async (data: Sale) => {
  try {
    console.log(data);
    const venda = await prisma.sale.create({
      data: {
        nomeProduto: data.nomeProduto,
        quantidadeProduto: Number(data.quantidadeProduto),
        precoVenda: Number(data.precoVenda),
        precoCusto: Number(data.precoCusto),

      },
    });
    return venda;
  } catch (erro) {
    throw new Error("Erro ao criar venda");
  } finally {
    prisma.$disconnect();
  }
};

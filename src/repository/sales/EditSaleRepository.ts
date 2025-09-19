import { PrismaClient } from "@prisma/client";
import { Sale } from "../../interfaces/SaleInterface";

const prisma = new PrismaClient();

export const EditSaleRepository = async (RefId: any, sale: Sale) => {
  try {
    const saleUpdate = await prisma.sale.update({
      where: {
        id: RefId.id,
      },
      data: {
        nomeProduto: sale.nomeProduto,
        precoCusto: Number(sale.precoCusto),
        precoVenda: Number(sale.precoVenda),
        quantidadeProduto: Number(sale.quantidadeProduto),
      },
    });
    return saleUpdate;
  } catch (erro) {
    throw new Error();
  } finally {
    prisma.$disconnect();
  }
};

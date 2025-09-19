import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetSalesDataRepository = async () => {
  try {
    const total = await prisma.sale.aggregate({
      _sum: {
        precoVenda: true,
        precoCusto: true,
      },
    });

    const totalValorSales = total._sum.precoVenda || 0;
    const totalValorCusto = total._sum.precoCusto || 0;
    const lucroTotal = totalValorSales - totalValorCusto;

    const hoje = new Date();
    const inicioDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      0,
      0,
      0
    );
    const fimDia = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
      23,
      59,
      59
    );

    const dia = await prisma.sale.aggregate({
      _sum: {
        precoVenda: true,
        precoCusto: true,
      },
      where: {
        data: {
          gte: inicioDia,
          lte: fimDia,
        },
      },
    });

    const totalValorSalesDia = dia._sum.precoVenda || 0;
    const totalValorCustoDia = dia._sum.precoCusto || 0;
    const lucroDoDia = totalValorSalesDia - totalValorCustoDia;

    const totalVendas = await prisma.sale.count();

    return {
      totalValorSales,
      totalValorCusto,
      lucroTotal,
      totalValorSalesDia,
      totalVendas,
      lucroDoDia,
    };
  } catch (erro) {
    throw new Error("Erro ao buscar lucro total e do dias");
  } finally {
    prisma.$disconnect();
  }
};

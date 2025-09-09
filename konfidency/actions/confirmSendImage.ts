import { AppContext } from "../mod.ts";
import { logger } from "@deco/deco/o11y";

export interface Props {
  reviewId: string;
  sku: string;
  updateToken: string;
  key: string;
}

export default async function action(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { customer, api } = ctx;
  const { reviewId, sku, updateToken, key } = props;

  const keys = [key];

  try {

    const confirmResponse = await api[`POST /:customer/:sku/review/:reviewId/pictures/confirm`]({
      customer,
      sku,
      reviewId,
    }, {
      body: {
        updateToken,
        keys,
      },
    }).then((res) => res.json()).catch((err) => {
      logger.error(`Erro ao confirmar upload: ${err.message}`);
      return null;
    });

    if (!confirmResponse) {
      throw new Error("Falha ao confirmar upload");
    }

    return confirmResponse;
  } catch (error) {
    const errorObj = error as Error;
    logger.error(`Erro no processo de upload: ${errorObj.message}`);
    return { success: false, error: errorObj.message };
  }
}
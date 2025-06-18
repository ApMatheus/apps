import { AppContext } from "../mod.ts";
import { logger } from "@deco/deco/o11y";
import { ResponsePresign } from "../utils/types.ts";

export interface Props {
  reviewId: string;
  image: {
    type: string;
    size: number;
  };
  sku: string;
  updateToken: string;
}

export default async function action(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { customer, api } = ctx;
  const { reviewId, image, sku, updateToken } = props;
  try {
    const response: ResponsePresign | null = await api[`POST /:customer/:sku/review/:reviewId/pictures/presign`]({
      customer,
      sku,
      reviewId,
    }, {
      body: {
        updateToken,
        mimeType: image.type,
        fileSize: image.size,
      },
    }).then((res) => res.json() as Promise<ResponsePresign>).catch((err) => {
      logger.error(`Erro ao obter presign: ${err.message}`);
      return null;
    });

    if (!response) {
      throw new Error("Falha ao obter URL de presign");
    }

    return response;
  } catch (error) {
    const errorObj = error as Error;
    logger.error(`Erro no processo de upload: ${errorObj.message}`);
    return { success: false, error: errorObj.message };
  }
}
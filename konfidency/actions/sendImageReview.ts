import { AppContext } from "../mod.ts";
import { logger } from "@deco/deco/o11y";

export interface Props {
  reviewId: string;
  image: File;
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
  console.log("reviewId entrou nesta action",)

  const formData = new FormData();
  formData.append("image", image);

  console.log("formData", formData)

  console.log("customer", customer)
  console.log("sku", sku)
  console.log("reviewId", reviewId)
  console.log("updateToken", updateToken)

  const presignResp = await fetch(
    `https://www.vizzent.com.br/${customer}/${sku}/review/${reviewId}/pictures/presign`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        updateToken: updateToken,
        contentTypes: ["image/jpeg", "image/png"],
      }),
    }
  );

  console.log("presignResp", presignResp)

  if (!presignResp.ok) {
    console.error('Erro ao obter URL presign');
    return;
  }

  const { urls } = await presignResp.json();
  const { uploadUrl, confirmUrl, fileKey } = urls[0];

  console.log("uploadUrl", uploadUrl)
  console.log("confirmUrl", confirmUrl)
  console.log("fileKey", fileKey)
  console.log("presignResp", presignResp)

  try {
    const response = await api[`POST /:customer/:sku/review/:reviewId/pictures/presign`]({
      customer,
      sku: sku,
      reviewId: reviewId,
    }, {
      body: {
        updateToken: updateToken,
        contentTypes: ["image/jpeg", "image/png"]
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    console.log("response", response)
    return response;
  } catch (error) {
    console.log("error", error)
    const errorObj = error as { name: string; message: string };
    logger.error(`{ errorName: ${errorObj.name},  
    errorMessage: ${errorObj.message} }`);
    return null;
  }
}
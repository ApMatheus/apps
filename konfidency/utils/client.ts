import type { PDPReview, ResponseWriteReview, WriteReview } from "./types.ts";

export interface API {
  "GET /:customer/:sku/summary/:sortField,:sortOrder": {
    response: PDPReview;
    searchParams: {
      page: number;
      pageSize: number;
    };
  };

  "POST /:customer/:sku/review": {
    response: ResponseWriteReview;
    body: WriteReview;
  };

  "POST /:customer/:sku/review/:reviewId/pictures/presign": {
    body: {
      updateToken: string;
      mimeType: string;
      fileSize: number;
    };
  };

  "POST /:customer/:sku/review/:reviewId/pictures/confirm": {
    body: {
      updateToken: string;
      keys: string[];
    };
  };
}

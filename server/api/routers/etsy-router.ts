import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const etsyRouter = createTRPCRouter({
  getShopReviews: publicProcedure.query(async function(): Promise<{
    success: boolean,
    reviews?: {
      shop_id: number,
      listing_id: number,
      transaction_id: number,
      buyer_user_id?: number,
      rating: number,
      review: string,
      language: string,
      image_url_fullxfull?: string,
      create_timestamp: number,
      created_timestamp: number,
      update_timestamp: number,
      updated_timestamp: number,
    }[],
  }> {
    try {
      const reviews = [];
      let offset = 0;
      while (true) {
        const response = await fetch(`https://openapi.etsy.com/v3/application/shops/25173486/reviews?limit=100&offset=${offset.toString()}`, {
          headers: {
            "x-api-key": process.env.ETSY_KEY!,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          reviews.push(...data.results);
          if (reviews.length >= data.count) {
            break;
          } else {
            offset += data.results.length;
          };
        };
      };
      return { success: true, reviews };
    } catch(err) {
      console.warn(err);
      return { success: false };
    };
  }),
  getUser: publicProcedure.input(z.object({
    userId: z.number(),
  })).query(async function({ input: { userId } }): Promise<{
    success: boolean,
    user?: {
      user_id: number,
      primary_email?: string,
      first_name?: string,
      last_name?: string,
      image_url_75x75?: string,
    },
  }> {
    try {
      const response = await fetch(`https://openapi.etsy.com/v3/application/users/${userId.toString()}`, {
        headers: {
          "authorization": `Bearer ${process.env.ETSY_ACCESS!}`,
          "x-api-key": process.env.ETSY_KEY!,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          const newAccess = await fetch("https://api.etsy.com/v3/public/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=refresh_token&client_id=${process.env.ETSY_KEY!}&refresh_token=${process.env.ETSY_REFRESH!}`,
          });
          if (newAccess.ok) {
            const data = await newAccess.json();
            process.env.ETSY_ACCESS = data.access_token;
            return { success: false };
          } else {
            throw new Error("Error refreshing access token");
          };
        } else {
          throw new Error("Error fetching user");
        };
      };
      const user = await response.json();
      return { success: true, user };
    } catch(err) {
      console.warn(err);
      return { success: false };
    };
  }),
});
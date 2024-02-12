import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";
import Image from "next/image";
import { Suspense } from "react";

async function Reviews() {
  try {
    const AllReviews: Set<{
      rating: number,
      review: string,
      reviewer: string,
      reviewer_pfp: string,
      attached_photo?: string,
      created_timestamp: Date,
      updated_timestamp: Date,
    }> = new Set();

    const EtsyReviews = await api.etsyRouter.getShopReviews.query();
    if (EtsyReviews.success) {
      if (EtsyReviews.reviews) {
        for (const Review of EtsyReviews.reviews) {
          try {
            if (!Review.buyer_user_id) {
              throw new Error("No buyer user id");
            };
            const EtsyUser = await api.etsyRouter.getUser.query({
              userId: Review.buyer_user_id,
            });
            if (EtsyUser.success) {
              if (EtsyUser.user) {
                const User = EtsyUser.user;
                AllReviews.add({
                  rating: Review.rating,
                  review: Review.review,
                  reviewer: User.first_name ? User.last_name ? `${User.first_name} ${User.last_name}` : User.first_name : "Etsy Buyer",
                  reviewer_pfp: User.image_url_75x75 && User.image_url_75x75 !== "https://www.etsy.com/images/avatars/default_avatar_75x75.png" ? User.image_url_75x75 : "/avatars/etsy_default.jpeg",
                  attached_photo: Review.image_url_fullxfull,
                  created_timestamp: new Date(Review.created_timestamp * 1000),
                  updated_timestamp: new Date(Review.updated_timestamp * 1000),
                });
              } else {
                console.warn("Etsy router returned successful for user but returned no user.");
              };
            } else {
              console.warn("Error fetching user from Etsy.");
            };
          } catch(Err) {
            console.warn(Err);
            AllReviews.add({
              rating: Review.rating,
              review: Review.review,
              reviewer: "Etsy Buyer",
              reviewer_pfp: "/avatars/etsy_default.jpeg",
              attached_photo: Review.image_url_fullxfull,
              created_timestamp: new Date(Review.created_timestamp * 1000),
              updated_timestamp: new Date(Review.updated_timestamp * 1000),
            });
          };
        };
      } else {
        console.warn("Etsy router returned successful for reviews but returned no reviews.");
      }
    } else {
      console.warn("Error fetching reviews from Etsy.");
    };

    return Array.from(AllReviews).map(function(Review) {
      return (
        <Card>
          <CardHeader>
            <main className="flex flex-col flex-wrap sm:flex-row sm:flex-nowrap justify-center sm:justify-between items-center">
              <main className="flex justify-center items-center gap-2">
                <Image src={Review.reviewer_pfp} alt={`${Review.reviewer}'s Profile Picture`} height={500} width={500} sizes="(min-width: 768px) 10vw, 20vw" className="h-8 w-8 aspect-square rounded-full" />
                <CardTitle>{Review.reviewer}</CardTitle>
              </main>
              <aside className="flex flex-col items-end">
                <div className="flex gap-1">
                  {
                    Array.from({ length: Review.rating }).map(function(_, Index) {
                      return (
                        <svg xmlns="http://www.w3.org/2000/svg" key={`${Review.reviewer}_${Index}_star`} role="presentation" viewBox="0 0 576 512" className="fill-yellow-500 h-4">
                          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                        </svg>
                      );
                    })
                  }
                  {
                    Array.from({ length: 5 - Review.rating }).map(function(_, Index) {
                      return (
                        <svg xmlns="http://www.w3.org/2000/svg" key={`${Review.reviewer}_${Index}_star`} role="presentation" viewBox="0 0 576 512" className="fill-yellow-500 h-4">
                          <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
                        </svg>
                      );
                    })
                  }
                </div>
                <p>{Review.rating} {Review.rating === 1 ? "star" : "stars"}</p>
              </aside>
            </main>
            <CardDescription>
              Review written on {Review.created_timestamp.toLocaleDateString()} at {Review.created_timestamp.toLocaleTimeString()}
              {Review.created_timestamp.getSeconds() !== Review.updated_timestamp.getSeconds() ? `, last updated on ${Review.updated_timestamp.toLocaleDateString()} at ${Review.updated_timestamp.toLocaleTimeString()}` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-wrap md:flex-row md:flex-nowrap gap-4">
            <p>{Review.review || "No review written."}</p>
            {Review.attached_photo ? <Image src={Review.attached_photo} alt={`Photo of purchased item attached by ${Review.reviewer}`} height={500} width={500} sizes="(min-width: 768px) 20vw, 40vw" /> : ""}
          </CardContent>
        </Card>
      );
    });
  } catch(Err) {
    return (
      <p>Error getting all reviews</p>
    );
  };
};

export default function Page() {
  return (
    <main>
      <PageHeader src="/images/shop.png" alt="Reviews background image">
        <h1 className="text-4xl sm:text-7xl">Reviews</h1>
      </PageHeader>
      <main className="grid lg:grid-cols-2 p-8 gap-2 mb-4">
        <Suspense fallback={
          <p className="text-xl">Loading reviews...</p>
        }>
          <Reviews />
        </Suspense>
      </main>
    </main>
  );
};
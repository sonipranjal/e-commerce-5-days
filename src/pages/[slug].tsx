import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/utils";
import { useRouter } from "next/router";
import React from "react";

const ProductPage = () => {
  const router = useRouter();

  console.log(router.query.slug);

  const currentProduct = mockData.find((p) => p.slug === router.query.slug);

  const handleBuyProduct = () => {
    console.log("buy now functionality!");
  };

  return (
    <MainLayout>
      <div>
        <img
          src={currentProduct?.imageUrl}
          alt={currentProduct?.name}
          className="h-full w-96 overflow-hidden"
        />
      </div>
      <div>{currentProduct?.name}</div>
      <div>{currentProduct?.description}</div>
      <div>Available Quantity: {currentProduct?.quantityAvailable}</div>
      <div>
        <Button onClick={handleBuyProduct}>Buy Now</Button>
      </div>
    </MainLayout>
  );
};

export default ProductPage;

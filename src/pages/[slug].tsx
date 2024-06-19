import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const router = useRouter();

  const getAllProducts = api.products.getAllProducts.useQuery();

  const currentProduct = getAllProducts.data?.gotAllProducts.find(
    (p) => p.slug === router.query.slug,
  );

  const checkout = api.products.checkout.useMutation();

  const handleBuyProduct = () => {
    if (!currentProduct?.id) return toast.error("product not found!");

    checkout.mutate(
      {
        productId: currentProduct.id,
      },
      {
        onSuccess: ({ url }) => {
          if (url) {
            router.push(url);
          }
        },
      },
    );
  };

  return (
    <MainLayout>
      <div>
        <img
          src={currentProduct?.imageUrl}
          alt={currentProduct?.name ?? ""}
          className="h-full w-96 overflow-hidden"
        />
      </div>
      <div>{currentProduct?.name}</div>
      <div>{currentProduct?.description}</div>
      <div>Available Quantity: {currentProduct?.quantity}</div>
      <div>Product Price: {currentProduct?.price}</div>
      <div>
        <Button onClick={handleBuyProduct} disabled={checkout.isPending}>
          {checkout.isPending ? "Loading" : "Buy Now"}
        </Button>
      </div>
    </MainLayout>
  );
};

export default ProductPage;

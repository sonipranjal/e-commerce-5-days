import AdminLayout from "@/components/layouts/admin-layout";
import ProductManageDialog from "@/components/product-manage-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [isProductManageDialogOpen, setIsProductManageDialogOpen] =
    useState(false);

  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >(undefined);

  const getAllProducts = api.admin.getAllProducts.useQuery();

  useEffect(() => {
    if (selectedProductId) {
      setIsProductManageDialogOpen(true);
    }
  }, [selectedProductId]);

  useEffect(() => {
    if (!isProductManageDialogOpen) {
      setSelectedProductId(undefined);
    }
  }, [isProductManageDialogOpen]);

  return (
    <AdminLayout>
      <ProductManageDialog
        isOpen={isProductManageDialogOpen}
        setIsOpen={setIsProductManageDialogOpen}
        productId={selectedProductId}
      />
      <div className="mt-28 p-10">
        <div className="my-6 flex w-full flex-row justify-end">
          <Button
            size={"lg"}
            onClick={() => {
              setIsProductManageDialogOpen(true);
            }}
          >
            Add New Product
          </Button>
        </div>
        <div className="grid grid-cols-2 place-items-center gap-4">
          {getAllProducts.isLoading && <div>Loading...</div>}

          {getAllProducts.isSuccess &&
            getAllProducts.data.gotAllProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSelectedProductId(product.id);
                }}
                className="flex max-w-96 flex-col items-start gap-6 rounded-xl border border-gray-300 bg-white p-4 shadow-lg hover:border-black"
              >
                <div>
                  <img
                    src={product.imageUrl}
                    alt={product.name ?? ""}
                    className="h-full w-96 overflow-hidden"
                  />
                </div>
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>Available Quantity: {product.quantity}</div>
                <div>Price: ${product.price}</div>
              </button>
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

import AdminLayout from "@/components/layouts/admin-layout";
import ProductManageDialog from "@/components/product-manage-dialog";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >(undefined);

  return (
    <AdminLayout>
      <ProductManageDialog
        productId={selectedProductId}
        onClose={(open) => {
          if (!open) {
            setSelectedProductId(undefined);
          }
          setIsCreateProductDialogOpen(open);
        }}
        isOpen={isCreateProductDialogOpen}
      />
      <div className="mt-28 p-10">
        <div className="my-6 flex w-full flex-row justify-end">
          <Button
            size={"lg"}
            onClick={() => {
              setIsCreateProductDialogOpen(true);
            }}
          >
            Add New Product
          </Button>
        </div>
        <div className="grid grid-cols-2 place-items-center gap-4">
          {mockData.map((product) => (
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
                  alt={product.name}
                  className="h-full w-96 overflow-hidden"
                />
              </div>
              <div>{product.name}</div>
              <div>{product.description}</div>
              <div>Available Quantity: {product.quantityAvailable}</div>
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

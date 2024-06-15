import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdminLayout from "@/components/layouts/admin-layout";

const OrderDialog = ({ orderId }: { orderId: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full rounded-xl border bg-white p-4 text-left shadow hover:border-black">
          <div>Order: {orderId}</div>
          <div>Order Status: Success</div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order {orderId}</DialogTitle>
          <DialogDescription>Order Status: Success</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div>
            <div>Items Purchased</div>
            <div>Item Name</div>
          </div>
          <div>
            <div>Payment Status</div>
            <div>Success | Failure</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AdminOrders = () => {
  return (
    <AdminLayout>
      <div className="mt-28 p-10">
        <div className="grid grid-cols-2 place-items-center gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <OrderDialog orderId={i + 1} key={i} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;

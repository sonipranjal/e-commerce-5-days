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
import { RouterOutputs, api } from "@/utils/api";

const OrderDialog = ({
  order,
}: {
  order: RouterOutputs["admin"]["getAllOrders"]["allOrders"][number];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full rounded-xl border bg-white p-4 text-left shadow hover:border-black">
          <div>Order: {order.orders.id}</div>
          <div>Order Status: Success</div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order {order.orders.id}</DialogTitle>
          <DialogDescription>Order Status: Success</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div>
            <div>Item Purchased</div>
            <div>{order.products.name}</div>
          </div>
          <div>
            <div>Payment Status</div>
            <div>{order.orders.paymentStatus ? "Success" : "Failure"}</div>
          </div>
          <div>
            <div>Order Status</div>
            <div>{order.orders.orderStatus ? "Processed" : "Processing"}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AdminOrders = () => {
  const getAllOrders = api.admin.getAllOrders.useQuery();

  return (
    <AdminLayout>
      <div className="mt-28 flex flex-col space-y-4 p-10">
        {getAllOrders.isPending && <p>Loading orders...</p>}
        {getAllOrders.isSuccess &&
          getAllOrders.data.allOrders.map((order, i) => (
            <OrderDialog order={order} key={order.orders.id} />
          ))}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;

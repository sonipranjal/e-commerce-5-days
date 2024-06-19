import MainLayout from "@/components/layouts/main-layout";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RouterOutputs, api } from "@/utils/api";

const OrderDialog = ({
  order,
}: {
  order: RouterOutputs["products"]["getUserOrders"]["userOrders"][number];
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

const Orders = () => {
  const getUserOrders = api.products.getUserOrders.useQuery();

  return (
    <MainLayout>
      <div className="flex w-full flex-col gap-y-4 p-4">
        {getUserOrders.isPending && <p>Loading orders...</p>}
        {getUserOrders.isSuccess &&
          getUserOrders.data.userOrders.map((order, i) => (
            <OrderDialog order={order} key={order.orders.id} />
          ))}
      </div>
    </MainLayout>
  );
};

export default Orders;

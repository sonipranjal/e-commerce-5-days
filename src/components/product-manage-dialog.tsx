import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TrashIcon } from "@radix-ui/react-icons";
import { api } from "@/utils/api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  imageUrl: z.string().url(),
  quantity: z.coerce.number().min(0),
  slug: z.string().min(3),
  price: z.coerce.number().default(0),
});

const ProductManageDialog = ({
  productId,
  isOpen,
  setIsOpen,
}: {
  productId?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) => {
  const getProductById = api.admin.getProductById.useQuery(
    {
      productId: productId as string,
    },
    {
      enabled: Boolean(productId),
    },
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const createProduct = api.admin.createProduct.useMutation();
  const updateProduct = api.admin.updateProduct.useMutation();
  const deleteProduct = api.admin.deleteProduct.useMutation();
  const utils = api.useUtils();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (productId) {
      updateProduct.mutate(
        {
          ...values,
          productId,
        },
        {
          onSuccess: () => {
            toast.success("product updated successfully!");
            setIsOpen(false);
            form.reset();
            utils.invalidate();
          },
        },
      );
      return;
    }
    createProduct.mutate(values, {
      onSuccess: () => {
        form.reset();
        toast.success("product create successfully!");
        setIsOpen(false);
        utils.invalidate();
      },
    });
  }

  useEffect(() => {
    const productData = getProductById.data?.gotProduct;
    if (productData) {
      console.log("setting form data from api");
      form.reset({
        ...productData,
        name: productData.name ?? "",
        description: productData.description ?? "",
        price: productData.price ?? 0,
      });
    }
    if (!isOpen) {
      form.reset({
        name: "",
        description: "",
        imageUrl: "",
        quantity: 0,
        slug: "",
      });
    }
  }, [getProductById.data, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-screen h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2">
            <div>{Boolean(productId) ? "Manage" : "Create"} Product</div>
            {Boolean(productId) && (
              <Button
                disabled={deleteProduct.isPending}
                onClick={() => {
                  if (!productId) return alert("product not found");
                  deleteProduct.mutate(
                    {
                      productId,
                    },
                    {
                      onSuccess: () => {
                        toast.success("product deleted successfully!");
                        setIsOpen(false);
                        utils.invalidate();
                      },
                      onError: () => {
                        toast.error("product deletion failed!");
                      },
                    },
                  );
                }}
                className="ml-2 h-8 w-8 rounded-md bg-red-500 p-0.5 text-xl text-white"
              >
                <TrashIcon color="#fff" />
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="xyz" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is product name which is displayed publicly!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} />
                    </FormControl>
                    <FormDescription>Product price in $!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product description</FormLabel>
                    <FormControl>
                      <Input placeholder="xyz" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is product description which is displayed publicly!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product image url</FormLabel>
                    <FormControl>
                      <Input placeholder="xyz" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is product image url which is displayed publicly!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product slug</FormLabel>
                    <FormControl>
                      <Input placeholder="xyz" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is product slug, use same a product name, make sure
                      to verify, it is good for SEO.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={createProduct.isPending || updateProduct.isPending}
              >
                {createProduct.isPending || updateProduct.isPending
                  ? "Loading..."
                  : Boolean(productId)
                    ? "Update Product"
                    : "Create Product"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductManageDialog;

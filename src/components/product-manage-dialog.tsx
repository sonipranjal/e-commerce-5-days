import React from "react";
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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  imageUrl: z.string().url(),
  productQuantity: z.number().min(0),
  slug: z.string().min(3),
});

const ProductManageDialog = ({
  productId,
  onClose,
  isOpen,
}: {
  productId?: number;
  onClose?: (open: boolean) => void;
  isOpen?: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog open={Boolean(productId) || isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2">
            <div>Manage Product</div>
            <Button className="ml-2 h-8 w-8 rounded-md bg-red-500 p-0.5 text-xl text-white">
              <TrashIcon color="#fff" />
            </Button>
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
                name="productQuantity"
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductManageDialog;

import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { createClient } from "@/utils";
import { AuthContext } from "@/contexts/auth-context";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
  name: z.string().optional(),
});

const AuthForm = ({
  formType,
  onSuccess,
}: {
  formType: "login" | "register";
  onSuccess: () => void;
}) => {
  const supabase = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit({
    email,
    password,
    name,
  }: z.infer<typeof formSchema>) {
    if (formType === "register") {
      if (!name) {
        return alert("name is required!");
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) {
        console.error(error);
        return alert(error.message);
      }
      onSuccess();
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error(error);
        return alert(error.message);
      }
      onSuccess();
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formType === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@doe.com" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  This is where you want to receive order confirmation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {formType === "register" ? "Signup" : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const Auth = () => {
  const supabase = createClient();
  const { user } = useContext(AuthContext);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<{
    open: boolean;
    formType: "login" | "register";
  }>({
    open: false,
    formType: "login",
  });

  return (
    <div className="flex items-center space-x-2">
      {user && (
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.reload();
          }}
        >
          Logout
        </Button>
      )}

      {!user && (
        <>
          <Dialog
            open={isAuthDialogOpen.open}
            onOpenChange={(open) => {
              setIsAuthDialogOpen((p) => ({ ...p, open: open }));
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isAuthDialogOpen.formType === "login" ? "Login" : "Register"}
                </DialogTitle>
                <DialogDescription>
                  {isAuthDialogOpen.formType === "login" ? "Login" : "Register"}{" "}
                  to continue shopping inside our app.
                </DialogDescription>
              </DialogHeader>

              <div>
                {isAuthDialogOpen.formType === "login" && (
                  <AuthForm
                    formType={"login"}
                    onSuccess={() => {
                      setIsAuthDialogOpen((p) => ({ ...p, open: false }));
                      window.location.reload();
                    }}
                  />
                )}

                {isAuthDialogOpen.formType === "register" && (
                  <AuthForm
                    formType={"register"}
                    onSuccess={() => {
                      setIsAuthDialogOpen((p) => ({ ...p, open: false }));
                      alert("check your email for confirmation!");
                    }}
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={() => {
              setIsAuthDialogOpen({
                open: true,
                formType: "login",
              });
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              setIsAuthDialogOpen({
                open: true,
                formType: "register",
              });
            }}
          >
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default Auth;

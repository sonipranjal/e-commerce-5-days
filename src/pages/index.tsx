import Auth from "@/components/auth";
import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/auth-context";
import { mockData } from "@/lib/utils";
import { createClient } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  console.log({ user });

  return (
    <MainLayout>
      <div className="my-4 flex flex-wrap gap-6">
        {mockData.map((product) => (
          <Link
            key={product.id}
            href={`/${product.slug}`}
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
          </Link>
        ))}
      </div>
    </MainLayout>
  );
}

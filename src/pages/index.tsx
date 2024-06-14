import Auth from "@/components/auth";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center">
      <header className="flex w-full items-center justify-between bg-slate-200 p-10">
        <div>
          <Link href={"/admin"}>Admin Dashboard</Link>
        </div>
        <div className="flex items-center space-x-2">
          <Auth />
        </div>
      </header>
      <div className="my-4 flex flex-row flex-wrap justify-center gap-6">
        {mockData.map((product) => (
          <div
            key={product.id}
            onClick={async () => {
              await router.push(`/${product.slug}`);
            }}
            className="flex max-w-96 flex-col items-start gap-6 rounded-xl border border-gray-300 bg-white p-4 shadow-lg"
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
          </div>
        ))}
      </div>
    </div>
  );
}

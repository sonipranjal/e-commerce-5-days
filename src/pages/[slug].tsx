import { useRouter } from "next/router";
import React from "react";

const ProductPage = () => {
  const router = useRouter();

  console.log(router.query.slug);

  return <div>ProductPage</div>;
};

export default ProductPage;

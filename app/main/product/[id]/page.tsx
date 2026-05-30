import { notFound } from "next/navigation";
import { ProductDetail } from "@/component/product-detail";
import { products } from "@/lib/mock-data";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((entry) => entry.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

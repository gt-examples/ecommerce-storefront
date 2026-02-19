import { T, Currency } from "gt-next";
import { tx } from "gt-next/server";
import { getProduct, products } from "@/lib/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import StockStatus from "@/components/StockStatus";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const translatedName = await tx(product.name);
  const translatedDescription = await tx(product.description);
  const translatedCategory = await tx(product.category);

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-8 inline-block"
      >
        <T>Back to all products</T>
      </Link>

      <div className="border border-neutral-800 rounded-lg p-8 bg-neutral-950">
        <div className="h-48 flex items-center justify-center mb-8 text-neutral-600">
          <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800" />
        </div>

        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
          {translatedCategory}
        </p>
        <h1 className="text-2xl font-semibold text-neutral-100 mb-4">
          {translatedName}
        </h1>
        <p className="text-neutral-400 leading-relaxed mb-6">
          {translatedDescription}
        </p>

        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-3xl font-semibold text-neutral-100">
            <Currency currency={product.currency}>{product.price}</Currency>
          </span>
          <span className="text-sm">
            <StockStatus stock={product.stock} />
          </span>
        </div>

        <AddToCartButton productId={product.id} disabled={product.stock === 0} />
      </div>
    </main>
  );
}

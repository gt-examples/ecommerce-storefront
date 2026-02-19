import { T, Currency } from "gt-next";
import { tx } from "gt-next/server";
import Link from "next/link";
import type { Product } from "@/lib/products";
import StockStatus from "./StockStatus";

export default async function ProductCard({ product }: { product: Product }) {
  const translatedName = await tx(product.name);
  const translatedCategory = await tx(product.category);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block border border-neutral-800 rounded-lg p-6 hover:border-neutral-600 transition-colors bg-neutral-950"
    >
      <div className="h-32 flex items-center justify-center mb-6 text-neutral-600">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
          {translatedCategory}
        </p>
        <h3 className="text-base font-semibold text-neutral-100 group-hover:text-white transition-colors">
          {translatedName}
        </h3>
        <p className="text-lg font-medium text-neutral-200">
          <Currency currency={product.currency}>{product.price}</Currency>
        </p>
        <p className="text-sm">
          <StockStatus stock={product.stock} />
        </p>
      </div>
    </Link>
  );
}

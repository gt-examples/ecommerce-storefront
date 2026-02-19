import { T, Num } from "gt-next";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
          <T>
            All Products (<Num>{products.length}</Num>)
          </T>
        </h2>
        <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
          <T>Browse our curated collection of thoughtfully designed everyday objects.</T>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}

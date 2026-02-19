import { T, Currency, Num, Plural } from "gt-next";
import { tx } from "gt-next/server";
import { products } from "@/lib/products";
import Link from "next/link";

// Static demo cart for display purposes
const demoCart = [
  { productId: "1", quantity: 2 },
  { productId: "4", quantity: 1 },
  { productId: "6", quantity: 3 },
];

export default async function CartPage() {
  const cartItems = demoCart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  // Pre-translate product names
  const translatedNames: Record<string, string> = {};
  for (const item of cartItems) {
    translatedNames[item.productId] = await tx(item.product.name);
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-neutral-100 mb-2">
        <T>Shopping Cart</T>
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        <T>
          <Plural n={totalItems} singular={<><Num>{totalItems}</Num> item</>}>
            <Num>{totalItems}</Num> items
          </Plural>
        </T>
      </p>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border border-neutral-800 rounded-lg p-5 bg-neutral-950"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-neutral-100">
                  {translatedNames[item.productId]}
                </h3>
                <p className="text-sm text-neutral-500">
                  <T>
                    Qty: <Num>{item.quantity}</Num>
                  </T>
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-neutral-200">
              <Currency currency={item.product.currency}>
                {item.product.price * item.quantity}
              </Currency>
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-800 pt-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-neutral-100">
          <T>Total</T>
        </span>
        <span className="text-lg font-semibold text-neutral-100">
          <Currency currency="USD">{totalPrice}</Currency>
        </span>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg text-sm font-medium border border-neutral-700 text-neutral-300 hover:border-neutral-500 transition-colors"
        >
          <T>Continue shopping</T>
        </Link>
        <Link
          href="/checkout"
          className="px-6 py-3 rounded-lg text-sm font-medium bg-white text-neutral-950 hover:bg-neutral-200 transition-colors"
        >
          <T>Checkout</T>
        </Link>
      </div>
    </main>
  );
}

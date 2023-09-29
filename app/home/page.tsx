import Button from "@/components/ui/button";
import Image from "next/image";
async function getData() {
  const res = await fetch(`${process.env.BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 max-w-7xl gap-2">
        {data.map((product: IProduct) => (
          <li
            key={product.productId}
            className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <div className="relative flex justify-center w-full aspect-square">
                <Image
                  className="object-cover rounded-t-lg"
                  src={`/upload/${product.images[0]}`}
                  alt=""
                  fill
                  priority
                  sizes="300px"
                />
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between">
              <a href="#">
                <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {product.price.toLocaleString("vi-VN")}&nbsp;₫
                </h5>
                <h6 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {product.productName}
                </h6>
              </a>
              <Button>
                <span>Chọn mua</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
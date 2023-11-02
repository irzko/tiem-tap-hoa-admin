import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CheckoutContainer from "@/components/checkout/checkout-container";

const getAddress = async (userId: string): Promise<IAddress> => {
  const res = await fetch(
    `${process.env.API_URL}/api/user/address/${userId}/default`,
    {
      next: { tags: ["address"] },
    }
  );
  const data = await res.json();
  return data;
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const userId = session.user.userId;
  const address = await getAddress(userId);

  return <CheckoutContainer address={address} userId={userId} />;
}
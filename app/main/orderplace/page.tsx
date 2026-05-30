import { Suspense } from "react";
import { OrderPlaceScreen } from "@/component/order-place-screen";

export default function OrderPlace() {
  return (
    <Suspense>
      <OrderPlaceScreen />
    </Suspense>
  );
}

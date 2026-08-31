import { useMutation } from "@tanstack/react-query";

import { createPayment } from "@/lib/payment";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,

    onSuccess: (data) => {
      window.location.href = data.checkoutUrl;
    },
  });
};
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatNumberWithCommas = (number: number) => {
  if (number == undefined) {
    return number;
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

import { format } from "date-fns";

export function dateStr(fmt?: string) {
  if (!fmt)
    return new Date().toDateString();

  return format(new Date(), fmt );
}

export function someDumbID(): string {
  return (Math.random() + 1).toString(36).substring(2)+(Math.random() + 1).toString(36).substring(2);
}
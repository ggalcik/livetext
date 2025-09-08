import { format } from "date-fns";

export function dateStr(fmt?: string) {
  if (!fmt)
    return new Date().toDateString();

  return format(new Date(), fmt );
}

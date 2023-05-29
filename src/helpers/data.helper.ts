import { Dayjs } from "dayjs";

export const dataHelper = {
  to<T>(data: any): T {
    return <T>(data as unknown);
  },

  getRandomFromArray<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  },

  getDateISO(date: Dayjs): string {
    return date.format("YYYY-MM-DD HH:mm:ss");
  },
};

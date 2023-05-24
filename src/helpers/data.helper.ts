export const dataHelper = {
  to<T>(data: any): T {
    return <T>(data as unknown);
  },
};

import { Directus } from "@directus/sdk";

export const environment = {
  server: "http://localhost:8055",
  qrcode: "https://api.qrserver.com",

  api() {
    return new Directus(this.server);
  },
};

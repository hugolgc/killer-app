export const placeFactory = {
  getPlace() {
    return {
      fields: [
        "id",
        "name",
        "company.id",
        "company.name",
        "company.logo",
        "company.services.id",
        "company.services.name",
      ],
    };
  },
};

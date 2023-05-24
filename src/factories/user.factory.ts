export const userFactory = {
  read() {
    return {
      fields: [
        "id",
        "first_name",
        "last_name",
        "avatar",
        "company.id",
        "company.name",
        "place.id",
        "place.name",
        "service.id",
        "service.name",
      ],
    };
  },

  getUsers() {
    return {
      fields: [
        "first_name",
        "last_name",
        "avatar",
        "points",
        "place.id",
        "place.name",
        "service.id",
        "service.name",
        "missions.completed",
      ],
      sort: ["-points"],
    };
  },
};

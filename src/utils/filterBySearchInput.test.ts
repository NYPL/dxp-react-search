import filterBySearchInput from "./filterBySearchInput";

describe("filterBySearchInput", () => {
  const locations = [
    {
      name: "125th Street Library",
      slug: "125th-street",
      synonyms: [],
    },
    {
      name: "Stavros Niarchos Foundation Library",
      slug: "snfl",
      synonyms: [],
    },
    {
      name: "Stephen A. Schwarzman Building",
      slug: "sasb",
      synonyms: ["sasb", "schwarzman", "schwarzman building"],
    },
    {
      name: "DeWitt Wallace Periodical Room",
      slug: "periodicals-room",
      synonyms: [],
    },
  ];

  it("should return Stephen A. Schwarzman Building if 'sasb' is the search term.", () => {
    const searchTerm = "sasb";
    const result = filterBySearchInput(locations, searchTerm);
    expect(result[0].slug).toEqual("sasb");
  });

  it("should return Stephen A. Schwarzman Building if 'Schwarzman' is the search term.", () => {
    const searchTerm = "Schwarzman";
    const result = filterBySearchInput(locations, searchTerm);
    expect(result[0].slug).toEqual("sasb");
  });

  it("should return no results, if no synomym match is found.", () => {
    const searchTerm = "no match";
    const result = filterBySearchInput(locations, searchTerm);
    expect(result).toHaveLength(0);
  });
});

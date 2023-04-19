import filterBySearchInput from "./filterBySearchInput";

describe("filterBySearchInput", () => {
  const locations = [
    {
      id: "125th-street",
      name: "125th Street Library",
      synonyms: [],
    },
    {
      id: "snfl",
      name: "Stavros Niarchos Foundation Library",
      synonyms: [],
    },
    {
      id: "sasb",
      name: "Stephen A. Schwarzman Building",
      synonyms: ["sasb", "schwarzman", "schwarzman building"],
    },
    {
      id: "periodicals-room",
      name: "DeWitt Wallace Periodical Room",
      synonyms: [],
    },
  ];

  const mockItems = [
    {
      id: "item-one",
      name: "Item One",
    },
    {
      id: "item-two",
      name: "Item Two",
    },
    {
      id: "item-three",
      name: "Item Three",
    },
    {
      id: "item-four",
      name: "Item Four",
    },
  ];

  it("should return Stephen A. Schwarzman Building if 'sasb' is the search query.", () => {
    const searchQuery = "sasb";
    const result = filterBySearchInput(locations, searchQuery);
    expect(result[0].id).toEqual("sasb");
  });

  it("should return Stephen A. Schwarzman Building if 'Schwarzman' is the search query.", () => {
    const searchQuery = "Schwarzman";
    const result = filterBySearchInput(locations, searchQuery);
    expect(result[0].id).toEqual("sasb");
  });

  it("should return no results, if no synomym match is found.", () => {
    const searchQuery = "no match";
    const result = filterBySearchInput(locations, searchQuery);
    expect(result).toHaveLength(0);
  });

  it("should return correct first item, even if no synonyms array is in source data.", () => {
    const searchQuery = "Four";
    const result = filterBySearchInput(mockItems, searchQuery);
    expect(result[0].id).toEqual("item-four");
  });
});

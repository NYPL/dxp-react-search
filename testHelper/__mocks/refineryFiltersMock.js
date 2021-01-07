const filters = {
  "data": {
    "filters": [
      {
        "id": "filter-boroughs",
        "name": "Borough",
        "terms": [
          {
            "id": "manhattan",
            "name": "New York"
          },
          {
            "id": "bronx",
            "name": "Bronx"
          },
          {
            "id": "statenisland",
            "name": "Staten Island"
          }
        ]
      },
      {
        "id": "filter-accessibility",
        "name": "Accessibility",
        "terms": [
          {
            "id": "fullaccess",
            "name": "Fully accessible"
          },
          {
            "id": "partialaccess",
            "name": "Partially accessible"
          },
          {
            "id": "noaccess",
            "name": "Not accessible"
          }
        ]
      },
      {
        "id": "filter-amenities",
        "name": "Amenities",
        "terms": [
          {
            "id": "79b13acc-66ab-4759-b854-d24e1904988c",
            "name": "Adjustable height tables"
          },
          {
            "id": "a958151d-3ef2-4414-8231-2a48e82090e2",
            "name": "Assistive amplification systems"
          },
          {
            "id": "90153cb5-81fe-49cf-b181-2dc34dbafd34",
            "name": "Bicycle rack"
          },
          {
            "id": "b4a13d1d-070e-457c-8a10-0f4219e966b0",
            "name": "Book drop box (24 hour)"
          },
          {
            "id": "ba4894dc-faad-49aa-a6b8-08b1ba1b96e6",
            "name": "Book drop box (limited hours)"
          },
          {
            "id": "68feaac5-da34-4adf-9692-248307cfed32",
            "name": "Books in braille"
          },
          {
            "id": "5896c76e-857c-4449-aacc-31d14dd6e43b",
            "name": "Braille embossing"
          },
          {
            "id": "94ba93e0-d42d-4e9a-b9e8-29e6c2bb14a1",
            "name": "Braille translation software"
          },
          {
            "id": "2ee51fe2-7b59-4091-a82c-f8527c6676bc",
            "name": "Braille writers"
          },
          {
            "id": "e97d8fea-d724-4bd0-9d71-c2a0726cecf0",
            "name": "Change machine"
          },
          {
            "id": "4fa7e9e1-b6c6-4926-9fe9-9069ef00f892",
            "name": "Changing station"
          },
          {
            "id": "fd2e2ea6-fa8c-4350-adb4-358cb3fc0959",
            "name": "Checkroom service"
          },
          {
            "id": "240fa87b-24f5-4937-8744-fac36cb5d197",
            "name": "Children's only restrooms"
          },
          {
            "id": "80777f9c-a97b-4caa-81c3-9229bd76bc0e",
            "name": "Closed-circuit television enlargers (CCTVs)"
          },
          {
            "id": "ef9e4a99-93c1-4b39-960d-43d252094203",
            "name": "Computers for public use"
          },
          {
            "id": "3632b89a-e4a8-4ada-b55f-a74cf1c7d504",
            "name": "Electric outlets available"
          },
          {
            "id": "ec164baf-af02-4541-a8df-7c640b91bf1b",
            "name": "Interlibrary loan"
          },
          {
            "id": "36ede755-b09e-48ae-b374-7dc08ece60db",
            "name": "Laptops for public use"
          },
          {
            "id": "273b0428-1b29-48a5-bfd7-70914c5db368",
            "name": "Library HotSpot lending"
          },
          {
            "id": "f11cab1f-e299-467d-9b04-0915472ff255",
            "name": "Lost and found"
          },
          {
            "id": "5214df88-b586-4923-b29a-9a1309eba69c",
            "name": "Map photocopiers (up to 36\" wide)"
          },
          {
            "id": "9173147a-31b1-41c9-95c8-ad2f086c6888",
            "name": "Parking"
          },
          {
            "id": "86204732-1bf9-4333-9a67-9242c7349695",
            "name": "Payphones"
          },
          {
            "id": "4eba2040-eba4-43ca-9730-963f1ed0d830",
            "name": "Personal reading machines"
          },
          {
            "id": "f57cebd1-a349-46ab-9d04-52885410a5c2",
            "name": "Photocopiers (black/white)"
          },
          {
            "id": "55d9a8f3-88b6-49ca-9ef0-1b3e0cf7e5d4",
            "name": "Photocopiers (color)"
          },
          {
            "id": "8cd362fe-782e-401f-9c14-9c877a0ef0a4",
            "name": "Printers (black/white)"
          },
          {
            "id": "44b1c959-4e92-4bd6-8165-37fae3fb269a",
            "name": "Printers (color)"
          },
          {
            "id": "419de68c-e803-466b-b2df-c5e7e7886636",
            "name": "Public restrooms"
          },
          {
            "id": "2ce54b09-4859-4622-b239-60ac9ab1f22f",
            "name": "Refreshable braille display"
          },
          {
            "id": "f6340e6c-9343-4628-b56b-0bc997801efb",
            "name": "Scanner/reading machines"
          },
          {
            "id": "ff839a2c-96fa-4451-8908-ab5ff8b392e0",
            "name": "Scanners"
          },
          {
            "id": "f07f2f9d-6a46-42f7-835b-88587db88b32",
            "name": "Screen magnification software (MAGic)"
          },
          {
            "id": "cdb05a7a-e544-4596-ac7d-d89b3d6e1870",
            "name": "Screen reading software (JAWS)"
          },
          {
            "id": "632f0602-0c40-4e4a-ad64-6a70fbf07229",
            "name": "Self-service check-out"
          },
          {
            "id": "fa914548-4c97-4870-9509-4c7510d128c8",
            "name": "Small group meeting rooms"
          },
          {
            "id": "8c2dace8-2678-4690-84ef-ea2cca22bdfc",
            "name": "Talking books"
          },
          {
            "id": "f78a2c84-424b-4478-8d19-7dff17dcbd4d",
            "name": "Telecommunications devices for the deaf (TTYs)"
          },
          {
            "id": "2c874772-ce77-4365-9d55-e1382375d56b",
            "name": "Video relay service (VRS)"
          },
          {
            "id": "224861ba-9aad-4b48-953f-c28d8582fb7a",
            "name": "Water fountain"
          },
          {
            "id": "cc4d9542-623d-4149-81a7-65dd3ae5880d",
            "name": "Wireless internet access (Wi-Fi)"
          }
        ]
      },
      {
        "id": "filter-subjects",
        "name": "Subject Specialties",
        "terms": [
          {
            "id": "b32835f7-19c5-4bcc-b143-73f2bf0d0f3e",
            "name": "Accessibility"
          },
          {
            "id": "c8d5df2a-6f33-452c-bc8c-3af3c3f1302c",
            "name": "Advertising"
          },
          {
            "id": "39ec164b-9b51-403a-a5bb-0506d63d7750",
            "name": "African American History"
          },
          {
            "id": "bd9a1fb0-f7fd-4f67-80c0-d6df1e4ba4d2",
            "name": "African American Studies"
          },
          {
            "id": "2402728c-4534-4c69-943f-c0834208a4a5",
            "name": "African Diaspora"
          },
          {
            "id": "fe05dd77-a0d8-4157-9133-0eb84ac49014",
            "name": "African Studies"
          },
          {
            "id": "214effb4-d65e-4dd2-a0cb-d0abb46f1393",
            "name": "Agriculture"
          },
          {
            "id": "c9b0926e-0fe2-432b-bd3c-ff8855f1f12f",
            "name": "American Studies"
          },
          {
            "id": "b2d8681e-3d41-40b2-b832-3fbd2c77d0e8",
            "name": "Ancient History"
          },
          {
            "id": "1223ce4b-cc82-4577-8fb2-2fd6a3abe903",
            "name": "Animals"
          },
          {
            "id": "252ebc3a-49e8-4b44-b377-8c6ee3289084",
            "name": "Anime & Manga"
          },
          {
            "id": "f72e4f18-1b85-4d26-b5ec-4b5beb8a0e0c",
            "name": "Anthropology"
          },
          {
            "id": "045f2134-c8ab-4231-96d1-41d6a4ed3f03",
            "name": "Archaeology"
          },
          {
            "id": "e2ec7d61-c2be-4d18-b547-dccb22e1a603",
            "name": "Architecture"
          },
          {
            "id": "015160f3-de35-49bc-8613-3219955840ae",
            "name": "Area & Cultural Studies"
          },
          {
            "id": "f4385e15-89de-46df-a698-772ff33d2e2b",
            "name": "Art"
          },
          {
            "id": "0d3545d9-1668-4b28-8890-6df1a69c2a5f",
            "name": "Art Auction Prices"
          },
          {
            "id": "36793cdb-dc28-4ef0-b6c6-d83fd38e6e47",
            "name": "Art History"
          },
          {
            "id": "3dc1b56e-3830-490d-b7e0-b85f392f7270",
            "name": "Artists' Books"
          },
          {
            "id": "563f2a7c-50a8-4bde-8a85-b539130b9a25",
            "name": "Asian Studies"
          },
          {
            "id": "37f76743-59f6-4fdf-8e52-6140617e2ccc",
            "name": "Banned Books"
          },
          {
            "id": "f16a2776-554f-45a1-97b1-5f6d09200aa2",
            "name": "Bibliography"
          },
          {
            "id": "f18d3b4e-d726-4f17-bbe9-a34bcd4695e1",
            "name": "Biographies, Memoirs & Diaries"
          },
          {
            "id": "7b51fd59-8a91-4182-93dc-7a91b91e4484",
            "name": "Books & Libraries"
          },
          {
            "id": "40dbabdc-2658-4456-9b65-98b8a8f9dfd0",
            "name": "Broadcasting, Radio & Television"
          },
          {
            "id": "852fb7a1-884e-411c-94cb-6194d964c49b",
            "name": "Bronx"
          },
          {
            "id": "a3e1aa96-5852-46ff-928e-8e06bb48a142",
            "name": "Brooklyn"
          },
          {
            "id": "0358e3f5-c459-473c-be0f-21f89822bfea",
            "name": "Buddhism"
          },
          {
            "id": "a70be764-1bf0-4301-b6a4-aa6d06835251",
            "name": "Building & Construction"
          },
          {
            "id": "018979c6-d57f-42b6-b6a3-f8f4d919f5e8",
            "name": "Business"
          },
          {
            "id": "11bed9f7-b4b5-4f04-b757-34f9c8e0c611",
            "name": "Caribbean Studies"
          },
          {
            "id": "5afbd8e4-73c0-4dd7-85ed-555e9bfdc03b",
            "name": "Census Data"
          },
          {
            "id": "890dc1de-5eca-4e15-a333-7322af5882eb",
            "name": "Children's Literature"
          },
          {
            "id": "7693f788-4399-49b7-a45c-a4101ac3c643",
            "name": "Christianity"
          },
          {
            "id": "d05227ff-2385-44f6-aee9-e2a01294ea51",
            "name": "Civil Rights"
          },
          {
            "id": "53768da4-dac8-4f5e-afea-d92a41afa4b5",
            "name": "Classical Music"
          },
          {
            "id": "af687ae6-5564-4c9f-8d13-9fac41cdda24",
            "name": "College Admissions & Test Prep"
          },
          {
            "id": "c2632b6a-92ed-4f0f-9bd3-103c9152b466",
            "name": "Comics & Graphic Novels"
          },
          {
            "id": "14057cee-4403-49de-9a5f-352c2021bea6",
            "name": "Computers"
          },
          {
            "id": "9db4298b-2c5a-484f-8279-5c28cb174b32",
            "name": "Copyright"
          },
          {
            "id": "3005a30b-04e3-46bc-becc-425f70b6f935",
            "name": "Crafts"
          },
          {
            "id": "22f664d1-fc39-450d-bca8-b63d243fb4bb",
            "name": "Creative Writing"
          },
          {
            "id": "e7908ebc-8239-40e8-b2d8-15b6a3e61d3b",
            "name": "Criminology"
          },
          {
            "id": "1369d968-834b-4253-bb3e-adb3165a57ba",
            "name": "Dance"
          },
          {
            "id": "f574ec27-506d-4bb8-bdc0-85eaaf2dc40a",
            "name": "Decorative Arts"
          },
          {
            "id": "d248893b-3e15-4285-953d-ff2b253a7350",
            "name": "Design"
          },
          {
            "id": "55a4a7bf-bc01-4243-8fb7-e4fd3aaa5341",
            "name": "Dictionaries & Thesauri"
          },
          {
            "id": "a9231f75-4557-4aa5-94d1-d29e4b1ab950",
            "name": "Directories & Phone Books"
          },
          {
            "id": "07cabd2c-eecc-4796-8108-8e91b9676acb",
            "name": "Drawing & Illustration"
          },
          {
            "id": "81b75b8d-cb8f-4ae3-a337-38523c617b83",
            "name": "Earth Sciences"
          }
        ]
      },
      {
        "id": "filter-media",
        "name": "Media Types",
        "terms": [
          {
            "id": "5f534b88-6cb8-4b92-af76-5c62110c7ea9",
            "name": "Archives"
          },
          {
            "id": "a74de490-ee0a-42c7-b345-f4a86f2dcb29",
            "name": "Art & Artifacts"
          },
          {
            "id": "23424b74-7083-4f41-9c6a-d480e7de8202",
            "name": "Artists' Books"
          },
          {
            "id": "20796cb9-73c4-4607-886d-f190d9b095e4",
            "name": "Film & Video"
          },
          {
            "id": "3c3e4574-959c-416c-adb0-1cb52d191626",
            "name": "Government Documents"
          },
          {
            "id": "5fbe32c5-a64c-4a1c-9080-6a11d39b3070",
            "name": "Manuscripts"
          },
          {
            "id": "553a0c6e-bf5a-49b9-b78b-1027d4e9fd77",
            "name": "Maps"
          },
          {
            "id": "1c306383-3471-415d-b878-de69b5e5ebab",
            "name": "Newspapers"
          },
          {
            "id": "b656bb50-a105-424f-9329-6fa1cb7238e0",
            "name": "Photographs"
          },
          {
            "id": "99f1f597-3054-43bf-8e06-07c33b48d274",
            "name": "Prints"
          },
          {
            "id": "834258a1-7610-4613-a4bc-d4b35f8c10cc",
            "name": "Rare Books"
          },
          {
            "id": "203ea89a-c9a2-4e7a-b9f3-242fbea4419f",
            "name": "Scores"
          },
          {
            "id": "ab50df65-e41d-41d1-bb78-a4e99987ce4d",
            "name": "Sound Recordings"
          }
        ]
      }
    ]
  },
  "meta": {
    "notices": {
      "cache": {
        "last-refresh": "2021-01-04T14:25:07+00:00"
      }
    }
  }
}  

export { filters as default };
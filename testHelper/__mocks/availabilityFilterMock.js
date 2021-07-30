const availabilityFilterMock = {
  "data": {
    "id": "availability",
    "terms": [
      /*{
        "uuid": "9507-25d4b9b29dd0",
        "tid": "no-restrictions",
        "name": "Available without restrictions",
        "vid": "20000000",
        "parent_tid": "virtual",
        "parent_uuid": "virtual"
      },
      */
      {
        "uuid": "-c760d4f5041e",
        "tid": "card-required",
        "name": "Offsite with Library Card",
        "vid": "200000000",
        "parent_tid": "virtual",
        "parent_uuid": "virtual"
      },
      {
        "uuid": "41c7-9eef-b5c529340d5e",
        "tid": "on-site-only",
        "name": "On-Site Access Only",
        "vid": "200000000",
        "parent_tid": "virtual",
        "parent_uuid": "virtual"
      }
    ],
    "total_items": 3
  }
};

export { availabilityFilterMock as default };
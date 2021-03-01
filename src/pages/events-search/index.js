import React from 'react';
import Layout from './../../components/shared/layouts/Main';
import MultiSelect from './../../components/shared/MultiSelect';

const items = [
  {
    "id": 49,
    "uuid": "b32835f7-19c5-4bcc-b143-73f2bf0d0f3e",
    "name": "Accessibility",
    "parent_uuid": "e99fad48-255b-4b5c-b557-dabfadb68aa2"
  },
  {
    "id": 50,
    "uuid": "c8d5df2a-6f33-452c-bc8c-3af3c3f1302c",
    "name": "Advertising",
    "parent_uuid": "018979c6-d57f-42b6-b6a3-f8f4d919f5e8"
  },
  {
    "id": 51,
    "uuid": "39ec164b-9b51-403a-a5bb-0506d63d7750",
    "name": "African American History",
    "parent_uuid": "3b37bfde-ca35-4b83-a509-ee1a2d6594bf"
  },
  {
    "id": 52,
    "uuid": "bd9a1fb0-f7fd-4f67-80c0-d6df1e4ba4d2",
    "name": "African American Studies",
    "parent_uuid": "e99fad48-255b-4b5c-b557-dabfadb68aa2"
  }
];

function EventsSearch() {
  return (
    <Layout>
      <h1>Events Search</h1>
      <MultiSelect 
        label={'Subjects'} 
        items={items}
      />
    </Layout>
  );
}

export default EventsSearch;

import React from "react";
// Components
import { default as SharedFilterBar } from "../../shared/FilterBar";

function BlogsFilterBar() {
  return (
    <SharedFilterBar
      id="blogs__filter-bar"
      label="Explore By"
      routerPathname="/blogs/all"
      groups={[
        {
          id: "subject",
          label: "Subjects",
          type: "taxonomy",
        },
        {
          id: "channel",
          label: "Channels",
          type: "taxonomy",
        },
        {
          id: "library",
          label: "Libraries",
          type: "content",
        },
        {
          id: "division",
          label: "Divisions",
          type: "content",
        },
      ]}
    />
  );
}

export default BlogsFilterBar;

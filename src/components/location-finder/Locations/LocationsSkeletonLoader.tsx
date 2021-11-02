import React from "react";
// Components
import { SkeletonLoader } from "@nypl/design-system-react-components";

function LocationsSkeletonLoader() {
  return (
    <div className="locations__list-inner">
      <div className="location" style={{ width: "300px" }}>
        <SkeletonLoader contentSize={5} headingSize={1} showImage={false} />
      </div>
      <div className="location" style={{ width: "300px" }}>
        <SkeletonLoader contentSize={5} headingSize={1} showImage={false} />
      </div>
      <div className="location" style={{ width: "300px" }}>
        <SkeletonLoader contentSize={5} headingSize={1} showImage={false} />
      </div>
    </div>
  );
}

export default LocationsSkeletonLoader;

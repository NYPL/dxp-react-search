import React from "react";
import { Box, SkeletonLoader } from "@nypl/design-system-react-components";

function BlogPostSkeletonLoader() {
  return (
    <>
      <Box marginBottom="xl" width="400px">
        <SkeletonLoader contentSize={4} headingSize={1} showImage={false} />
      </Box>
      <Box marginBottom="l" width="866px">
        <SkeletonLoader contentSize={5} showImage={false} />
      </Box>
      <Box marginBottom="l" width="866px">
        <SkeletonLoader contentSize={2} showImage={false} />
      </Box>
      <Box marginBottom="l" width="866px">
        <SkeletonLoader contentSize={4} showImage={false} />
      </Box>
      <Box marginBottom="l" width="866px">
        <SkeletonLoader contentSize={3} showImage={false} />
      </Box>
    </>
  );
}

export default BlogPostSkeletonLoader;

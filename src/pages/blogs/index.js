import React, { Fragment } from "react";
// Apollo
import { withApollo } from "./../../apollo/client/withApollo";
// Redux
import { withRedux } from "./../../redux/withRedux";
// Components
import PageContainer from "./../../components/blogs/layouts/PageContainer";
import ChannelsCards from "./../../components/blogs/ChannelsCards";
import BlogsContainer from "../../components/blogs/BlogsContainer";
import SubjectCards from "../../components/blogs/SubjectCards";
import SocialEmbed from "./../../components/shared/ContentComponents/SocialEmbed";

function BlogsMainPage() {
  return (
    <PageContainer
      showContentHeader={true}
      contentPrimary={
        <>
          <SocialEmbed
            id="googlemaps-test"
            type="whatever"
            embedCode={`<iframe height="480" src="https://www.google.com/maps/d/u/1/embed?mid=1DLagsELcuhp5bsw5i4kqd8OEYicBoa0j" width="640"></iframe>`}
          />
        </>
      }
    />
  );
}

export default withApollo(withRedux(BlogsMainPage), {
  ssr: true,
  redirects: false,
});

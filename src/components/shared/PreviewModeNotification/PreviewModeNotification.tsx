import * as React from "react";
import { Box, Notification } from "@nypl/design-system-react-components";
import NextDsLink from "./../Link/NextDsLink";

export default function PreviewModeNotification() {
  return (
    <Notification
      notificationType="announcement"
      notificationHeading="You are viewing the site in preview mode."
      notificationContent={
        // The link href will be prefetched by NextJS Link, which loads the api for exit-preview,
        // which deletes the cookie. We do this automatically, to prevent stale content from
        // appearing if someone views the actual page outside of preview mode.
        <Box visibility="hidden" height={0}>
          <NextDsLink href="/api/exit-preview">Click here</NextDsLink>to exit.
        </Box>
      }
      margin={0}
    />
  );
}

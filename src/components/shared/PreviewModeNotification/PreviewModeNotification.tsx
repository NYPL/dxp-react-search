import * as React from "react";
import { Box, Link, Notification } from "@nypl/design-system-react-components";
// import NextDsLink from "./../Link/NextDsLink";

export default function PreviewModeNotification() {
  return (
    <Notification
      notificationType="announcement"
      notificationHeading="You are viewing the site in preview mode."
      notificationContent={
        <Box>
          {/* prefetch will still prefetch on hover :/ */}
          {/* <NextDsLink prefetch={false} href="/api/exit-preview">
            Click here to exit.
          </NextDsLink> */}
          <Link href="/api/exit-preview">Click here to exit.</Link>
        </Box>
      }
      margin={0}
    />
  );
}

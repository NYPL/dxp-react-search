import * as React from "react";
import { Box, Notification } from "@nypl/design-system-react-components";
import NextDsLink from "./../Link/NextDsLink";

export default function PreviewModeNotification() {
  return (
    <Notification
      notificationType="announcement"
      notificationHeading="You are viewing the site in preview mode."
      notificationContent={
        <Box>
          <NextDsLink prefetch={false} href="/api/exit-preview">
            Click here to exit.
          </NextDsLink>
        </Box>
      }
      margin={0}
    />
  );
}

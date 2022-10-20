import * as React from "react";
import { Box, Link, Notification } from "@nypl/design-system-react-components";

export default function PreviewModeNotification() {
  return (
    <Notification
      notificationType="announcement"
      notificationHeading="You are viewing the site in preview mode."
      notificationContent={
        <Box>
          <Link href="/api/exit-preview">Click here to exit.</Link>
        </Box>
      }
      margin={0}
    />
  );
}

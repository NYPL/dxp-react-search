import React from "react";
import { gql } from "@apollo/client";
// Component
import {
  Heading,
  Box,
  Image,
  Text,
  StatusBadge,
  HStack,
} from "@nypl/design-system-react-components";
import {
  EventItem as EventDetailsProps,
  ExperienceType,
} from "./EventCollection";

export const EVENT_QUERY = gql`
  query EventQuery($id: String) {
    event(id: $id) {
      id
      title
      description
      location
      locationDetail
      address
      image {
        id
        uri
      }
      tags
      date
      needsRegistration
      experience
      ticketPrice
      localistUrl
    }
  }
`;

function EventDetails({
  id,
  title,
  description,
  location,
  locationDetail,
  image,
  date,
  // needsRegistration,
  experience,
}: EventDetailsProps) {
  const experienceLabelTabel = {
    inperson: "In Person",
    hyprid: "Hybrid",
    virtual: "Virtual",
  };
  const getExperienceLabel = (experience: ExperienceType): string | null => {
    if (experience) {
      return experienceLabelTabel[experience]
        ? experienceLabelTabel[experience]
        : null;
    }
    return null;
  };
  const finalLocation = `${location ? location : ""}${
    locationDetail ? ", " + locationDetail : ""
  }`;
  const experienceLabel = getExperienceLabel(experience);

  return (
    <Box id={`event-${id}`}>
      <Heading level="one">{title}</Heading>
      <Box display="flex" flexDir="row-reverse" justifyContent="left" pb="m">
        <Box w="full" px="m">
          <Text>{date}</Text>
          <Text>{finalLocation}</Text>
          <HStack>
            {experienceLabel && (
              <StatusBadge level="low">{experienceLabel}</StatusBadge>
            )}
          </HStack>
        </Box>
        <Box>
          {image.uri && (
            <Image
              src={image.uri}
              aspectRatio="original"
              size="medium"
              alt="Alt text"
            />
          )}
        </Box>
      </Box>
      <Box dangerouslySetInnerHTML={{ __html: description }}></Box>
    </Box>
  );
}

export default EventDetails;

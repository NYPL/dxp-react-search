import React from "react";
import { gql } from "@apollo/client";
// Component
import {
  Heading,
  Box,
  Text,
  StatusBadge,
} from "@nypl/design-system-react-components";
import Image from "../shared/Image";
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
  address,
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
      <Box display="flex" alignItems="center">
        <Heading level="one" display="inline-block" paddingEnd="s">
          {title}
        </Heading>
        {experienceLabel && (
          <StatusBadge level="low" marginBottom="s" h="fit-content">
            {experienceLabel}
          </StatusBadge>
        )}
      </Box>
      <Box display="flex" flexDir="row-reverse" justifyContent="left" pb="m">
        <Box w="full" px="m">
          <Text>{date}</Text>
          <Text>{finalLocation}</Text>
          <Text>{address}</Text>
        </Box>
        <Box w="400px" h="auto">
          {image.uri && (
            <Image
              id={image.id}
              uri={image.uri}
              alt="Alt text"
              useTransformation={false}
              transformationLabel={"2_1_960"}
              layout="responsive"
              width={900}
              height={450}
              quality={90}
            />
          )}
        </Box>
      </Box>
      <Box dangerouslySetInnerHTML={{ __html: description }}></Box>
    </Box>
  );
}

export default EventDetails;

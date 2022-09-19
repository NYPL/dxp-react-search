import React from "react";
import { useStyleConfig } from "@chakra-ui/system";
//Component
import { GridItem, Box, Text } from "@chakra-ui/react";
import HomePageLink from "../HomePageLink";
import Image from "../../shared/Image";
// Type
import { StaffPicksItem } from "./StaffPicksTypes";

const QuoteBg = () => {
  const styles = useStyleConfig("QuoteBg");
  return <Box sx={styles}></Box>;
};

interface StaffPickProps {
  item: StaffPicksItem;
  gaEventActionName: string;
}

function StaffPick({ item, gaEventActionName }: StaffPickProps) {
  const { id, quote, image, url, staffName, staffLocation } = item;

  // @TODO fix style for StaffPick link
  const style = {
    display: "inline-block",
    float: "right",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  };

  return (
    <GridItem as="li" id={`staff-pick-card-${id}`}>
      <Box
        h={{ base: "200px", md: "210px", lg: "260px", xl: "374px" }}
        position="relative"
      >
        <QuoteBg />
        <HomePageLink
          id={`staff-pick-card-link-${id}`}
          href={url}
          gaEventActionName={gaEventActionName}
          {...style}
        >
          <Box
            display="flex"
            position="absolute"
            bottom={0}
            right={0}
            maxHeight={{ base: "175px", lg: "233px", xl: "320px" }}
            maxWidth={{ base: "115px", lg: "153px", xl: "212px" }}
          >
            <Image
              id={image.id}
              alt={image.alt}
              uri={image.uri}
              useTransformation={true}
              transformations={image.transformations}
              transformationLabel={"max_width_960"}
              layout="intrinsic"
              width={image.width}
              height={image.height}
              quality={90}
            />
          </Box>
          <Text
            pl={{ base: 4, xl: 8 }}
            pr={{ base: "120px", lg: "157px", xl: "220px" }}
            position="absolute"
            bottom="13%"
            fontFamily="Milo-Light-Italic"
            lineHeight="none"
            fontSize={{ base: "xl", lg: "2.5xl", xl: "4xl" }}
            textAlign="left"
          >
            {quote}
          </Text>
        </HomePageLink>
      </Box>
      <Box
        color="brand.100"
        mt={{ base: 4, xl: 5 }}
        fontWeight="bold"
        fontFamily="Kievit-Book"
        display="flex"
      >
        <Box pt={{ base: 3, xl: 6 }} pr={2.5}>
          <svg
            id="nyplLionLogo-icon"
            width="60px"
            height="60px"
            viewBox="0 0 25 25"
            aria-hidden="true"
            data-reactid="408"
            opacity={0.1}
          >
            <title data-reactid="409">NYPL Lion Logo</title>
            <ellipse
              cx="12.503"
              cy="12.485"
              rx="12.251"
              ry="12.24"
              fill="transparent"
              data-reactid="410"
            ></ellipse>
            <path
              d="M13.048,8.85a4.934,4.934,0,0,1,.879.322,0.893,0.893,0,0,0,.475.263,0.771,0.771,0,0,0,.352-0.609,1.481,1.481,0,0,0-.076-0.837,1.18,1.18,0,0,0-1.119-.351,2.931,2.931,0,0,0-.773.123c-0.27.082-.644,0.263-0.486,0.638A1.2,1.2,0,0,0,13.048,8.85Z"
              data-reactid="411"
            ></path>
            <path
              d="M12.444,0A12.5,12.5,0,1,0,25,12.5,12.468,12.468,0,0,0,12.444,0ZM5.15,21.271a1.841,1.841,0,0,1-.457-0.562c-1.06-1.7-1.658-7.7-.287-9.746,0.434-.714.9-0.386,0.744,0.17a4.505,4.505,0,0,0,.5,3.278c0.949,2,3.873,4.771,4.646,5.777a7.852,7.852,0,0,1,1.764,3.319c-0.006.258-.059,0.427-0.516,0.386A11.339,11.339,0,0,1,5.15,21.271Zm18.344-5.7c-0.094.293-.205,0.661-0.445,0.492a10.744,10.744,0,0,0-2.39-1.317c-0.053-.012-0.047-0.082-0.029-0.123a1.67,1.67,0,0,0,.129-0.468,1.228,1.228,0,0,1,.228-0.41,4.186,4.186,0,0,0,.434-1.5,3.646,3.646,0,0,0-.07-1.188A2.7,2.7,0,0,1,21.2,10.53c0-.17.082-0.345,0.1-0.544a1.614,1.614,0,0,0-1.072-1.235c-0.9-.416-1.851-0.79-2.818-1.305a11.027,11.027,0,0,1-1.424-1.258,10.435,10.435,0,0,0-2.437-1.054,0.228,0.228,0,0,1-.193-0.193,5.677,5.677,0,0,0-2.127-3.3c-0.4-.31.047-0.486,0.6-0.515A11.389,11.389,0,0,1,23.494,15.57Zm-3.527-3.834c-0.006-.047-0.023-0.193-0.023-0.222a0.6,0.6,0,0,1,.24-0.246,2.091,2.091,0,0,1,.334-0.234c0.029-.018.053,0.023,0.059,0.035a3.181,3.181,0,0,1-.029,2.254c-0.029.059-.076,0.082-0.094,0.041a1.454,1.454,0,0,0-.492-0.615,0.115,0.115,0,0,1-.035-0.1A2.749,2.749,0,0,0,19.967,11.736ZM9.491,6.4a3.811,3.811,0,0,1,3.029-.433,13.8,13.8,0,0,1,2.15.784c0.685,0.316,1.172.9,1.81,1.247,0.8,0.445,1.91.656,2.76,1.071a0.8,0.8,0,0,1,.5.451,3.059,3.059,0,0,1-1.623-.023,0.524,0.524,0,0,0-.615.094,0.906,0.906,0,0,0,.059.749,0.979,0.979,0,0,0,.469.509c0.275,0.129.656,0.135,0.908,0.281a1.227,1.227,0,0,1,.182,1.6,2.206,2.206,0,0,1-1.746.4,5.289,5.289,0,0,0-2,.105,2.328,2.328,0,0,0-1.043,1,0.12,0.12,0,0,1-.17.023c-1.775-1.065-4.019-1.616-5.214-3.307a3.638,3.638,0,0,1-.58-1.528A3.018,3.018,0,0,1,9.491,6.4ZM6.72,3.214c-0.352-.041-0.357-0.3-0.205-0.4a8.284,8.284,0,0,1,1.623-.837A0.8,0.8,0,0,1,8.589,1.9a4.956,4.956,0,0,1,2.086.972c1.043,0.743,1.974,2.16,1.353,2.043a5.866,5.866,0,0,0-.68-0.1c-0.469-.041-0.779.006-1-0.018a0.434,0.434,0,0,1-.234-0.123A5.867,5.867,0,0,0,6.72,3.214Zm9.292,11.473a0.675,0.675,0,0,1,.3-0.41,3.043,3.043,0,0,1,1.242-.222,3.994,3.994,0,0,0,1.26-.2,0.773,0.773,0,0,1,.691-0.217,0.5,0.5,0,0,1,.264.322,1.25,1.25,0,0,1,.07.486,13.41,13.41,0,0,1-.58,1.352,0.451,0.451,0,0,1-.07.246,2.132,2.132,0,0,1-1.652.217,2.074,2.074,0,0,1-.592-0.1,1.145,1.145,0,0,1-.293-0.24,6.619,6.619,0,0,1-.51-0.544,0.851,0.851,0,0,1-.228-0.293A1.2,1.2,0,0,1,16.012,14.686ZM4.09,4.812a0.521,0.521,0,0,1,.27-0.17,6.908,6.908,0,0,1,4.365.369C8.982,5.128,9.1,5.286,8.929,5.4a8.935,8.935,0,0,0-1.236.89,0.562,0.562,0,0,1-.4.082,6.571,6.571,0,0,0-4.1.486C2.883,6.983,2.6,6.808,2.742,6.562A10.008,10.008,0,0,1,4.09,4.812Zm-2.818,5.45a0.49,0.49,0,0,1,.123-0.3,7.869,7.869,0,0,1,4.412-2.54,0.628,0.628,0,0,1,.644.111c0.1,0.24-.1.38-0.34,0.515-4.166,2.488-3.873,6.187-3.914,7.7,0.012,0.62-.434.732-0.545,0.439A10.877,10.877,0,0,1,1.271,10.261Zm5.25,2.909a4.944,4.944,0,0,1,.07-4c0.164-.31.322-0.509,0.533-0.451,0.228,0.064.281,0.293,0.311,0.726,0.228,3.565,2.39,4.771,5.1,6.029a15.622,15.622,0,0,1,6.615,5.368c0.311,0.439.352,0.7,0.006,0.954a11.145,11.145,0,0,1-4.019,1.826c-0.246.059-.5,0.012-0.727-0.55C12.122,17.168,8.279,17.437,6.521,13.17Zm14.19,7.252c-0.352.345-.545,0.076-0.662-0.146a10.28,10.28,0,0,0-1.734-2.745,0.178,0.178,0,0,1,.164-0.3,1.287,1.287,0,0,0,.691-0.111,1.383,1.383,0,0,0,.633-0.9c0.1-.339.1-0.445,0.311-0.462a0.632,0.632,0,0,1,.205.023,2.5,2.5,0,0,1,.732.433,6.868,6.868,0,0,1,1.412,1.539,0.4,0.4,0,0,1-.047.4A11.284,11.284,0,0,1,20.711,20.423Z"
              data-reactid="412"
            ></path>
          </svg>
        </Box>
        <Box as="span">
          <Text
            pt={{ base: 5, xl: 9 }}
            pb={1}
            fontSize={{ base: "lg", xl: "xl" }}
            lineHeight="none"
            display="block-inline"
          >
            {staffName}
          </Text>
          <Text fontSize="md" lineHeight="none" display="block-inline">
            {staffLocation}
          </Text>
        </Box>
      </Box>
    </GridItem>
  );
}

export default StaffPick;

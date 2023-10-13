import * as React from "react";
import { Box, Heading, Grid, Link } from "@nypl/design-system-react-components";
import TextFormatted from "./../../shared/TextFormatted";
import Image from "next/image";
import useWindowSize from "../../../hooks/useWindowSize";
import { getImageTransformation } from "./../../shared/Image/imageUtils";

interface BlogCardGridProps {
  id: string;
  type: string;
  title?: string;
  description?: string;
  items: BlogCardGridItem[];
}

interface BlogCardGridItem {
  id: string;
  title: string;
  description: string;
  image?: any;
  link: string;
}

export default function BlogCardGrid({
  id,
  type,
  title,
  description,
  items,
}: BlogCardGridProps) {
  const [isMobile, setIsMobile] = React.useState<boolean>();
  const windowSize = useWindowSize();

  React.useEffect(() => {
    if (windowSize && windowSize >= 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, [windowSize]);

  function calculateAspectRatioFit(srcWidth: number, srcHeight: number) {
    const maxWidth = isMobile ? 300 : 165;
    const maxHeight = isMobile ? 300 : 165;
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  return (
    <Box id={`${type}-${id}`} mb="xl">
      {title && <Heading level="two" text={title} />}
      {description && <TextFormatted html={description} />}
      <Grid
        as="ul"
        listStyleType="none"
        gap="l"
        templateColumns="repeat(1, 1fr)"
      >
        {items.map((item: BlogCardGridItem) => {
          let imageSrc: string = item.image?.uri;
          if (item.image?.transformations) {
            const transformationUri = getImageTransformation(
              "max_width_960",
              item.image.transformations
            );
            if (transformationUri !== null) {
              imageSrc = transformationUri;
            }
          }

          return (
            <li key={item.id}>
              <Box
                display={{ lg: "flex" }}
                flexFlow={{ lg: "row" }}
                alignItems={{ lg: "flex-start" }}
              >
                {item.image && (
                  <Box
                    flex={{ lg: "0 0 165px" }}
                    mr={{ lg: "l" }}
                    mb={{ base: "s", lg: 0 }}
                  >
                    <a href={item.link}>
                      <Box
                        alignItems="center"
                        backgroundColor="ui.gray.light-warm"
                        display="flex"
                        height={{ base: "300px", lg: "165px" }}
                        justifyContent="center"
                        overflow="hidden"
                      >
                        <Image
                          id={item.image.id}
                          alt={item.image.alt}
                          src={imageSrc}
                          layout="intrinsic"
                          objectFit="contain"
                          {...calculateAspectRatioFit(
                            item.image.width,
                            item.image.height
                          )}
                        />
                      </Box>
                    </a>
                  </Box>
                )}
                <Box>
                  <Heading level="three">
                    <Link href={item.link}>{item.title}</Link>
                  </Heading>
                  <TextFormatted html={item.description} />
                </Box>
              </Box>
            </li>
          );
        })}
      </Grid>
    </Box>
  );
}

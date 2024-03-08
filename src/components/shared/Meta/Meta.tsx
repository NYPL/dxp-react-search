import Head from "next/head";
import { useRouter } from "next/router";
const { NEXT_PUBLIC_NYPL_DOMAIN } = process.env;

export interface MetaProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export default function Meta({ title, description, imageUrl }: MetaProps) {
  // Get the current path from next router.
  const { asPath } = useRouter();
  // @TODO See if you can also get the domain from useRouter, even with RP?
  const pageUrl = `${NEXT_PUBLIC_NYPL_DOMAIN}${asPath}`;

  // Home page doesn't use the postfix `| The New York Public Library`.
  let finalTitle = `${title} | The New York Public Library`;
  if (asPath === "/home") {
    finalTitle = title;
  }

  // Description clean up.
  const metaDescription = description?.replace(/(<([^>]+)>)/gi, "").trim();

  // Image default.
  let image = "https://www.nypl.org/sites/default/files/SASBopeng.jpg";
  if (imageUrl) {
    image = imageUrl;
  }

  return (
    <Head>
      <title>{finalTitle}</title>
      <link
        rel="shortcut icon"
        href="https://ux-static.nypl.org/images/favicon.ico"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="The New York Public Library (NYPL)" />
      <meta name="description" content={metaDescription} />
      <meta name="allow-search" content="yes" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="The New York Public Library" />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nypl" />
      <meta name="twitter:creator" content="@nypl" />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}

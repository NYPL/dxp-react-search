import Head from 'next/head';

function Meta(props) {
  const { title, description, url, imageUrl } = props;
  // Description clean up.
  const metaDescription = description.replace(/(<([^>]+)>)/gi, '').trim();
  // Image default.
  let image = 'https://www.nypl.org/sites/default/files/SASBopeng.jpg';
  if (imageUrl) {
    image = imageUrl;
  }

  return (
    <Head>
      <title>{title} | The New York Public Library</title>
      <link rel="shortcut icon" href="https://ux-static.nypl.org/images/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="The New York Public Library (NYPL)" />
      <meta name="description" content={metaDescription} />
      <meta name="allow-search" content="yes" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="The New York Public Library" />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@nypl" />
      <meta name="twitter:creator" content="@nypl" />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}

export default Meta;
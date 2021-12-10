import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HeadingLevels,
} from "@nypl/design-system-react-components";
import s from "./AudioEmbed.module.css";

interface AudioEmbedProps {
  id: string;
  type: string;
  embedCode: string;
}

/*function iFrame({ src, title }: { src: string; title: string }) {
  return (
    <iframe
      width="100%"
      height="80"
      title={title}
      frameborder="0"
      allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      src={src}
    />
  );
}
*/

function AudioEmbed({ id, type, embedCode }: AudioEmbedProps) {
  const [oEmbed, setOembed] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        let oembedBaseUrl = "";
        if (embedCode.includes("spotify")) {
          oembedBaseUrl = "https://open.spotify.com/oembed?url";
        }
        if (embedCode.includes("soundcloud")) {
          oembedBaseUrl = "https://soundcloud.com/oembed?url";
        }
        if (embedCode.includes("libsyn")) {
          // Special handling for libsyn.
          // @TODO figure out why drupal fake oembed doesnt work here?
          const libsynIframe = `<iframe allowfullscreen height="90" mozallowfullscreen msallowfullscreen oallowfullscreen scrolling="no" src="${embedCode}" style="border: none" webkitallowfullscreen width="640"></iframe>`;
          setOembed(libsynIframe);
        }
        const response = await fetch(`${oembedBaseUrl}=${embedCode}`);
        const json = await response.json();
        setOembed(json.html);
      } catch (e) {
        console.error(e);
      }
    }
    if (embedCode) {
      fetchData();
    }
  }, []);

  return (
    <div id={id} className={s.container}>
      {oEmbed && <div dangerouslySetInnerHTML={{ __html: oEmbed }} />}
    </div>
  );
}

export default AudioEmbed;

import { useEffect, useState } from "react";
const { NEXT_PUBLIC_SCOUT_DOMAIN } = process.env;

function useOembedApi(oembedUrl: string, embedCode: string) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const fetchOembed = async () => {
      const response = await fetch(`${NEXT_PUBLIC_SCOUT_DOMAIN}/api/oembed`, {
        body: JSON.stringify({
          url: `${oembedUrl}=${embedCode}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const json = await response.json();
      setHtml(json.html);
    };
    fetchOembed().catch(console.error);
  }, []);

  return html;
}

export default useOembedApi;

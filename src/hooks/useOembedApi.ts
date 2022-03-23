import { useEffect, useState } from "react";

function useOembedApi(oembedUrl: string, embedCode: string) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const fetchOembed = async () => {
      const response = await fetch("/api/oembed", {
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

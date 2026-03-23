import { useEffect } from "react";

export default function useSeo(title, description) {
  useEffect(() => {
    document.title = `${title} | RightCollege4You`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);
}

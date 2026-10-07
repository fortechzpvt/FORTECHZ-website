import { breadcrumbJsonLd } from "@/lib/seo";

export default function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  const data = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name, path },
  ]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

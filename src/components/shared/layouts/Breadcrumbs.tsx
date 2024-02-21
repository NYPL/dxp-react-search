import { Breadcrumbs as DsBreadcrumbs } from "@nypl/design-system-react-components";

export interface BreadcrumbsProps {
  items: BreadcrumbsItem[];
  color?: string;
  pageTitle?: string;
}

export type BreadcrumbsItem = {
  url: string;
  text: string | React.ReactNode;
};

export default function Breadcrumbs({
  items,
  color,
  pageTitle,
}: BreadcrumbsProps) {
  if (items) {
    return (
      <DsBreadcrumbs
        breadcrumbsData={items}
        {...(color && {
          backgroundColor: color,
        })}
      />
    );
  }

  // If there's no breadcrumb items, then we just return home > current page title.
  return (
    <DsBreadcrumbs
      breadcrumbsData={[
        {
          text: "Home",
          url: "/",
        },
        {
          text: pageTitle,
          url: "",
        },
      ]}
      {...(color && {
        backgroundColor: color,
      })}
    />
  );
}

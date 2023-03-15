import { MenuProps as MenuType } from "./../components/ds-prototypes/Menu/Menu";
/**
 * @type {MenuType[]} railMenuContent
 */
export const railMenuContent = [
  {
    id: "more-at-nypl",
    title: "More at NYPL",
    items: [
      {
        title: "Get a Library Card",
        link: "https://www.nypl.org/library-card",
      },
      {
        title: "Find Your Next Book",
        link: "https://www.nypl.org/books-more/recommendations/staff-picks/adults",
      },
      {
        title: "Search Library Locations",
        link: "https://www.nypl.org/locations",
      },
      {
        title: "Reserve a Computer",
        link: "https://www.nypl.org/help/computers-internet-and-wireless-access/reserving-computer",
      },
    ],
  },
  {
    id: "ask-nypl",
    title: "Need Help? Ask NYPL",
    items: [
      {
        title: "Email us your question",
        link: "https://www.nypl.org/email-us",
      },
      {
        title: "Chat with a librarian",
        link: "https://www.nypl.org/get-help/contact-us/chat",
      },
      {
        title: "Text (917) 983-4584",
      },
      {
        title: "Call (917) ASK-NYPL",
        link: "tel:1-917-983-4584",
      },
      {
        title: "(917) 275-6975",
        link: "tel:1-917-275-6975",
      },
      {
        title: "TTY 212-930-0020",
      },
    ],
  },
  {
    id: "support-nypl",
    title: "Support NYPL",
    items: [
      {
        title: "Volunteer",
        link: "https://www.nypl.org/help/about-nypl/volunteer-nypl",
      },
      {
        title: "Support Your Library",
        link: "https://secure.nypl.org/site/Donation2?7825_donation=form1&amp;df_id=7825&amp;mfc_pref=T&amp;set_custom_Donation_Direction=Mid-Manhattan%20at%2042nd%20Street%20Library&amp;s_src=FRQXXZZ_QWLPN",
        linkType: "button",
      },
    ],
  },
];

export const articlesDatabasesSidebarMenu = [
  {
    id: "research-tools-menu",
    title: "More Research Tools",
    items: [
      {
        title: "Scholarly Journals",
        link: "/research/collections/articles-databases/find-journals-title-databases",
        description: "Search for full text or specific journals or magazines.",
      },
      {
        title: "Periodicals",
        link: "https://catalog.nypl.org/search/s",
        description: "Search within periodicals across 800 databases.",
      },
      {
        title: "Research Catalog",
        link: "https://www.nypl.org/research/research-catalog/",
        description:
          "Search materials from NYPL, Columbia University and Princeton University.",
      },
    ],
  },
  {
    id: "research-help-menu",
    title: "Research Help",
    items: [
      {
        title: "Chat with a Librarian",
        link: "https://www.nypl.org/get-help/contact-us/chat",
        description:
          "Chat with our expert staff in real-time, Monday through Friday, 10 AM to 6 PM.",
      },
      {
        title: "Research Guides",
        link: "https://libguides.nypl.org/?b=s",
        description:
          "Explore dozens of subjects with databases specially curated by our librarians.",
      },
      {
        title: "Report a Problem",
        link: "https://www.nypl.org/collections/articles-databases/report-problem",
        description:
          "Having issues connecting to or using these resources? Contact us!",
      },
    ],
  },
];

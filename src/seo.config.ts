// @SEE https://www.npmjs.com/package/next-seo#default-seo-configuration

import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kanban-rpl.vercel.app",
    siteName: "INI LHO ITS! 2024",
    images: [
      {
        url: "https://kanban-rpl.vercel.app/og/favicon.png",
        width: 400,
        height: 300,
        alt: "Kanban Reynaldineo",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  titleTemplate: "%s | ReynaldiNeo",
  description:
    "Kanban app for managing your task, built with nextjs, tailwindcss, react-query, and react-hook-form.",
  defaultTitle: "Kanban | ReynaldiNeo",
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default config;

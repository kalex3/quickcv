import type { ContactKey, Details, Shown } from "./types";

export type ContactIcon =
  | "phone"
  | "mail"
  | "location"
  | "globe"
  | "github"
  | "linkedin";

export interface ContactItem {
  key: ContactKey;
  icon: ContactIcon;
  text: string;
  href?: string;
}

const filled = (value: string | null | undefined): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const displayUrl = (url: string): string =>
  url.replace(/^https?:\/\//i, "").replace(/\/+$/, "");

const externalHref = (url: string): string =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;

export const githubHandle = (value: string): string => {
  const trimmed = value.trim().replace(/\/+$/, "");
  const fromUrl = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/([^/?#]+)/i,
  )?.[1];
  return (fromUrl ?? trimmed).replace(/^@/, "");
};

const linkedinLabel = (value: string): string => {
  const slug = value.match(/linkedin\.com\/(?:in|company)\/([^/?#]+)/i)?.[1];
  return slug ?? displayUrl(value);
};

export const buildContactItems = (
  details: Details,
  shown: Shown,
): ContactItem[] => {
  const items: ContactItem[] = [];

  const phone = shown.phone ? filled(details.phone) : null;
  if (phone) items.push({ key: "phone", icon: "phone", text: phone });

  const email = shown.email ? filled(details.email) : null;
  if (email) items.push({ key: "email", icon: "mail", text: email });

  const location = shown.location ? filled(details.location) : null;
  if (location) items.push({ key: "location", icon: "location", text: location });

  const website = shown.website ? filled(details.website) : null;
  if (website) {
    items.push({
      key: "website",
      icon: "globe",
      text: displayUrl(website),
      href: externalHref(website),
    });
  }

  const github = shown.github ? filled(details.github) : null;
  if (github) {
    const handle = githubHandle(github);
    if (handle) {
      items.push({
        key: "github",
        icon: "github",
        text: `@${handle}`,
        href: `https://github.com/${encodeURIComponent(handle)}`,
      });
    }
  }

  const linkedin = shown.linkedin ? filled(details.linkedin) : null;
  if (linkedin) {
    items.push({
      key: "linkedin",
      icon: "linkedin",
      text: linkedinLabel(linkedin),
      href: externalHref(linkedin),
    });
  }

  return items;
};

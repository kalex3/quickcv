import type { Clickable, ContactKey, Details, Shown } from "./types";

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

const telHref = (phone: string): string => {
  const compact = phone.replace(/[^\d+]/g, "");
  return `tel:${compact || phone}`;
};

const link = (on: boolean, href: string): string | undefined =>
  on ? href : undefined;

export const buildContactItems = (
  details: Details,
  shown: Shown,
  clickable: Clickable,
): ContactItem[] => {
  const items: ContactItem[] = [];

  const phone = shown.phone ? filled(details.phone) : null;
  if (phone) {
    items.push({
      key: "phone",
      icon: "phone",
      text: phone,
      href: link(clickable.phone, telHref(phone)),
    });
  }

  const email = shown.email ? filled(details.email) : null;
  if (email) {
    items.push({
      key: "email",
      icon: "mail",
      text: email,
      href: link(clickable.email, `mailto:${email}`),
    });
  }

  const location = shown.location ? filled(details.location) : null;
  if (location) items.push({ key: "location", icon: "location", text: location });

  const website = shown.website ? filled(details.website) : null;
  if (website) {
    items.push({
      key: "website",
      icon: "globe",
      text: displayUrl(website),
      href: link(clickable.website, externalHref(website)),
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
        href: link(
          clickable.github,
          `https://github.com/${encodeURIComponent(handle)}`,
        ),
      });
    }
  }

  const linkedin = shown.linkedin ? filled(details.linkedin) : null;
  if (linkedin) {
    items.push({
      key: "linkedin",
      icon: "linkedin",
      text: linkedinLabel(linkedin),
      href: link(clickable.linkedin, externalHref(linkedin)),
    });
  }

  return items;
};

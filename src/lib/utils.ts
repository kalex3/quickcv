export const textAreaFormat = (x: string | null | undefined) =>
  x?.split("\n")?.map((l) => l?.slice(2))?.filter((l) => l?.trim()) ?? [];

export const generatePDF = () => {
  // mobiles
  if ("ontouchstart" in document.documentElement) {
    alert(
      "Printing on a phone is not available yet. Open this page on a computer, then choose Download PDF.",
    );
    return;
  }

  let opened = false;
  const markOpened = () => {
    opened = true;
  };
  window.addEventListener("beforeprint", markOpened);
  window.print();
  window.removeEventListener("beforeprint", markOpened);

  // Brave ignores window.print() with no error when printing is disabled.
  if (!opened) {
    alert(
      "Turn printing on in this browser, then try Download PDF again.",
    );
  }
};

export const formatUrl = (url: any) => {
   if(url?.startsWith("https")) {
    return url?.replace("https://", "");
  }
  return url
}

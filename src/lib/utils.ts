export const textAreaFormat = (x: string) =>
  x?.split("\n")?.map((l) => l?.slice(2));

export const generatePDF = () => {
  // mobiles
  if ("ontouchstart" in document.documentElement) {
    alert("WIP!");
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
      "Printing is disabled in this browser, so the resume can't be saved as a PDF.",
    );
  }
};

export const formatUrl = (url: any) => {
   if(url?.startsWith("https")) {
    return url?.replace("https://", "");
  }
  return url
}

import icons from "../icons";

export default {
  details: {
    name: "John Doe",
    about:
      "Frontend developer focused on clear interfaces and fast, accessible websites. I like turning rough ideas into pages people can actually use.",
    email: "john.doe@example.com",
    phone: "+1 555 010 1234",
    location: "New York, USA",
    role: "Frontend Developer",
    website: "https://example.com",
    github: "johndoe",
    linkedin: "https://www.linkedin.com/in/john-doe",
  },

  workExp: [
    {
      company: "Northwind Studio",
      title: "Frontend Developer",
      date: "2023 Apr - Present",
      desc: [
        "- Built and maintained the company marketing site",
        "- Turned design files into responsive React components",
        "- Shipped a small internal dashboard for the hiring team",
      ].join("\n"),
    },
    {
      company: "Acme Labs (Freelance)",
      title: "Web Developer",
      date: "2022 Jan - 2023 Mar",
      desc: [
        "- Built landing pages from Figma designs",
        "- Hooked a search page up to a public API and kept it usable on small screens",
      ].join("\n"),
    },
  ],

  education: [
    {
      institution: "State University",
      date: "2018 – 2022",
      qualification: "B.S. Computer Science",
    },
    {
      institution: "Central High School",
      date: "2014 – 2018",
      qualification: "High school diploma",
    },
  ],

  projects: [
    {
      name: "Quick CV",
      link: "https://example.com/quickcv",
      desc: "A small resume builder for trying layouts and exporting a PDF. This sample resume is the demo data.",
    },
    {
      name: "Trail Notes",
      link: "https://example.com/trail-notes",
      desc: "A notes app for hike plans, with a map preview and a simple offline list.",
    },
    {
      name: "Pantry",
      link: "https://example.com/pantry",
      desc: "A recipe box that groups meals by what is already in the kitchen.",
    },
  ],

  skills: [
    { name: "Html", icon: icons.html },
    { name: "Css", icon: icons.css },
    { name: "JavaScript", icon: icons.javascript },
    { name: "TypeScript", icon: icons.typescript },
    { name: "Svelte", icon: icons.svelte },
    { name: "SolidJS", icon: icons.solidjs },
    { name: "React", icon: icons.react },
    { name: "Lua", icon: icons.lua },
    { name: "Tailwind", icon: icons.tailwind },
    { name: "UnoCSS", icon: icons.unocss },
  ],
};

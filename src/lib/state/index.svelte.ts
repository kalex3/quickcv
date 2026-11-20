import type { Clickable, State, ListsData } from "./types";
import dummyState from "./dummydata";
import { buildContactItems } from "./contact";

const STORAGE_KEY = "cvbuilder";

const defaultClickable = (): Clickable => ({
  email: true,
  phone: true,
  website: true,
  github: true,
  linkedin: true,
});

const example = (): State => ({
  details: { ...dummyState.details },
  shown: {
    email: true,
    phone: false,
    location: false,
    website: true,
    github: true,
    linkedin: true,
  },
  clickable: defaultClickable(),
  workExp: dummyState.workExp.map((item) => ({ ...item })),
  education: dummyState.education.map((item) => ({ ...item })),
  projects: dummyState.projects.map((item) => ({ ...item })),
  skills: dummyState.skills.map((item) => ({ ...item })),
});

export let data: State = $state(example());

export const contactItems = () =>
  buildContactItems(data.details, data.shown, data.clickable);

export let ui = $state({
  mode: "split",
  panel: "editor",
  viewScale: 70,
});

export const addCard = (type: ListsData) => {
  data[type].push({});
};

export const deleteCard = (type: ListsData, index: number) => {
  data[type].splice(index, 1);
};

export const restoreState = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const saved = JSON.parse(raw) as Partial<State>;
    if (saved.details && typeof saved.details === "object") {
      data.details = { ...data.details, ...saved.details };
    }
    if (saved.shown && typeof saved.shown === "object") {
      data.shown = { ...data.shown, ...saved.shown };
    }
    if (saved.clickable && typeof saved.clickable === "object") {
      data.clickable = { ...data.clickable, ...saved.clickable };
    }
    if (Array.isArray(saved.workExp)) data.workExp = saved.workExp;
    if (Array.isArray(saved.education)) data.education = saved.education;
    if (Array.isArray(saved.projects)) data.projects = saved.projects;
    if (Array.isArray(saved.skills)) data.skills = saved.skills;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const serializeState = () =>
  JSON.stringify({
    details: $state.snapshot(data.details),
    shown: $state.snapshot(data.shown),
    clickable: $state.snapshot(data.clickable),
    workExp: $state.snapshot(data.workExp),
    education: $state.snapshot(data.education),
    projects: $state.snapshot(data.projects),
    skills: $state.snapshot(data.skills),
  });

export const persistState = () => {
  localStorage.setItem(STORAGE_KEY, serializeState());
};

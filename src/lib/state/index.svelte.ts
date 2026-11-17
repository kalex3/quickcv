import type { State, ListsData } from "./types";
import dummyState from "./dummydata";
import { buildContactItems } from "./contact";

const STORAGE_KEY = "quickcv";

const example = (): State => ({
  details: { ...dummyState.details },
  shown: {
    email: true,
    phone: true,
    location: true,
    website: true,
    github: true,
    linkedin: true,
  },
  workExp: dummyState.workExp.map((item) => ({ ...item })),
  education: dummyState.education.map((item) => ({ ...item })),
  projects: dummyState.projects.map((item) => ({ ...item })),
  skills: dummyState.skills.map((item) => ({ ...item })),
});

export let data: State = $state(example());

export const contactItems = () => buildContactItems(data.details, data.shown);

export let ui = $state({
  mode: "split",
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
    if (Array.isArray(saved.workExp)) data.workExp = saved.workExp;
    if (Array.isArray(saved.education)) data.education = saved.education;
    if (Array.isArray(saved.projects)) data.projects = saved.projects;
    if (Array.isArray(saved.skills)) data.skills = saved.skills;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const persistState = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      details: $state.snapshot(data.details),
      shown: $state.snapshot(data.shown),
      workExp: $state.snapshot(data.workExp),
      education: $state.snapshot(data.education),
      projects: $state.snapshot(data.projects),
      skills: $state.snapshot(data.skills),
    }),
  );
};

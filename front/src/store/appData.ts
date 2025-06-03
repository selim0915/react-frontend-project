/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidV4 } from 'uuid';

type Section = {
  id: string;
  title: string;
  est: any;
  act: number;
  isDiscuss: boolean;
};

const store = {
  sectionList: [] as Section[],
};

const addSection = (title: string, est: any) => {
  store.sectionList.push({
    id: uuidV4(),
    title,
    est,
    act: 0,
    isDiscuss: false
  });
};

const startDiscuss = (id: string) => {
  const s = store.sectionList.find((section: Section) => section.id === id);
  if (s) {
    s.isDiscuss = true
  };
};

const stopDiscuss = (id: string) => {
  const s = store.sectionList.find((section: Section) => section.id === id);
  if (s) {
    s.isDiscuss = false;
  }
};

const removeSection = (id: string) => {
  store.sectionList = store.sectionList.filter(section => section.id !== id);
};

const exportObject = {
  store,
  addSection,
  startDiscuss,
  stopDiscuss,
  removeSection,
};

export default exportObject;

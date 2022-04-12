import { subjectType } from "../models/ComponentsTypes";

const GetSubjectFromChapter = (id: string, Array: subjectType[]) => {
  const result = Array.find((el) => el.Chapters.find((ele) => ele.id === id));
  return result;
};

export default GetSubjectFromChapter;

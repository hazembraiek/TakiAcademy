import GetData from "./GetData";

const GetSubjectSections = (Sections, Subjects, id) => {
  const SectionChild = Sections.find((el) =>
    el.children.find((ele) => ele === id)
  );
  return SectionChild?.subjects.map((ele) => GetData(ele, Subjects));
};

export default GetSubjectSections;

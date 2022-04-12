const Getprogress = (progressSubjects, id: string) => {
  return Math.trunc(progressSubjects.find((el) => el.id === id)?.progress);
};

export default Getprogress;

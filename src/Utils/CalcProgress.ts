const CalcProgress = (Progress, chap, id) => {
  const progress = Progress.find(
    (ele) => ele.ChapterId === chap.id && ele.childId === id
  )?.progress;
  return { progress };
};

export default CalcProgress;

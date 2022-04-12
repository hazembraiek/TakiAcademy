function HeaderExame({ subject, title, prof, date }) {
  return (
    <>
      <p className="examen__subject">{subject}</p>
      <p className="examen__title">{title}</p>
      <div className="examen__prof-date">
        <p className="prof">Par Professor: {prof}</p>
        <p className="date">Date de fin : {date}</p>
      </div>
    </>
  );
}

export default HeaderExame;

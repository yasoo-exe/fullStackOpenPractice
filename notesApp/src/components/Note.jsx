const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;

// const toggleImportanceOf = (id) => {
//     console.log("importance of " + id + " needs to be toggled");
//   };

import { useState, useRef, useEffect } from "react";
import { getNoteNames } from "./utils";
export const Notes = () => {
  const [note, setNote] = useState("");
  const [oldNote, setOldNote] = useState([]);
  const textAreaRef = useRef(null);
  const handleTextChange = (e) => {
    const value = e?.target?.value;
    setNote(value);
  };
  useEffect(() => {
    if (textAreaRef.current) {
      console.log({ textAreaRef });
      console.log("currnet", textAreaRef.current);
      // textAreaRef.current.focus();
    }
    setOldNote((prevOldNote) => [...prevOldNote, getNoteNames()]);
  }, []);
  console.log({ oldNote });
  const [cols, setCols] = useState(50); // Initial number of columns for the textarea

  useEffect(() => {
    const calculateInitialCols = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      console.log({ windowWidth, windowHeight });
      // You can adjust this logic to determine the initial number of columns as needed
      // calculating width based on window size
      let width = windowWidth / 8.2 - 10;
      console.log({ width });
      setCols(width);
      // textAreaRef.current.focus();
    };

    // Calculate the initial number of columns
    calculateInitialCols();

    // Add an event listener to listen for window resize
    window.addEventListener("resize", calculateInitialCols);

    // Clean up the event listener when the component unmounts
    return () => {
      console.log("cleanup triggered");
      window.removeEventListener("resize", calculateInitialCols);
    };
  }, []);
  const resetHandler = () => {
    setNote("");
    // textAreaRef.current.focus();
  };
  const getCurrentTime = () => {
    return new Date().toDateString();
  };
  const newlineRegex = /\n/;
  const getNoteName = () => {
    const currentTime = getCurrentTime();
    let noteName = note.split(" ")[0];
    console.log("1 note name", noteName);
    if (newlineRegex.test(noteName)) {
      console.log("notename regex text");
      noteName = noteName.split("\n")[0];
      console.log("2 notenmae", noteName);
    }
    console.log({ note });
    console.log({ firstWord: noteName });
    return `${noteName}_${currentTime.split(" ").join("_")}`;
  };
  const saveHandler = () => {
    // Check if note is presnet
    if (!note.length) {
      alert("Pleae add contnet to note before saving");
    }
    const noteName = `___${getNoteName()}`;
    console.log({ finalNoteName: noteName });
    localStorage.setItem(
      noteName,
      JSON.stringify({ data: note, time: getCurrentTime() })
    );
  };
  const buttonContianerStyles = {
    padding: "5px"
  };
  const buttonStyle = {
    margin: "5px"
  };
  return (
    <div>
      <h1>Temp Notes</h1>
      <div style={buttonContianerStyles}>
        <button style={buttonStyle} onClick={resetHandler}>
          Reset
        </button>
        <button style={buttonStyle} onClick={saveHandler}>
          Save
        </button>
      </div>
      <textarea
        ref={textAreaRef}
        rows="20"
        cols={cols}
        value={note} // Set the textarea value from state
        onChange={handleTextChange} // Handle changes
        placeholder="First word of note is treated as note title. example: my_cat_hates_me"
      />
    </div>
  );
};

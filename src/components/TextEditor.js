import React, { useState,useRef } from "react";
import { Editor, EditorState, RichUtils,Modifier } from "draft-js";
import "./TextEditor.css";
import "draft-js/dist/Draft.css";

const TextEditor = () => {
  const ref=useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [textAlignment,setTextAlignment]=useState("")

  const onFontSizeChange = (e) => setFontSize(e.target.value);
  const onFontFamilyChange = (e) => setFontFamily(e.target.value);
  const onFontColorChange = (e) => setFontColor(e.target.value);

  // Clear the content
  const clearEditorContent = () => setEditorState(EditorState.createEmpty());

  // Function to handle word and letter count
  const countWords = () => {
    const plainText = editorState.getCurrentContent().getPlainText("");
    const wordsArray = plainText.match(/\w+/g);
    return wordsArray ? wordsArray.length : 0;
  };

  const countLetters = () => {
    const plainText = editorState.getCurrentContent().getPlainText("");
    return plainText.length;
  };

  // Handle inline style changes
  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // Handle text alignment using block data
  const toggleAlignment = (alignment) => {
    setTextAlignment(alignment)
    console.log("ref",ref.current)
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithAlignment = Modifier.setBlockData(
      contentState,
      selection,
      { textAlign: alignment }
    );

    setEditorState(
      EditorState.push(editorState, contentStateWithAlignment, "change-block-data")
    );
  };


  // // Apply styles such as font size, family, and color
  // const applyStyle = () => {
  //   const newEditorState = EditorState.setInlineStyleOverride(editorState, new Set([
  //     `FONTSIZE-${fontSize}`,
  //     `FONTFAMILY-${fontFamily}`,
  //     `FONTCOLOR-${fontColor}`
  //   ]));
  //   setEditorState(newEditorState);
  // };

  // Function to apply text transformations
  const transformText = (transform) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const selectedText = contentState.getBlockForKey(selection.getStartKey()).getText().slice(selection.getStartOffset(), selection.getEndOffset());

    let transformedText;
    if (transform === "UPPERCASE") {
      transformedText = selectedText.toUpperCase();
    } else if (transform === "LOWERCASE") {
      transformedText = selectedText.toLowerCase();
    }

    const contentStateWithTransformedText = Modifier.replaceText(contentState, selection, transformedText);
    setEditorState(EditorState.push(editorState, contentStateWithTransformedText, "insert-characters"));
  };

  return (
    <div>
      <div>
      {/* Toolbar */}
      <div class="flex flex-row flex-wrap items-center gap-y-4 justify-evenly border-none bg-gray-400 max-h-13 min-h-8  pt-2 pb-2 font-semibold">
        <button class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => toggleInlineStyle("BOLD")}>B</button>
        <button class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => toggleInlineStyle("ITALIC")}>I</button>
        <button class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => toggleInlineStyle("UNDERLINE")}>U</button>

        {/* Font Size */}
        <select class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onChange={onFontSizeChange} value={fontSize}>
          <option value={12}>12px</option>
          <option value={14}>14px</option>
          <option value={16}>16px</option>
          <option value={18}>18px</option>
          <option value={20}>20px</option>
          <option value={22}>22px</option>
          <option value={24}>24px</option>
          <option value={28}>28px</option>
        </select>

        {/* Font Family */}
        <select class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onChange={onFontFamilyChange} value={fontFamily}>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Cambria">Cambria</option>
          <option value="Constantia">Constantia</option>
        </select>

        {/* Font Color */}
        <input class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" type="color" onChange={onFontColorChange} value={fontColor} />

        {/* Text Alignment */}
        <button className="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => toggleAlignment("left")}>Left</button>
        <button className="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => toggleAlignment("center")}>Center</button>
        <button className="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => toggleAlignment("right")}>Right</button>

         {/* Text Transformation */}
         <button class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => transformText("UPPERCASE")}>Uppercase</button>
        <button class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={() => transformText("LOWERCASE")}>Lowercase</button>

        {/* Clear Page */}
        <button class="border-2 rounded-md pt-2 pr-2 pb-2 pl-2 bg-white" onClick={clearEditorContent}>Clear</button>
      </div>

      {/* Apply Style Button */}
      {/* <button onClick={applyStyle}>Apply Style</button> */}
    </div>
      {/* Editor Area */}
      <div
        ref={ref}
        style={{
          border: "1px solid #ccc",
          width:"100vw",
          display:"inline-block",
          marginTop:"10px",
          padding: "10px",
          minHeight: "550px",
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          color: fontColor,
          textAlign:textAlignment.toString,
        }}
      >
        <Editor editorState={editorState} onChange={setEditorState} placeholder="Type Here..." />
      </div>

      {/* Word and Letter Count */}
      <div class="flex gap-x-4 justify-center">
        <p>Total Words: {countWords()}</p>
        <p>Total Letters: {countLetters()}</p>
      </div>
    </div>
  );
};

export default TextEditor;

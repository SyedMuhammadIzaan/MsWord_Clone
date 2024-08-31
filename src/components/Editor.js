import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
const Editor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false, 
    height: 700,     // set the height
    placeholder:"Type here..."
  };
  return (
    <div class="min-h-10">
      <JoditEditor
        height={500}
        config={config}
        ref={editor}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
};

export default Editor;

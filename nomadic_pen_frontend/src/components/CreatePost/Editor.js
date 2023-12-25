/* Author: Meet Sinojia */

import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import * as Emoji from "quill-emoji";

import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";

Quill.register("modules/emoji", Emoji);

export const EditorContentChanged = {
  html: "",
};

export const EditorProps = {
  value: "",
  onChange: (changes) => {},
};

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
  ["emoji"],
  ["clean"],
];

export default function Editor(props) {
  const [value, setValue] = useState(props.value || "");

  const onChange = (content) => {
    setValue(content);

    if (props.onChange) {
      props.onChange({
        html: content,
      });
    }
  };

  return (
    <ReactQuill
      theme="snow"
      placeholder="Start writing..."
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
        "emoji-toolbar": true,
        "emoji-textarea": false,
        "emoji-shortname": true,
      }}
      value={value}
      onChange={onChange}
    />
  );
}

import React from "react";
import "./SuccessStories.scss";
import StoryCardComponent from "./components/StoryCardComponent/StoryCardComponent";
import ComingSoonComponent from "../ComingSoon/ComingSoon";

const sampleData = {
  uuid: "1bef058f-f834-456a-bf3c-6257a4037d49",
  title: "some title",
  story:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years olRichar McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.. comes from a line in section 1.10.32 The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  author: "Ahmad Yar Khan",
  picture: null,
  category: 1,
  upvotes: 13,
  created_at: "2020-06-23T16:49:37.000Z",
  updated_at: "2020-06-23T18:20:45.000Z"
};

const SuccessStories: React.FC<any> = () => {
  return (
    <div className="suceess-stories-component">
      <h1 className="stories-wrapper-heading">Covid Success Stories</h1>
      {true && <ComingSoonComponent />}
      {false && (
        <>
          <StoryCardComponent />
          <StoryCardComponent />
          <StoryCardComponent />
          <StoryCardComponent />{" "}
        </>
      )}
    </div>
  );
};

export default SuccessStories;

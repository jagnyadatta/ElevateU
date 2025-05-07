import Content from "./Content";
import Title from "./Title";

export default function FrontPagelayout() {
  return (
    <div className="flex w-full justify-center items-center relative z-3 ">
      <Title />
        <Content />
    </div>
  );
}
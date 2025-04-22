import Content from "./Content";
import Title from "./Title";

export default function FrontPagelayout() {
  return (
    <div className="flex w-full h-screen justify-center items-center relative z-3 ">
      <Title />
        <Content />
    </div>
  );
}
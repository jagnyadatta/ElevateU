import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypingEffect = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Carrer Counselling", "Admission Counselling"],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true
    });

    return () => {
      typed.destroy(); // Clean up the instance when the component unmounts
    };
  }, []);

  return (
    <span ref={typedRef} className="text-blue-600 font-semibold"></span>
  );
};

export default TypingEffect;

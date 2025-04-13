export default function Contentt() {
    return (
      <>
        <div className=" w-full h-screen  hidden sm:block" z-5>
          <div className=" h-screen flex flex-col justify-end ">
            <div className="flex h-[50vh] absolute  ml-[10vh] md:mb-[30vh]  w-[30vw] sm:mb-[20vh] ">
              <div className="flex flex-col items-end">
                <img
                  src="/image/think30.png"
                  alt="element1"
                  className="w-50 "
                />
                <img
                  src="/image/think20.png"
                  alt="element1"
                  className="w-15 "
                />
              </div>
              <div>
  
              <img
                src="/image/think40.png"
                alt="element1"
                className="w-20 "
                />
              <img
                src="/image/think10.png"
                alt="element1"
                className="w-20 "
                />
                </div>
            </div>
            <div className="flex justify-end w-[50vw  ">
              <img
                src="/image/person-laptop.png"
                alt="person-with-table"
                className="  w-[46vw]  "
              />
            </div>
          </div>
        </div>
      </>
    );
  }
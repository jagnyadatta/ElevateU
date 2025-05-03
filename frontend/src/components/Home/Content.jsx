export default function Content() {
    return (
      <>
        <div className=" w-full h-screen  hidden sm:block" z-5>
          <div className=" h-screen flex flex-col justify-end ">
            <div className="flex h-[50vh] absolute  ml-[10vh] md:mb-[30vh]  w-[30vw] sm:mb-[20vh] ">
              <div className="flex flex-col items-end">
                <img
                  src="/image/think30.png"
                  alt="element1"
                  className="w-50 " data-aos="zoom-in"
                  data-aos-duration="400" 
                />
                <img
                  src="/image/think20.png"
                  alt="element1"
                  className="w-15 " data-aos="zoom-in"
                  data-aos-duration="600" 
                />
              </div>
              <div>
  
              <img
                src="/image/think40.png"
                alt="element1"
                className="w-20 " data-aos="zoom-in"
                data-aos-duration="500" 
                />
              <img
                src="/image/think10.png"
                alt="element1"
                className="w-20 " data-aos="zoom-in"
                data-aos-duration="300" 
                />
                </div>
            </div>
            <div className="flex items-end justify-end w-full h-full overflow-hidden   ">
              <img
                src="/image/person-laptop.png"
                alt="person-with-table"
                className="w-[90%] h-[72%] " data-aos="fade-left" data-aos-offset="0" 
              />
            </div>
          </div>
        </div>
      </>
    );
  }
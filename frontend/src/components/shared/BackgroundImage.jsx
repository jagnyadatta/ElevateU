export default function BackgroundImage() {
    return (
      <>
        {/* Background Image (Covers Entire Page) */}
        <div className="w-full flex flex-col items-center justify-center p-0 ">
          <div className="fixed inset-0 bg-amber-500 w-full h-full flex items-center justify-center img-card sm:opacity-20 opacity-30 z-0">
            <img
              src="/image/ElevateU.png"
              alt="homepage image"
              className="w-[50vw] md:w-[45vw]"
            />
          </div>
        </div>
      </>
    );
  }
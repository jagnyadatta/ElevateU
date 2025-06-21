export default function BackgroundImage() {
    return (
      <>
        {/* Background Image (Covers Entire Page) */}
        <div className="w-full flex flex-col items-center justify-center p-0 ">
          <div className="fixed inset-0 w-full h-full flex items-center justify-center img-card ">
            <img
              src="/image/ElevateU.png"
              alt="homepage image"
              className="w-[50vw] md:w-[45vw] sm:opacity-20 opacity-30"
            />
          </div>
        </div>
      </>
    );
  }
import React from "react";

function BackgroundImage() {
  return (
    <div>
      <div className="flex absolute h-full w-screen bg-black">
        <img
          className="hidden sm:hidden md:block lg:block xl:block h-screen w-screen object-fill"
          alt="background logo"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg"
        ></img>
      </div>
    </div>
  );
}

export default BackgroundImage;

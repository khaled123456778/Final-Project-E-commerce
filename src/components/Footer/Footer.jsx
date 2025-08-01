export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 px-5 md:px-16 theme mt-10">
      {/* App link section */}
      <div className="container">
        <div className="text-right">
          <h2 className="text-2xl text-slate-950 dark:text-gray-100 mb-2 text-left font-light">
            Get the FreshCart app
          </h2>
          <p className="dark:text-slate-100 mb-4 text-left font-light text-slate-950">
            We will send you a link, open it on your phone to download the app.
          </p>

          <div className="container">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email .."
                className="text-slate-950 dark:bg-white w-full text-sm border h-[40px] border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 font-light"
              />
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-sm px-6 py-2.5 mb-2 sm:mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-nowrap font-light text-md tracking-wide"
              >
                Share App Link
              </button>
            </div>
          </div>

          <hr className="my-8 border-gray-300" />

          <div className="container">
            {/* Payment + App links section */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* Payment partners */}
              <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                <span className="dark:text-slate-100 text-slate-950 font-medium">
                  Payment Partners
                </span>

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="Visa"
                  className="h-6 object-contain"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                  alt="MasterCard"
                  className="h-6 object-contain"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="PayPal"
                  className="h-6 object-contain"
                />
              </div>

              {/* App store buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <span className="text-gray-700 font-medium">
                  Get deliveries with FreshCart
                </span>
                <div className="flex gap-3">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    className="h-10"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

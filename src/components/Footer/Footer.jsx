export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10 px-5 md:px-16 mt-10">
      {/* Wrapper Container */}
      <div className="max-w-7xl mx-auto">
        {/* App link section */}
        <div>
          <h2 className="text-2xl text-slate-950 dark:text-gray-100 mb-2 font-light text-left">
            Get the FreshCart app
          </h2>
          <p className="text-slate-950 dark:text-slate-100 mb-4 font-light text-left">
            We will send you a link, open it on your phone to download the app.
          </p>

          {/* Email input and button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Email .."
              className="w-full text-sm h-[40px] border border-gray-300 rounded-sm px-3 font-light text-slate-950 dark:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-sm px-6 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-light text-md tracking-wide text-nowrap"
            >
              Share App Link
            </button>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-300 dark:border-gray-700" />

          {/* Payment + App Links Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Payment partners */}
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <span className="text-slate-950 dark:text-slate-100 font-medium">
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
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-end">
              <span className="text-gray-700 dark:text-gray-200 font-medium text-center sm:text-left">
                Get deliveries with FreshCart
              </span>
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
    </footer>
  );
}

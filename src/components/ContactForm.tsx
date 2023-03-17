import { createSignal } from "solid-js";

const [submitted, setSubmitted] = createSignal(false);

const submit = () => {
  setSubmitted(true);
};

const ContactForm = () => {
  return (
    <>
      {!submitted() ? (
        <div class="sm:border sm:border-gray-900 sm:p-8 mt-5">
          <form class="max-w-3xl ">
            <div>
              <label class="block text-sm font-normal tracking-wide">
                Name
              </label>
              <input class="w-full rounded-none focus:rounded-none focus:outline-none focus:ring-none border border-gray-900 px-3 py-1"></input>
            </div>
            <div class="mt-3">
              <label class="block text-sm font-normal tracking-wide">
                Email
              </label>
              <input class="w-full rounded-none focus:rounded-none focus:outline-none focus:ring-none border border-gray-900 px-3 py-1"></input>
            </div>

            <div class="mt-3">
              <label class="block text-sm font-normal tracking-wide">
                Message
              </label>
              <textarea class="w-full rounded-none focus:rounded-none focus:outline-none focus:ring-none border border-gray-900 px-3 py-1">

              </textarea>
            </div>
          </form>
          <button class="group flex flex-row mt-5 px-5 py-1.5 bg-gray-900 text-gray-100 items-center" onClick={() => submit()}>
            <span class="font-light tracking-wide">
            Send
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 group-hover:translate-x-1 group-active:translate-x-1 transition duration-200 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div class="mt-5">Thankyou. I will get back to you shortly.</div>
      )}
    </>
  );
};

export default ContactForm;

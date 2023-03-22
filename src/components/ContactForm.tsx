import { createSignal, Show } from "solid-js";

const [email, setEmail] = createSignal("");
const [name, setName] = createSignal("");
const [message, setMessage] = createSignal("");
const [receiveUpdates, setReceiveUpdates] = createSignal(false);

const [formValidationErrors, setFormValidationErrors] = createSignal<{
  name?: string;
  email?: string;
  message?: string;
}>({});

const [submitted, setSubmitted] = createSignal(false);

type FormDataType = {
  name: string;
  email: string;
  message: string;
  receiveUpdates: boolean;
};

const sendForm = async (formData: FormDataType) => {
  setFormValidationErrors({});

  await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: formData,
    }),
  }).then(async (res) => {
    if (res.status === 400) {
      let { fieldErrors } = await res.json();
      setFormValidationErrors(fieldErrors);
    } 

    if (res.status === 200){
      setSubmitted(true)
    }
  });
};

const submit = () => {
  const formData: FormDataType = {
    name: name(),
    email: email(),
    message: message(),
    receiveUpdates: receiveUpdates(),
  };
  sendForm(formData);
};

const submittedMessage = () => {
  return (
    <div class="sm:border sm:border-gray-900 sm:p-8 mt-5">
      <h2 class="text-2xl font-light tracking-wide mb-4">
        Thank you for your message!
      </h2>
      <p class="text-sm font-light tracking-wide mb-4">
        I will get back to you as soon as possible.
      </p>
    </div>
  );
};

const ContactForm = () => {
  return (
    <>
      <Show when={!submitted()} fallback={submittedMessage()}>
        <div class="sm:border sm:border-gray-900 sm:p-8 mt-5">
          <form class="max-w-3xl ">
            <div>
              <label
                for={"name"}
                class={`block text-sm font-light tracking-wide`}
              >
                Name
              </label>
              <input
                id="name"
                placeholder="Your name"
                type="text"
                formNoValidate={true}
                required
                autocomplete={"name"}
                value={name()}
                onChange={(e) => setName(e.currentTarget.value)}
                class={`w-full rounded-none font-light tracking-wide border focus:rounded-none focus:outline-none focus:ring-0 focus:border-gray-800 px-3 py-1 ${
                  "name" in formValidationErrors()
                    ? "border-red-500 mb-0"
                    : "border-gray-800 mb-4"
                }`}
              ></input>
              <span class="h-4 text-gray-700 text-sm font-light inline-flex items-center gap-x-1">
                <Show when={"name" in formValidationErrors()}>
                  <span class="h-4 text-gray-700 text-sm font-light inline-flex items-center gap-x-1 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-4 h-4 text-red-600/50"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {formValidationErrors().name}
                  </span>
                </Show>
              </span>
            </div>
            <div>
              <label class="block text-sm font-light tracking-wide">
                Email
              </label>
              <input
                id={"email"}
                placeholder="your@email.com"
                type="email"
                required
                autocomplete="email"
                value={email()}
                onChange={(e) => setEmail(e.currentTarget.value)}
                class={`w-full rounded-none font-light tracking-wide border focus:rounded-none focus:outline-none focus:ring-0 focus:border-gray-800 px-3 py-1 ${
                  "email" in formValidationErrors()
                    ? "border-red-500 "
                    : "border-gray-800 mb-4"
                }`}
              ></input>
              <Show when={"email" in formValidationErrors()}>
                <span class="h-4 text-gray-700 text-sm font-light inline-flex items-center gap-x-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-4 h-4 text-red-600/50"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {formValidationErrors().email}
                </span>
              </Show>
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-light tracking-wide"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows="4"
                value={message()}
                onChange={(e) => setMessage(e.currentTarget.value)}
                placeholder="Type your message here..."
                class={`w-full rounded-none font-light tracking-wide border focus:rounded-none focus:outline-none focus:ring-0 focus:border-gray-800 px-3 py-1 ${
                  "message" in formValidationErrors()
                    ? "border-red-500"
                    : "border-gray-800 mb-4"
                }`}
              />
              <span class="h-4 text-gray-700 text-sm font-light inline-flex items-center gap-x-1">
                <Show when={"message" in formValidationErrors()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-4 h-4 text-red-600/50"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {formValidationErrors().message}
                </Show>
              </span>
            </div>

            {/* <div class="mt-3 flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                checked={receiveUpdates()}
                onClick={() => {
                  setReceiveUpdates(!receiveUpdates());
                }}
              ></input>
              <label class="font-light tracking-wide leading-4 text-sm sm:text-md">
                Please add me to your mailing list and keep me updated
              </label>
            </div> */}
          </form>
          <button
            class="group flex flex-row mt-5 px-5 py-1.5 bg-gray-900 text-gray-100 items-center"
            onClick={() => submit()}
          >
            <span class="font-light tracking-wide">Send</span>
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
      </Show>
    </>
  );
};

export default ContactForm;

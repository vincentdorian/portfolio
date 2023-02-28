import { createSignal, Show } from "solid-js";

const [show, setShow] = createSignal('short')

const AboutMeSection = () => {
    return (
        <div class="max-w-3xl relative">
        <span class="inline-flex">
        <h1 class="text-3xl sm:text-4xl font-bold">
            About me
        </h1>
        <button class="ml-3 inline-flex bg-indigo-700 font-semibold text-indigo-50 rounded w-20 hover:bg-indigo-600 hover:text-white items-center justify-center text-xl" onClick={() => {show() === 'long' ? setShow('short') : setShow('long')}}>
            {show() === 'long' ? 'long' : 'short'}
        </button>
        </span>
        <Show when={show() === 'long'}>
            <p class="text-base sm:text-lg mt-5">
                    Now that I think about it, my path in web development was partly laid in <strong>2014-2016</strong> when I went to August-Bebel-Schule (Offenbach, Germany) a high school with a focus on <strong>media design. </strong>
                    Here, I made my first experience with <strong>web design and static HTML</strong>, however the biggest gain back then was learning about basic design principles and how to apply them.
                </p>

                <p class="text-base sm:text-lg mt-5">
                    After graduating and spending some time abroad, I began studying Advanced Technology at the <strong>University of Twente (Enschede, Netherlands) in 2017</strong>. 
                    This Bachelor of Science program was a mix of interdisciplinary fields, ranging from <strong>electrical engineering, advanced mechanics, mechatronics and robotics to technical computer science and systems engineering.</strong>
                    During my studies I was was tought the fundamentals of Computer Science, <strong>basics in hard- and software engineering and writing algorithms using languages like C, C++, Python and Java. </strong>
                    Back then I was looking forward to a career in the fields of Robotics, which had turnt out to have come differently.
                </p>

                <p class="text-base sm:text-lg mt-5">
                    In <strong>2021</strong> I finished my <strong>BSc thesis</strong> about virtual agents in <strong>Augmented Reality</strong>  used in primary education.
                    This work was an explorative study where I have designed a virtual robot in AR on a mobile device, that should assist children while doing their homework to foster learning motivation.
                    I think this way of human computer interaction will play a major role in the future of society and looking at the current emergence of artificial intelligence and its implications.
                </p>

                <p class="text-base sm:text-lg mt-5">
                    All together my educational background has prepared my quite well for all the challenges I am encountering in my daily work.
                    Having a design and engineering background also helps me to create user centered products that run reliably and performant.
                </p>

                <p class="text-base sm:text-lg mt-5">
                    After graduating in <strong>April 2021,</strong> I got my first job in web dev, working on several projects based on <strong>Laravel and VueJS or NuxtJS.</strong>
                </p>

                <p class="text-base sm:text-lg mt-5">
                    Since the middle of 2022 I am broadening my scope and exploring all kinds of different technologies in the web space. For the future I am looking to become an active member in the web community, contributing to open source and building something that moves people.
                </p>


        </Show>
        <Show when={show() === 'short'}>
            <p class="text-base sm:text-lg mt-5">
                I started my career as a <strong>web developer</strong> back in <strong>2021</strong> and my job has become my hobby and passion.
                Through my <strong>design and engineering background</strong>, I am a <strong>good generalist,</strong> always able to look at problems from different angles.
            </p>

            <p class="text-base sm:text-lg mt-5">
                Apart from web development I am interested in the topics <strong>virtual worlds, AI, blockchain, web3</strong> and many more.
            </p>

            <p class="text-base sm:text-lg mt-5">
                When I am not coding, you can probably catch me riding my gravel bike, reading a book or eating.
            </p>
        </Show>
    </div>
    )
}

export default AboutMeSection
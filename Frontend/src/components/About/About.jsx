export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                        Connecting People in Real-Time Conversations
                        </h2>
                        <p className="mt-6 text-gray-600">
                        Developing a web-based chatting application involves creating an interactive and dynamic platform that enables users to engage in real-time conversations through a web browser. The application typically employs a client-server architecture, where the server manages the flow of messages and user interactions. Users access the application through a web interface that provides a seamless and responsive chatting experience.

Key features of a web chatting app include user authentication for secure access, ensuring that only registered users can participate in conversations. Real-time communication is facilitated using technologies like WebSockets, allowing instant message delivery between users. The user interface often includes a messaging window, user profiles, and online status indicators.
                        </p>
                        <p className="mt-4 text-gray-600">
                        The development process typically involves using web development technologies like HTML, Talwind CSS, and JavaScript for the front end, along with frameworks such as React. On the server side, technologies like Node.js
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
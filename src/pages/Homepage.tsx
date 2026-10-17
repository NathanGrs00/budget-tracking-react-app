import chartPicture from "../assets/chart-picture.png";
import { href } from "../hooks/useHashRoute.ts";

function Homepage() {
    return (
        <section className="container card-panel rounded-4 shadow mt-5 p-0 d-flex flex-column flex-lg-row align-items-center overflow-hidden">
            <div className="flex-grow-1 p-4 p-md-5 text-center text-lg-start">
                <h1 className="fw-bold">Welcome!</h1>
                <h2 className="h4 fw-normal">Get insight into your monthly budget for free.</h2>
                <ol className="text-start mt-4 mb-4 d-inline-block">
                    <li>Add your income for the month.</li>
                    <li>Add your expenses. Mark the ones that come back every month.</li>
                    <li>See what is left, and how your months compare.</li>
                </ol>
                <p className="text-body-secondary small">
                    Everything is saved in this browser only. Nothing is sent to a server.
                </p>
                <a className="btn btn-primary btn-lg" href={href("income")}>
                    Start here!
                </a>
            </div>
            <div className="hero-image w-100">
                <img src={chartPicture} alt="Example pie chart of a monthly budget" className="img-fluid w-100 d-block" />
            </div>
        </section>
    );
}

export default Homepage;

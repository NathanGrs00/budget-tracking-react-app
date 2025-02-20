import chartPicture from "../assets/chart-picture.png";

interface Props {
    handleNavigating: (link: string) => void;
}

function Homepage({ handleNavigating }: Props) {
    return (
        <div className="container rounded-4 shadow mt-5 d-flex flex-column flex-lg-row align-items-center position-relative overflow-hidden">
            <div className="flex-grow-1 p-5 text-center text-lg-start">
                <h1 className="fw-bold">Welcome!</h1>
                <h2>Get insight into your monthly budget for free!</h2>
                <button className="btn btn-primary mt-3" onClick={() => handleNavigating("new-income")}>
                    Start here!
                </button>
            </div>

            <div className="position-relative w-100 w-lg-60">
                <img
                    src={chartPicture}
                    alt="Picture of pie chart"
                    className="img-fluid w-100"
                    style={{
                        height: "auto",
                        display: "block",
                        objectFit: "cover",
                        position: "relative",
                        zIndex: 1,
                    }}
                />
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: "linear-gradient(to left, rgba(0, 0, 0, 0.1), transparent)",
                        zIndex: 2,
                        translate: 15
                    }}
                />
            </div>
        </div>
    );
}

export default Homepage;

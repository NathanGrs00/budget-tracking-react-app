interface Props {
    label: string;
    value: string;
    tone?: "default" | "danger";
}

function StatCard({ label, value, tone = "default" }: Props) {
    return (
        <div className="col-12 col-sm-4">
            <div className="border rounded-3 p-3 h-100 bg-body">
                <div className="small text-body-secondary">{label}</div>
                <div className={`fs-5 fw-bold ${tone === "danger" ? "text-danger" : ""}`}>{value}</div>
            </div>
        </div>
    );
}

export default StatCard;

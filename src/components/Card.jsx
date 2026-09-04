import "../stylesheet/Card.css";
import { useState } from "react";

export const Card = (props) => {
    // The full details are shown only when "View Class" is pressed - the card
    // body and its image are deliberately not clickable.
    const [showDetails, setShowDetails] = useState(false);

    // An uploaded class image is stored as a bare file name; anything that is
    // already a usable address (bundled asset, blob, data or http URL) is kept.
    const isReadyUrl = /^(https?:|data:|blob:|\/)/.test(props.image || "");
    const imageUrl = isReadyUrl
        ? props.image
        : `http://localhost:3000/uploads/classImages/${props.image}`;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[300px] hover:shadow-lg transition duration-300">
            <img
                src={imageUrl}
                alt="Class"
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-xs font-semibold text-purple-600 uppercase mb-1">
                {props.classType} Class
            </p>
            <h1 className="text-xl font-bold text-gray-800 mb-2">{props.title}</h1>
            <p className="text-gray-600 mb-2">{props.subject}</p>

            {/* Shown where a class is not simply "yours", e.g. a pending request. */}
            {props.status && (
                <p className="inline-block text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full mb-2">
                    {props.status}
                </p>
            )}

            {showDetails && (
                <div className="text-sm text-gray-700 space-y-1 mb-3">
                    {props.teacher && (
                        <p>
                            <span className="font-semibold">Teacher:</span> {props.teacher}
                        </p>
                    )}
                    {props.classType === "physical" && (
                        <p>
                            <span className="font-semibold">Location:</span> {props.location}
                        </p>
                    )}
                    <p>
                        <span className="font-semibold">Start Date:</span> {props.date}
                    </p>
                    <p>
                        <span className="font-semibold">Time:</span> {props.time}
                    </p>
                    <p>
                        <span className="font-semibold">Fee:</span> Rs. {props.fee}
                    </p>
                </div>
            )}

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => setShowDetails((prev) => !prev)}
                    className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    {showDetails ? "Hide Details" : "View Class"}
                </button>

                {/* Only offered where editing is allowed - see MyClassesPage. */}
                {props.onEdit && (
                    <button
                        type="button"
                        onClick={props.onEdit}
                        className="bg-amber-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-amber-600 transition"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

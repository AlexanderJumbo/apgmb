import { BASE_URL } from "@/config";
import { LectureRequest } from "@/models/lecture/lectureRequest";

export const saveLecture = async (lecture: LectureRequest, jwt: string) => {
    //console.log("🚀 ~ saveAccount ~ account:", account);
    console.log("JSON enviado:", JSON.stringify(lecture));
    const res = await fetch(`${BASE_URL}lecture`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(lecture),
    });
    console.log("res", res);
    if (!res.ok) throw new Error("Ocurrió un error");
    const data = await res.json();
    return data;
};

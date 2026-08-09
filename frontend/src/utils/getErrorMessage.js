
export default function getErrorMessage(err) {
    if (!err) return "Something went wrong. Please try again.";

    if (Array.isArray(err.errors) && err.errors.length > 0) {
        return err.errors.map((e) => e.msg).join(" ");
    }

    if (Array.isArray(err.error) && err.error.length > 0) {
        return err.error.map((e) => e.msg || e.message).join(" ");
    }

    if (typeof err.message === "string" && err.message) {
        return err.message;
    }

    return "Something went wrong. Please try again.";
}
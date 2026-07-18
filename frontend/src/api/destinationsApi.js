import apiFetch from "./apiClient";

async function getDestinationByName(name)
{
    const result=await apiFetch(`/api/destinations?name=${name}`);
    console.log(result);
}
export default {
    getDestinationByName
};
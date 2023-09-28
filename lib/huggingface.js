import axios from 'axios';

const API_TOKEN = "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";

export async function HuggingFace(MODEL, INPUT) {
    const API_URL = `https://api-inference.huggingface.co/models/${MODEL}`;
    try {
        const response = await axios.post(
            API_URL,
            { inputs: INPUT, options: { wait_for_model: true }},
            { headers: { Authorization: `Bearer ${API_TOKEN}` } },
        );

        const data = response.data;
        return data;
    } catch (error) {
        console.error(`Request failed with status code ${error.response.status}`);
    }

    return false;
}
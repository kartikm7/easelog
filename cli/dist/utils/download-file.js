import axios from "axios";
import { createWriteStream } from "node:fs";
import path from "node:path";
export async function downloadFile(url, fileName, destination) {
    const filePath = path.resolve(destination, fileName);
    // downloading by writing to the resolved path
    try {
        const writer = createWriteStream(filePath);
        const response = await axios.get(url, { responseType: 'stream' });
        await new Promise((resolve, reject) => {
            response.data.pipe(writer);
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

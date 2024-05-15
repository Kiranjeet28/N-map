import { exec } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { ip, services, ports } = req.query;

    if (!ip || !services || !ports) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    const nmapCommand = `nmap -T4 -${services} -v -p${ports} ${ip}`;

    // Execute Nmap command
    exec(nmapCommand, (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(400).json({ error: 'Bad Request' });
        }
        // Send Nmap scan results
        res.status(200).json({ results: stdout });
    });
}

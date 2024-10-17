// api/token.js
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateToken04 } from '../token'; // Adjust the path as needed

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { appId, userId, serverSecret, effectiveTimeInSeconds } = req.body;

    // Check for required parameters
    if (!appId || !userId || !serverSecret || !effectiveTimeInSeconds) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    try {
      const token = generateToken04(
        parseInt(appId), 
        userId, 
        serverSecret, 
        parseInt(effectiveTimeInSeconds)
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

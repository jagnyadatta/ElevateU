import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.GEMINIAI_API_KEY;

export const callGemini = async (req, res) => {
  const { education } = req.body;
  if (!education) return;
  const prompt = `You are a career guide. Given a student has completed "${education}", suggest 15 distinct and relevant higher education options along with the type of job role they can pursue after that.

Each suggestion must include:
- The higher education degree (e.g., M.Tech, MBA, M.Sc, etc.)
- A prestigious institute (e.g., IIT, NIT, IIM, IISc, etc.)
- The specific field of study (e.g., AI, Mechanical Engineering, Business Analytics)
- A potential job/career that follows that path (e.g., Software Engineer, Data Analyst, Civil Engineer)

Format your response as a single comma-separated string with the following structure for each:

"Degree in Field from Institute → Potential Job"

Return exactly 15 such suggestions, separated by commas. No explanations or numbering. Just the comma-separated string.

`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    return res.status(200).json({
      message: `Here is the Result`,
      result,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

import { GoogleGenAI } from "@google/genai";
import { Book } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY || '';
  // In a real app, handle missing key gracefully.
  // For this demo, we assume the environment injects it.
  return new GoogleGenAI({ apiKey });
};

export const getAIRecommendation = async (query: string, availableBooks: Book[]) => {
  const ai = getClient();
  const bookContext = availableBooks.map(b => `${b.title} by ${b.author} (Category: ${b.category})`).join('\n');

  const prompt = `
    You are a helpful and knowledgeable librarian for the "SmartLibrary".
    Here is the list of books currently in our catalog:
    ${bookContext}

    The user asks: "${query}"

    Based on the catalog above, recommend 1-3 books that best fit the user's request.
    If the user's request is general (e.g., "tell me a joke"), answer politely but try to steer them back to reading.
    Provide the response in a friendly, conversational tone. Format the book titles in **bold**.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the library archives right now. Please try again later.";
  }
};

export const getBookSummary = async (bookTitle: string, author: string) => {
  const ai = getClient();
  const prompt = `Write a concise, engaging summary (max 100 words) for the book "${bookTitle}" by ${author}. Highlight the main themes.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Summary currently unavailable.";
  }
};
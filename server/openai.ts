import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface PropertyAnalysis {
  propertyType: string;
  estimatedValue: number;
  marketTrends: string;
  riskAssessment: string;
  recommendations: string[];
  legalStatus: string;
}

export interface GhanaPropertyData {
  region: string;
  district: string;
  landUse: string;
  coordinates: { lat: number; lng: number };
  registrationStatus: string;
  titleType: string;
}

// AI-powered property analysis
export async function analyzeProperty(propertyDetails: {
  location: string;
  propertyType: string;
  size?: string;
  description?: string;
}): Promise<PropertyAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert Ghana property analyst with deep knowledge of land registration, property law, and market trends in Ghana. Provide detailed property analysis in JSON format.",
        },
        {
          role: "user",
          content: `Analyze this Ghana property: Location: ${propertyDetails.location}, Type: ${propertyDetails.propertyType}, Size: ${propertyDetails.size || 'Not specified'}, Description: ${propertyDetails.description || 'None'}. 

Provide analysis in JSON format with: propertyType, estimatedValue (in GHS), marketTrends, riskAssessment, recommendations (array), legalStatus.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      propertyType: result.propertyType || propertyDetails.propertyType,
      estimatedValue: result.estimatedValue || 0,
      marketTrends: result.marketTrends || "Market data unavailable",
      riskAssessment: result.riskAssessment || "Assessment pending",
      recommendations: result.recommendations || [],
      legalStatus: result.legalStatus || "Verification required"
    };
  } catch (error) {
    throw new Error("Failed to analyze property: " + (error as Error).message);
  }
}

// Generate Ghana property registry data based on location
export async function getGhanaPropertyRegistry(location: string): Promise<GhanaPropertyData[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a Ghana Lands Commission expert with access to property registry data. Generate authentic Ghana property data based on actual regions, districts, and land use patterns.",
        },
        {
          role: "user",
          content: `Generate property registry data for ${location}, Ghana. Include 3-5 properties with authentic Ghana regions/districts, coordinates, land use types, and registration status. Format as JSON array with: region, district, landUse, coordinates {lat, lng}, registrationStatus, titleType.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{"properties": []}');
    return result.properties || [];
  } catch (error) {
    throw new Error("Failed to fetch Ghana property registry: " + (error as Error).message);
  }
}

// Enhanced AI assistant for property questions
export async function askPropertyAssistant(question: string, context?: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are ARVIPOA's AI property assistant, specialized in Ghana property law, land registration, boundary management, and smart property technology. You help users with property registration, legal compliance, market insights, and ARVIPOA's services including smart pillars, river barricades, and digital verification.

Key ARVIPOA services:
- Property Registration with blockchain security
- Smart Boundary Pillars with GPS tracking
- River Barricade Monitoring for flood protection
- Virtual Property Tours and documentation
- Digital title verification and storage

Always be helpful, accurate, and reference official Ghana Lands Commission procedures when applicable.`,
        },
        {
          role: "user",
          content: context ? `Context: ${context}\n\nQuestion: ${question}` : question,
        },
      ],
    });

    return response.choices[0].message.content || "I'm unable to provide an answer at the moment. Please try again.";
  } catch (error) {
    throw new Error("Failed to get AI assistant response: " + (error as Error).message);
  }
}

// Smart property valuation using market data
export async function getPropertyValuation(propertyData: {
  location: string;
  size: string;
  propertyType: string;
  features?: string[];
}): Promise<{
  valuationRange: { min: number; max: number };
  factors: string[];
  marketComparison: string;
  confidence: number;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a Ghana property valuation expert with knowledge of current market rates, land values, and property trends across all regions of Ghana.",
        },
        {
          role: "user",
          content: `Value this Ghana property: Location: ${propertyData.location}, Size: ${propertyData.size}, Type: ${propertyData.propertyType}, Features: ${propertyData.features?.join(', ') || 'Standard'}. 

Provide JSON with: valuationRange {min, max} in GHS, factors (array of value drivers), marketComparison (string), confidence (0-1).`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      valuationRange: result.valuationRange || { min: 0, max: 0 },
      factors: result.factors || [],
      marketComparison: result.marketComparison || "Market comparison unavailable",
      confidence: result.confidence || 0.5
    };
  } catch (error) {
    throw new Error("Failed to get property valuation: " + (error as Error).message);
  }
}
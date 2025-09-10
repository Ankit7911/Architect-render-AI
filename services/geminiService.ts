import { GoogleGenAI, Modality, Part } from "@google/genai";
import { RenderStyle, TimeOfDay, TimeOfYear, Weather, VegetationAmount, UrbanizationLevel, PeopleDensity, VehicleDensity, PropsDensity, CameraAngle } from '../types';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

const buildPrompt = (
    style: RenderStyle,
    time: TimeOfDay,
    weather: Weather,
    timeOfYear: TimeOfYear,
    vegetation: VegetationAmount,
    urbanization: UrbanizationLevel,
    people: PeopleDensity,
    vehicles: VehicleDensity,
    props: PropsDensity,
    angle: CameraAngle,
    customPrompt: string,
    hasReference: boolean,
    hasLogo: boolean,
    hasWeatherReference: boolean,
    strictMode: boolean,
    promptOnly: boolean
): string => {
  if (promptOnly) {
      if (!customPrompt.trim()) {
        return `You are an expert architectural visualization AI. Your task is to transform the provided architectural sketch into a photorealistic render. Enhance the image with realistic materials, lighting, and environment. Output only the final image.`;
      }
      return `
        You are an expert architectural visualization AI. Your task is to transform the provided architectural sketch into a photorealistic render based *only* on the following user instructions. Ignore all other presets and default styles.

        **Instructions:** "${customPrompt.trim()}"
        
        Output only the final image.
      `;
  }

  const instructions = [
    `**Style:** The final render must be in a '${style}' architectural style.`,
    `**Lighting & Atmosphere:** The scene must be set during the '${time}', with '${weather}' weather. This should dictate the lighting, shadows, and overall mood.`,
    `**Season:** The environment must reflect the '${timeOfYear}' season. This should influence the type and state of vegetation (e.g., blooming flowers in spring, snow in winter), the quality of light, and the overall atmosphere.`,
    `**Realism:** Emphasize photorealism. Add realistic materials, textures, reflections, and environmental details.`,
  ];

  if (angle !== CameraAngle.AsIs) {
    instructions.push(`**Camera Angle:** Render the final image from a '${angle}'. This is a critical instruction that requires you to reinterpret the 2D sketch into a 3D scene to achieve the correct viewpoint, while preserving the original architectural design.`);
  }

  if (hasWeatherReference) {
    instructions.push(`**Weather Reference:** A specific weather reference image has been provided. You must emulate the atmospheric conditions, lighting, cloud patterns, and overall mood from this weather image. **It is forbidden to copy any structural or physical elements (like buildings, trees, or landforms) from the weather reference image.** Your focus must be solely on its atmosphere, which you will apply to the scene defined by the primary sketch.`);
  }

  if (hasReference) {
    const referenceInstruction = strictMode
      ? `**Style Reference:** Style reference image(s) are provided. Apply **ONLY** their stylistic qualities—such as color palette, material textures, lighting, and overall mood—to the main sketch. **You are strictly forbidden from copying any structural or geometric elements from the reference image(s).** The sketch defines all structure.`
      : `**Style Reference:** Closely study the provided style reference image(s). Use them to guide the color palette, material choices, lighting quality, and overall artistic direction of the render. The final output should feel like it belongs in the same artistic set as the reference image(s). **However, you are strictly forbidden from copying any architectural forms or structures from the reference; its purpose is style inspiration only.**`;
    instructions.push(referenceInstruction);
  }

  if (urbanization !== UrbanizationLevel.None) {
      instructions.push(`**Environment:** Create a '${urbanization.toLowerCase()}' environment around the main building. This should include other buildings, streets, and infrastructure appropriate for that density.`);
  }

  if (vegetation !== VegetationAmount.None) {
    instructions.push(`**Vegetation:** Incorporate a '${vegetation.toLowerCase()}' amount of realistic vegetation (trees, plants, grass) into the scene where it makes sense architecturally and environmentally.`);
  }
  
  if (people !== PeopleDensity.None) {
      instructions.push(`**People:** Populate the scene with a '${people.toLowerCase()}' density of people. They should be performing realistic activities and be integrated naturally into the environment.`);
  }

  if (vehicles !== VehicleDensity.None) {
      instructions.push(`**Vehicles:** Include a '${vehicles.toLowerCase()}' density of vehicles (cars, bicycles, etc.) suitable for the scene and style.`);
  }
  
  if (props !== PropsDensity.None) {
      instructions.push(`**Props:** Add a '${props.toLowerCase()}' density of environmental props like streetlights, benches, signage, etc., to enhance realism.`);
  }

  if (hasLogo) {
      instructions.push(`**Logo Watermark:** A logo image has been provided. Integrate this logo as a subtle, semi-transparent watermark in the bottom-right corner of the final render. It should not be an opaque sticker but should blend naturally with the image.`);
  }

  if (customPrompt.trim()) {
    instructions.push(`**Additional Instructions:** Apply the following specific user requests: "${customPrompt.trim()}".`);
  }

  const numberedInstructions = instructions.map((inst, index) => `${index + 1}. ${inst}`).join('\n    ');
  
  const finalInstruction = strictMode
    ? `**ABSOLUTE REQUIREMENT: STRUCTURAL IMMUTABILITY**
    You are under a strict, non-negotiable directive: you **MUST NOT**, under any circumstances, alter the core architectural geometry, form, structure, window placement, rooflines, or silhouette from the original sketch. Your task is *exclusively* to apply new materials, lighting, and environmental context. The building's fundamental shape must be preserved with 100% fidelity. Any deviation from the original structure is a failure. Treat the sketch as a fixed 3D model that you are only re-skinning and lighting.`
    : `Crucially, you must preserve the primary architectural geometry, form, and structure from the original sketch. Your task is to enhance with materials, lighting, and environment, not to redesign the building itself.`;

  return `
    You are an expert architectural visualization AI. Your task is to transform the provided architectural sketch into a photorealistic render.

    Follow these instructions precisely:
    ${numberedInstructions}

    ${finalInstruction}
    Output only the final image.
  `;
};

interface GenerateRenderParams {
  sketchupImage: { base64: string; mimeType: string };
  referenceImages?: { base64: string; mimeType: string }[];
  logoImage?: { base64: string; mimeType: string };
  weatherImage?: { base64: string; mimeType: string };
  style: RenderStyle;
  time: TimeOfDay;
  weather: Weather;
  timeOfYear: TimeOfYear;
  vegetation: VegetationAmount;
  urbanization: UrbanizationLevel;
  people: PeopleDensity;
  vehicles: VehicleDensity;
  props: PropsDensity;
  angle: CameraAngle;
  customPrompt: string;
  strictMode: boolean;
  promptOnly: boolean;
}

export const generateRender = async ({
  sketchupImage,
  referenceImages,
  logoImage,
  weatherImage,
  style,
  time,
  weather,
  timeOfYear,
  vegetation,
  urbanization,
  people,
  vehicles,
  props,
  angle,
  customPrompt,
  strictMode,
  promptOnly,
}: GenerateRenderParams, apiKey: string): Promise<string> => {
  const effectiveApiKey = apiKey || process.env.API_KEY;

  if (!effectiveApiKey) {
    return Promise.reject(new Error("API key not configured. Please set a custom key in settings or ensure the default API key is available."));
  }

  try {
    const ai = new GoogleGenAI({ apiKey: effectiveApiKey });
    const prompt = buildPrompt(style, time, weather, timeOfYear, vegetation, urbanization, people, vehicles, props, angle, customPrompt, !!referenceImages && referenceImages.length > 0, !!logoImage, !!weatherImage, strictMode, promptOnly);

    const parts: Part[] = [
      { inlineData: { data: sketchupImage.base64, mimeType: sketchupImage.mimeType } },
    ];

    if (referenceImages) {
      for (const refImg of referenceImages) {
        parts.push({ inlineData: { data: refImg.base64, mimeType: refImg.mimeType } });
      }
    }
    if (weatherImage) {
      parts.push({ inlineData: { data: weatherImage.base64, mimeType: weatherImage.mimeType } });
    }
    if (logoImage) {
        parts.push({ inlineData: { data: logoImage.base64, mimeType: logoImage.mimeType } });
    }
    
    parts.push({ text: prompt });


    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("AI did not return an image. It may have refused the request.");
  } catch (error) {
    console.error("Error generating render:", error);
    if (error instanceof Error) {
        const message = error.message.toLowerCase();
        if (message.includes('api key') || message.includes('permission denied') || message.includes('quota')) {
            return Promise.reject(new Error("API_KEY_ERROR: Invalid API Key or quota exceeded. Please check your key."));
        }
        return Promise.reject(new Error(`Failed to generate render: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred while generating the render."));
  }
};


interface GenerateInpaintingParams {
  baseImage: { base64: string; mimeType: string };
  maskImage: { base64: string; mimeType: string };
  prompt: string;
  apiKey: string;
}

const buildInpaintingPrompt = (userPrompt: string): string => {
    const isRemoval = /remove|delete|erase|get rid of/i.test(userPrompt);

    if (isRemoval) {
        return `
**TASK: Flawless Object Removal & Scene Reconstruction**

You are a world-class digital restoration expert AI. Your ONLY job is to remove the object(s) inside the masked area and perfectly reconstruct the background that was behind them.

**YOUR MENTAL MODEL:**
Imagine the original image is a photograph with a sticker on it. The mask shows you the exact shape of the sticker. Your job is to peel off the sticker and paint in the missing part of the photograph underneath, making it look like the sticker was never there.

**NON-NEGOTIABLE RULES:**
1.  **RECONSTRUCT, DO NOT CREATE:** Your goal is to logically continue the scene from the unmasked areas. Analyze the surrounding textures, lines, lighting, and perspective. For example, if you are removing a tree in front of a brick wall, you must continue the brick wall perfectly. If you are removing a car from a road, you must continue the asphalt and road markings.
2.  **ABSOLUTE MASK ADHERENCE:** You are FORBIDDEN from changing a single pixel outside the white masked area. The unmasked (black) area is sacred and must remain identical to the original.
3.  **NO NEW OBJECTS:** DO NOT add any new objects. DO NOT replace the removed object with something else. The masked area should be filled ONLY with the reconstructed background. For example, if removing a tree, do NOT replace it with a different tree or a bush.
4.  **SEAMLESS BLENDING:** The final image must be seamless. The restored area must perfectly match the lighting, shadows, colors, and grain of the original image.

The user's request was: "${userPrompt}". Use this only to understand the object they want removed. Your primary instruction is to perform the reconstruction as described above.

Output ONLY the final, edited image. No text.
        `;
    }

    // Default prompt for additive/modifying edits
    return `
You are a highly precise, professional inpainting AI. Your **sole purpose** is to edit a specific region of an image according to a user's command, leaving everything else untouched.

**Primary Objective:**
The user wants to perform the following action **only** within the white area of the provided mask image:
"${userPrompt}"

**Critical Rules of Engagement:**
1.  **Strictly Adhere to the Mask:** The white area of the mask image is the **only** region you are permitted to modify. It is strictly forbidden to alter any pixel in the black, unmasked areas. The unmasked portion of the original image must be preserved with 100% pixel-perfect fidelity.
2.  **Fulfill the Creative Brief:** Your task is to creatively interpret and execute the user's prompt within the masked area. For example, if asked to 'add a car', you should generate a realistic car that fits the scene.
3.  **Blend Seamlessly:** Ensure the edited area integrates perfectly with the surrounding image. Match the lighting, shadows, perspective, texture, and overall style of the original image to create a photorealistic and unnoticeable edit.

You will be provided with the original image and the mask image. Your output must be only the final, edited image. Do not output any text, commentary, or explanation.
    `;
};


export const generateInpainting = async ({ baseImage, maskImage, prompt, apiKey }: GenerateInpaintingParams): Promise<string> => {
    const effectiveApiKey = apiKey || process.env.API_KEY;

    if (!effectiveApiKey) {
        return Promise.reject(new Error("API key not configured."));
    }

    try {
        const ai = new GoogleGenAI({ apiKey: effectiveApiKey });
        const inpaintingPrompt = buildInpaintingPrompt(prompt);

        const parts: Part[] = [
            { inlineData: { data: baseImage.base64, mimeType: baseImage.mimeType } },
            { inlineData: { data: maskImage.base64, mimeType: maskImage.mimeType } },
            { text: inpaintingPrompt }
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }

        throw new Error("AI did not return an image for inpainting. It may have refused the request.");
    } catch (error) {
        console.error("Error during inpainting:", error);
        if (error instanceof Error) {
            const message = error.message.toLowerCase();
            if (message.includes('api key') || message.includes('permission denied') || message.includes('quota')) {
                return Promise.reject(new Error("API_KEY_ERROR: Invalid API Key or quota exceeded. Please check your key."));
            }
            return Promise.reject(new Error(`Failed to generate inpainting: ${error.message}`));
        }
        return Promise.reject(new Error("An unknown error occurred during inpainting."));
    }
};